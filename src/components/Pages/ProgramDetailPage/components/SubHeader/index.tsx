import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { Container, ContainerItem, StyledLabel } from "./styles";
const EmptyState = {
  display_name: "",
  id: "",
  name: "",
  network_ingredients: [],
  risk_corridor: null,
  status: "",
  stop_loss_title: "",
  total_annual_admin_fees: 0,
  total_annual_cost_no_corridor: 0,
  total_annual_maximum_cost: 0,
  total_annual_stop_loss_cost: 0,
  total_expected_claims_fund: 0,
  version_type: "",
};
const Participant = () => {
  const { illustrativeStore } = useStore();
  const { programId } = useParams<IParamTypes>();
  const [item, setItem] = useState(EmptyState);
  const { summaryPricing } = illustrativeStore;

  useEffect(() => {
    setItem(
      summaryPricing.find((i) => i?.id === programId)?.versions[0] || EmptyState
    );
  }, []);

  return (
    <Container>
      <ContainerItem style={{ borderRight: "2px solid rgb(225, 233, 236)" }}>
        <StyledLabel>Expected Cost</StyledLabel>
        <ContainerItem>
          $
          {item.total_annual_cost_no_corridor
            ? item.total_annual_cost_no_corridor
            : "0"}
        </ContainerItem>
      </ContainerItem>
      <ContainerItem style={{ borderRight: "2px solid rgb(225, 233, 236)" }}>
        <StyledLabel>Maximum Cost</StyledLabel>
        <ContainerItem>
          $
          {item.total_annual_maximum_cost
            ? item.total_annual_maximum_cost
            : "0"}
        </ContainerItem>
      </ContainerItem>
      <ContainerItem>
        <StyledLabel>Claims Fund</StyledLabel>
        <ContainerItem>
          $
          {item.total_expected_claims_fund
            ? item.total_expected_claims_fund
            : "0"}
        </ContainerItem>
      </ContainerItem>
    </Container>
  );
};

export default observer(Participant);
