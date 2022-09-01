import { useEffect } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import ProgramBuildOnboardingLayout from "src/components/Pages/ProgramBuildOnboardingLayout";
import PlanDetailForm from "src/components/Pages/ProgramBuildPlanSets/PlanDetailForm";
import { PlanStateName } from "src/constants";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";

const ProgramBuildPlanSetsPage = () => {
  const { existingPlansStore, programStore } = useStore();
  const { orgId, prospectId, recipeId, planSetId } = useParams<IParamTypes>();
  const history = useHistory();

  const { orgRecipe } = programStore;
  const planSets = get(orgRecipe, "plan_sets", []);

  useEffect(() => {
    programStore.setCurrentStateName(PlanStateName.PLAN);
    programStore.fetchOrgRecipe(prospectId, recipeId);
  }, []);

  useEffect(() => {
    existingPlansStore.getExistingPlans(prospectId);
  }, [prospectId]);

  useEffect(() => {
    if (Array.isArray(planSets) && planSets.length && !planSetId) {
      const editPlanSetId = get(planSets[0], "id", "");
      history.replace(
        routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.plansets.getValue(
          orgId,
          prospectId,
          recipeId,
          editPlanSetId
        )
      );
    }
  }, [planSets]);

  return (
    <ProgramBuildOnboardingLayout
      title="Create Plans | Novo Connection"
      step={5}
    >
      <PlanDetailForm />
    </ProgramBuildOnboardingLayout>
  );
};

export default observer(ProgramBuildPlanSetsPage);
