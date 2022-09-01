import React, { useEffect } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import ProgramBuildOnboardingLayout from "src/components/Pages/ProgramBuildOnboardingLayout";
import PlansDesignForm from "src/components/Pages/ProgramBuildPlanSets/PlansDesignForm";
import { PlanStateName } from "src/constants";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";

const ProgramBuildPlanSetsPage = () => {
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
        routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.plansets.getValue(
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
  }, [prospectId, planSetId]);

  return (
    <ProgramBuildOnboardingLayout
      title="Create Plans | Novo Connection"
      step={5}
    >
      <PlansDesignForm />
    </ProgramBuildOnboardingLayout>
  );
};

export default observer(ProgramBuildPlanSetsPage);
