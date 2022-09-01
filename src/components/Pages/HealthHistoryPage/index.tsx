import React from "react";
import { cloneDeep } from "lodash";
import { isEmpty } from "lodash";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Row, Container } from "reactstrap";
import { createClaimsData, getClaimsData } from "src/api/benefits";
import { updateProspectDetails } from "src/api/prospects";
import { IClaimsData } from "src/interfaces/benefit";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { SubmitButton, Title, Description, StyledCol, Border } from "./styles";

const HealthHistoryPage = () => {
  const { prospectId } = useParams<IParamTypes>();
  const history = useHistory();
  const { brokerProspectsListStore } = useStore();
  const { currentProspect } = brokerProspectsListStore;

  async function changeToClaims() {
    const currentProspectNeedUpdate = cloneDeep(currentProspect);
    currentProspectNeedUpdate.census_data.health_history_skipped = false;
    currentProspectNeedUpdate.census_data.health_history_type = "claims";
    const currentClaimsData = await getClaimsData(prospectId);
    if (isEmpty(currentClaimsData)) {
      const newCurrentYearClaimsData: IClaimsData = {
        assumed_discount: null,
        contract_length: 12,
        experience_average_employees: 0,
        experience_coinsurance: 0,
        experience_deductible: 0,
        experience_oop_max: 0,
        experience_plan_type: "",
        experience_rx: "",
        files_skipped: false,
        generic_field_responses: {
          claims_documents: [],
        },
        monthly_claims: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        paid_status: "paid",
        paid_through_date: null,
        start_date: null,
        stop_loss_claims: [],
        year: new Date().getFullYear(),
      };
      const newLastYearClaimsData: IClaimsData = cloneDeep(
        newCurrentYearClaimsData
      );
      newLastYearClaimsData.year = new Date().getFullYear() - 1;

      await Promise.all([
        createClaimsData(prospectId, newCurrentYearClaimsData),
        createClaimsData(prospectId, newLastYearClaimsData),
      ]);
    }

    await updateProspectDetails(currentProspectNeedUpdate, prospectId);
    await Promise.all([
      brokerProspectsListStore.setCurrentProspect(prospectId),
      brokerProspectsListStore.setCurrentProspectProgress(prospectId),
    ]);
    history.push(
      routes.dashboard.brokerage.prospects.prospectId.claims.documents.getValue(
        prospectId
      )
    );
  }

  async function changeToPhqs() {
    const currentProspectNeedUpdate = cloneDeep(currentProspect);
    currentProspectNeedUpdate.census_data.health_history_skipped = false;
    currentProspectNeedUpdate.census_data.health_history_type = "phqs";

    await updateProspectDetails(currentProspectNeedUpdate, prospectId);
    await Promise.all([
      brokerProspectsListStore.setCurrentProspect(prospectId),
      brokerProspectsListStore.setCurrentProspectProgress(prospectId),
    ]);
    history.push(
      routes.dashboard.brokerage.prospects.prospectId.phqs.getValue(prospectId)
    );
  }

  return (
    <Container>
      <Row>
        <StyledCol xs={6} md={{ size: 4, offset: 2 }}>
          <Title>Claims History</Title>
          <Description>
            Entering claims data now will result in more accurate illustrative
            rates.
          </Description>
          <SubmitButton label="Choose" onClick={changeToClaims} />
          <Border />
        </StyledCol>
        <StyledCol xs={6} md={4}>
          <Title>PHQs</Title>
          <Description>
            PHQs will be required for underwriting if there is insufficient
            claims data.
          </Description>
          <SubmitButton label="Choose" onClick={changeToPhqs} />
        </StyledCol>
      </Row>
    </Container>
  );
};

export default observer(HealthHistoryPage);
