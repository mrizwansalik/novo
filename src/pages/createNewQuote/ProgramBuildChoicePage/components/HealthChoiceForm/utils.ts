import get from "lodash/get";
import { getOrgRecipes } from "src/api/orgRecipes";
import { IOrgRecipes } from "src/interfaces/orgRecipes";
import routes from "src/routes";
import { IHistory } from "src/types";

export async function handleNextStep(
  orgId: string,
  prospectId: string,
  history: IHistory
): Promise<void> {
  const orgRecipes: IOrgRecipes[] = await getOrgRecipes(prospectId);
  const orgRecipe: IOrgRecipes = get(orgRecipes, "[0]", {});
  const recipeId: string = get(orgRecipe, "id", "");
  if (!recipeId) return;
  history.push(
    routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.network.value(
      orgId,
      prospectId,
      recipeId
    )
  );
}
