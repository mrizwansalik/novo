import React, { useEffect } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import PlansDesignForm from "src/components/Pages/ProgramBuildPlanSets/PlansDesignForm";
import ProgramBuildDashboardLayout from "src/components/ProgramBuildDashboardLayout";
import { PlanStateName } from "src/constants";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";

const DashboardProgramBuildPlanSetsPage = () => {
  const {
    existingPlansStore,
    programStore,
    programBuildPlanSetsStore,
    censusDetailsStore,
  } = useStore();
  const {
    brokerageId,
    prospectId,
    recipeId,
    planSetId,
  } = useParams<IParamTypes>();
  const history = useHistory();

  const { orgRecipe } = programStore;
  const planSets = get(orgRecipe, "plan_sets", []);

  useEffect(() => {
    programStore.setCurrentStateName(PlanStateName.PLAN);
    programStore.fetchOrgRecipe(prospectId, recipeId);
  }, []);

  useEffect(() => {
    existingPlansStore.getExistingPlans(prospectId);
    censusDetailsStore.getCensusHumansList(prospectId);
  }, [prospectId]);

  useEffect(() => {
    if (Array.isArray(planSets) && planSets.length && !planSetId) {
      const editPlanSetId = get(planSets[0], "id", "");
      history.replace(
        routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.plansets.getValue(
          brokerageId,
          prospectId,
          recipeId,
          editPlanSetId
        )
      );
    }
  }, [planSets]);

  useEffect(() => {
    programBuildPlanSetsStore.getMedicalPlans(prospectId, planSetId);
  }, [prospectId, planSetId, orgRecipe]);

  return (
    <ProgramBuildDashboardLayout
      title="Create Plans | Novo Connection"
      step={5}
    >
      <>
        <PlansDesignForm />
      </>
    </ProgramBuildDashboardLayout>
  );
};

export default observer(DashboardProgramBuildPlanSetsPage);
