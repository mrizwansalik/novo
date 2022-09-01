import React, { useEffect } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { FormProvider, useWatch } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";

import useStore from "src/utils/useStore";
import AddedPlansBox from "../AddedPlansBox";
import CoinsuranceAndOfficeVisitRow from "../CoinsuranceAndOfficeVisitRow";
import DeductibleAndOutOfPocketRow from "../DeductibleAndOutOfPocketRow";
import {
  PrimaryButton,
  SecondaryButton,
} from "../existingPlansDesignPage.style";
import NameAndCarrierRow from "../NameAndCarrierRow";
import usePlanDesignForm from "./hook";
import {
  IPlanDesignForm,
  trySavePlan,
  validateForm,
  handleGoNextPage,
} from "./utils";

const PlanDesignForm = () => {
  const { orgStore, benefitStore, existingPlansStore } = useStore();
  const { orgDetail } = orgStore;
  const orgId = get(orgDetail, "id");
  const { claimsData } = benefitStore;
  const { plan, existingPlans, carrierPlan } = existingPlansStore;
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const planId: string = get(params, "planId", "");

  const history = useHistory();
  const { pathname } = useLocation();
  const { formControl, formDefaultValue, carrierOptions } = usePlanDesignForm(
    carrierPlan
  );
  const {
    formState,
    control,
    trigger,
    register,
    reset,
    setError,
    handleSubmit,
  } = formControl;
  const { errors, isDirty } = formState;

  const watchCopayOfficeVisitType = useWatch({
    control,
    name: "copay_office_visit_type",
  });
  const watchCopayOfficeVisitTypeValue = get(
    watchCopayOfficeVisitType,
    "value",
    ""
  ) as string;

  register("id");

  const isAddNewPlanDisabled = !get(plan, "carrier_plan.id") && !isDirty;
  const isSavePlanDisabled =
    !get(plan, "carrier_plan.id") && !existingPlans.length && !isDirty;

  async function handleSubmitAndAddPlan(data: IPlanDesignForm) {
    const carrierPlanData = { ...carrierPlan, ...data };
    if (validateForm(carrierPlanData, setError)) {
      if (isDirty) {
        try {
          toast.info("Saving plan...");
          const newOrgPlan = await trySavePlan(
            carrierPlanData,
            prospectId,
            plan
          );
          existingPlansStore.updateExistingPlans(newOrgPlan);
          reset(formDefaultValue);
          if (planId) {
            const pathElement = pathname.split("/");
            pathElement.pop();
            history.push(pathElement.join("/"));
          }
          toast.success("Plan saved.");
        } catch (e) {
          console.log(e);
          toast.error("There was an error saving the plan.");
        }
      } else {
        reset(formDefaultValue);
      }
    }
  }

  async function handleSubmitAndSavePlan(data: IPlanDesignForm) {
    const carrierPlanData = { ...carrierPlan, ...data };
    if (validateForm(carrierPlanData, setError)) {
      try {
        toast.info("Saving plan...");
        const newOrgPlan = await trySavePlan(carrierPlanData, prospectId, plan);
        existingPlansStore.updateExistingPlans(newOrgPlan);
        toast.success("Plan saved.");
        handleGoNextPage(history, pathname, orgId, prospectId);
      } catch (e) {
        console.log(e);
        toast.error("There was an error saving the plan.");
      }
    }
  }

  function preSubmitPlan(e) {
    e.preventDefault();
    if (isDirty) {
      trigger();
      handleSubmit((data) => {
        handleSubmitAndSavePlan(data);
      })();
    } else {
      handleGoNextPage(history, pathname, orgId, prospectId);
    }
  }

  useEffect(() => {
    if (prospectId) {
      benefitStore.getClaimsDetail(prospectId);
      existingPlansStore.getExistingPlan(prospectId, planId);
    }
  }, [params]);

  useEffect(() => {
    existingPlansStore.setCarrierPlan();
  }, [claimsData, plan, planId]);

  return (
    <FormProvider {...formControl}>
      <form>
        <Row>
          <Col lg={9} md={9}>
            <div>
              <NameAndCarrierRow carrierOptions={carrierOptions} />
              <DeductibleAndOutOfPocketRow />
              <CoinsuranceAndOfficeVisitRow />
            </div>
          </Col>
          <Col lg={3} md={3}>
            <AddedPlansBox />
          </Col>
        </Row>
        <Row>
          <Col lg={2} md={2}>
            <SecondaryButton
              disabled={isAddNewPlanDisabled}
              onClick={handleSubmit(handleSubmitAndAddPlan)}
            >
              Save & Add New Plan
            </SecondaryButton>
          </Col>
          <Col lg={2} md={2}>
            <PrimaryButton
              disabled={isSavePlanDisabled}
              onClick={(e) => preSubmitPlan(e)}
            >
              Save & Add Participation
            </PrimaryButton>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};

export default observer(PlanDesignForm);
