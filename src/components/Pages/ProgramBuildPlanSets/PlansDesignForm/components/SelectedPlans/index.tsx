import React from "react";
import { observer } from "mobx-react";
import { IMedicalPlan } from "src/interfaces/orgRecipes";
import useStore from "src/utils/useStore";
import PlanCard from "./components/PlanCard";
import {
  Container,
  CardWrapper,
  HeaderText,
  NoPlanText,
} from "./selectedPlans.styles";

const SelectedPlans = () => {
  const { programBuildPlanSetsStore } = useStore();

  const { plans } = programBuildPlanSetsStore;
  const showSelectedPlans = Array.isArray(plans) && plans.length > 0;

  return (
    <>
      <HeaderText>Selected Plans</HeaderText>
      {showSelectedPlans ? (
        <Container>
          {plans.map((plan: IMedicalPlan) => {
            return (
              <CardWrapper lg="6" md="6" key={plan.id}>
                <PlanCard plan={plan} />
              </CardWrapper>
            );
          })}
        </Container>
      ) : (
        <NoPlanText>No plans have been selected yet.</NoPlanText>
      )}
    </>
  );
};

export default observer(SelectedPlans);
