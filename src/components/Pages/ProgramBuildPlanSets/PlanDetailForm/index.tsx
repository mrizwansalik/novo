import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { EmptyPlan } from "src/constants/emptyPlan";
import { IMedicalPlan } from "src/interfaces/orgRecipes";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import BasicsSection from "./components/BasicsSection";
import InsurancePaysSection from "./components/InsurancePaysSection";
import RxPaysSection from "./components/RxPaysSection";
import {
  ComponentContainer,
  HeaderWrapper,
  StyledCloseEditForm,
  StyledCloseEditButton,
} from "./planDetailForm.style";

const PlanDetailForm = () => {
  const [planDetail, setPlanDetail] = useState<IMedicalPlan>(EmptyPlan);

  const location = useLocation();
  const history = useHistory();

  const query = new URLSearchParams(location.search);

  const {
    orgId,
    prospectId,
    recipeId,
    planSetId,
    planId,
    brokerageId,
  } = useParams<IParamTypes>();

  const { programBuildPlanSetsStore, programStore } = useStore();
  const { plans } = programBuildPlanSetsStore;
  const { isDashboardPage } = programStore;

  const formControl = useForm<IMedicalPlan>({
    mode: "onChange",
    defaultValues: EmptyPlan,
  });
  const { watch, formState } = formControl;
  const { errors } = formState;

  const { reset } = formControl;

  useEffect(() => {
    if (planId) {
      const selectedPlan = plans.find((plan) => plan.id === planId);
      if (selectedPlan) {
        setPlanDetail(
          Object.assign(planDetail, {
            medical_plan: { ...selectedPlan.medical_plan },
          })
        );
      }
    }
  }, [planId, plans]);

  useEffect(() => {
    if (prospectId && planSetId) {
      programBuildPlanSetsStore.getMedicalPlans(prospectId, planSetId);
    }
  }, [prospectId, planSetId]);

  useEffect(() => {
    if (planDetail) {
      reset(planDetail, { keepDirty: true });
    }
  }, [planDetail]);

  const closePlanEdit = () => {
    if (!isDashboardPage) {
      history.push(
        routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.plansets.getValue(
          orgId,
          prospectId,
          recipeId,
          planSetId
        )
      );
    } else {
      history.push(
        routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.plansets.getValue(
          brokerageId,
          prospectId,
          recipeId,
          planSetId
        )
      );
    }
  };

  return (
    <>
      <HeaderWrapper>
        <span>Plan Designs</span>
        <p>
          A plan set is a group of plans offered as a package of options. Within
          a plan set you can add new plans or match existing plans. You have the
          freedom to create multiple plans within a set and multiple sets.
        </p>
      </HeaderWrapper>
      <ComponentContainer>
        <FormProvider {...formControl}>
          <StyledCloseEditForm>
            <StyledCloseEditButton
              onClick={closePlanEdit}
              iconName="x128px-blue.png"
              size={40}
            />
          </StyledCloseEditForm>
          <BasicsSection />
          <InsurancePaysSection />
          <RxPaysSection
            planId={planId}
            planSetId={planSetId}
            orgId={prospectId}
            onCancel={closePlanEdit}
          />
        </FormProvider>
      </ComponentContainer>
    </>
  );
};

export default observer(PlanDetailForm);
