/* eslint-disable max-lines */
import React, { useEffect } from "react";
import { get, isEmpty } from "lodash";
import { observer } from "mobx-react";
import { FormProvider } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";

import routes from "src/routes";
import { getDefaultVersion } from "src/utils/quote";
import useStore from "src/utils/useStore";
import {
  ContentContainer,
  PrimaryButton,
} from "./existingPlansSelfFundedPage.style";
import FundingSection from "./FundingSection";
import useStopLossForm from "./hook";
import MainDetailSection from "./MainDetailSection";
import TerminalLiabilitySection from "./TerminalLiabilitySection";
import { handleSelfFundedProgram, handleSubmitForm } from "./utils";

const ExistingPlansSelfFundedPage = () => {
  const history = useHistory();
  const params = useParams();
  const { pathname } = useLocation();
  const { orgStore, onboardingQuoteStore, existingPlansStore } = useStore();

  const prospectId = get(params, "prospectId");
  const { selfFundedProgram, version } = existingPlansStore;
  const { orgDetail } = orgStore;
  const orgId = get(orgDetail, "id");

  const { prospectDetail } = onboardingQuoteStore;
  const { formControl, tpaOptions, stopLossCarrierOptions } = useStopLossForm(
    orgId,
    selfFundedProgram,
    version
  );

  const { formState, handleSubmit } = formControl;
  const { isDirty, isValid } = formState;

  async function handleClickSave(data) {
    try {
      toast.info("Saving self-funded info...");
      const {
        upsertedSelfFundedProgram,
        upsertedVersion,
      } = await handleSubmitForm(data, prospectId, selfFundedProgram, version);
      existingPlansStore.setSelfFundedProgram(upsertedSelfFundedProgram);
      existingPlansStore.setVersion(upsertedVersion);
      toast.success("Self-funded info saved!");
      if (pathname.includes("onboarding")) {
        history.push(
          routes.dashboard.brokerage.prospects.onBoarding.existingPlans.planDesign.getValue(
            prospectId
          )
        );
      } else {
        const brokerageId = get(params, "brokerageId");
        history.push(
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans.selfFunded.design.getValue(
            brokerageId,
            prospectId
          )
        );
      }
    } catch (e) {
      toast.error("There was an error saving the self-funded info.");
    }
  }

  useEffect(() => {
    const defaultVersion = getDefaultVersion();
    existingPlansStore.setVersion(defaultVersion);
  }, []);

  useEffect(() => {
    if (prospectId) {
      onboardingQuoteStore.getProspectDetail(prospectId);
    }
  }, [prospectId]);

  useEffect(() => {
    if (!isEmpty(prospectDetail)) {
      handleSelfFundedProgram(prospectDetail, existingPlansStore);
    }
  }, [prospectDetail]);

  return (
    <FormProvider {...formControl}>
      <ContentContainer onSubmit={handleSubmit(handleClickSave)}>
        <div>
          <MainDetailSection
            tpaOptions={tpaOptions}
            stopLossCarrierOptions={stopLossCarrierOptions}
          />
          <TerminalLiabilitySection />
          <FundingSection />
          <Row>
            <Col lg={6} md={6}>
              <PrimaryButton disabled={!isDirty} type="submit">
                Next
              </PrimaryButton>
            </Col>
          </Row>
        </div>
      </ContentContainer>
    </FormProvider>
  );
};

export default observer(ExistingPlansSelfFundedPage);
