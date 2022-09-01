import { createOrgRecipes, getOrgRecipes } from "src/api/orgRecipes";

export async function syncOrgRecipes(prospectId: string): Promise<void> {
  const orgRecipes = await getOrgRecipes(prospectId);
  if (Array.isArray(orgRecipes) && orgRecipes.length > 0) return;
  createOrgRecipes(prospectId);
}
