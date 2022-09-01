import { useEffect } from "react";
import { get } from "lodash";
import { useHistory, useParams } from "react-router";
import PlanDetailForm from "src/components/Pages/ProgramBuildPlanSets/PlanDetailForm";
import ProgramBuildDashboardLayout from "src/components/ProgramBuildDashboardLayout";
import { PlanStateName } from "src/constants";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";

const DashboardProgramBuildPlanDesignPage = () => {
  const { existingPlansStore, programStore } = useStore();
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

  return (
    <ProgramBuildDashboardLayout
      title="Create Plans | Novo Connection"
      step={6}
    >
      <PlanDetailForm />
    </ProgramBuildDashboardLayout>
  );
};

export default DashboardProgramBuildPlanDesignPage;
