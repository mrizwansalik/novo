import { get } from "lodash";
import { deleteOrgRecipesTPAs } from "src/api/network";
import { deleteNetworkIngredient } from "src/api/orgRecipes";
import { ISubNetwork } from "src/interfaces/network";
import {
  IOrgRecipesFee,
  IOrgRecipesTPA,
  IPlanSet,
} from "src/interfaces/orgRecipes";
import routes from "src/routes";
import ProgramBuildStore from "src/stores/programBuildStore";
import ProgramStore from "src/stores/programStore";
import { ProgramBuildSideMenuRouteID, sideMenuList } from "./constants";
import { ISideMenu, ISideMenuChildren } from "./interfaces";

export function getSideMenuData(
  programBuildStore: ProgramBuildStore,
  programStore: ProgramStore,
  orgId: string,
  prospectId: string,
  recipeId: string
): ISideMenu[] {
  const providerAccess: ISideMenu = {
    routeId: ProgramBuildSideMenuRouteID.PROVIDER_ACCESS,
    title: `Provider Access (${
      programBuildStore?.orgRecipe?.sub_networks?.length || 0
    })`,
    checked: programBuildStore?.orgRecipe?.sub_networks?.length > 0,
    routeUrl: routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.network.value(
      orgId,
      prospectId,
      recipeId
    ),
    children: Array.isArray(programBuildStore?.orgRecipe?.sub_networks)
      ? programBuildStore?.orgRecipe?.sub_networks?.map(
          (subNetwork: ISubNetwork) => ({
            title: subNetwork?.name,
            id: subNetwork?.id,
          })
        )
      : [],
  };

  const pharmacyBenefitManagers: ISideMenu = {
    routeId: ProgramBuildSideMenuRouteID.PHARMACY_BENEFIT_MANAGER,
    title: `Pharmacy Benefit Manager (${
      programBuildStore?.orgRecipe?.pbms?.length || 0
    })`,
    checked: programBuildStore?.orgRecipe?.pbms?.length > 0,
    routeUrl: routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.pharmacyBenefitManager.value(
      orgId,
      prospectId,
      recipeId
    ),
    children: Array.isArray(programBuildStore?.orgRecipe?.pbms)
      ? programBuildStore?.orgRecipe?.pbms?.map((subNetwork: ISubNetwork) => ({
          title: subNetwork?.name,
          id: subNetwork?.id,
        }))
      : [],
  };

  const costContainmentVendors: ISideMenu = {
    routeId: ProgramBuildSideMenuRouteID.SOLUTION_PARTNERS,
    title: `Solution Partners (${
      programBuildStore?.orgRecipe?.cost_containment_vendors?.length || 0
    })`,
    checked: programBuildStore?.orgRecipe?.cost_containment_vendors?.length > 0,
    routeUrl: routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.costContainmentVendors.value(
      orgId,
      prospectId,
      recipeId
    ),
    children: Array.isArray(
      programBuildStore?.orgRecipe?.cost_containment_vendors
    )
      ? programBuildStore?.orgRecipe?.cost_containment_vendors?.map(
          (subNetwork: ISubNetwork) => ({
            title: subNetwork?.name,
            id: subNetwork?.id,
          })
        )
      : [],
  };

  const thirdPartyAdministrators: ISideMenu = {
    routeId: ProgramBuildSideMenuRouteID.THIRD_PARTY_ADMINISTRATORS,
    title: `Third Party Administrators (${
      programBuildStore?.orgRecipe?.tpas?.length || 0
    })`,
    checked: programBuildStore?.orgRecipe?.tpas?.length > 0,
    routeUrl: routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.tpa.getValue(
      orgId,
      prospectId,
      recipeId
    ),
    children: Array.isArray(programBuildStore?.orgRecipe?.tpas)
      ? programBuildStore?.orgRecipe?.tpas?.map(
          (subNetwork: IOrgRecipesTPA) => ({
            title: subNetwork?.tpa?.name,
            id: subNetwork?.id,
          })
        )
      : [],
  };

  const { orgRecipe } = programStore;
  const planSets: IPlanSet[] = get(orgRecipe, "plan_sets", []);
  const planSetsTab = {
    routeId: ProgramBuildSideMenuRouteID.PLAN_DESIGNS,
    title: `Plan Designs (${planSets.length})`,
    checked: false,
    routeUrl: routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.plansets.getValue(
      orgId,
      prospectId,
      recipeId,
      ""
    ),
    children: planSets.map((planSet) => ({
      id: planSet.id,
      title: planSet.name,
    })),
  };

  const expensesTab: ISideMenu = {
    routeId: ProgramBuildSideMenuRouteID.EXPENSES,
    title: `Expenses (${programBuildStore?.orgRecipe?.fees?.length || 0})`,
    checked: programBuildStore?.orgRecipe?.fees?.length > 0,
    routeUrl: routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.expenses.getValue(
      orgId,
      prospectId,
      recipeId
    ),
    children: Array.isArray(programBuildStore?.orgRecipe?.fees)
      ? programBuildStore?.orgRecipe?.fees?.map((fee: IOrgRecipesFee) => ({
          title: fee?.name,
          id: fee.id,
        }))
      : [],
  };

  const newSideMenu = [
    providerAccess,
    pharmacyBenefitManagers,
    costContainmentVendors,
    thirdPartyAdministrators,
    planSetsTab,
    expensesTab,
    ...sideMenuList,
  ];
  return newSideMenu;
}

export async function handleDeleteSubNetwork(
  routeId: string,
  prospectId: string,
  recipeId: string,
  programBuildStore: ProgramBuildStore,
  sideMenuChildren: ISideMenuChildren
): Promise<void> {
  switch (routeId) {
    case ProgramBuildSideMenuRouteID.THIRD_PARTY_ADMINISTRATORS:
      try {
        programBuildStore.setLoadingProgress(0);
        await deleteOrgRecipesTPAs(prospectId, recipeId, sideMenuChildren?.id);
        programBuildStore.fetchOrgRecipe(prospectId, recipeId);
        programBuildStore.setLoadingProgress(100);
      } catch (error) {
        programBuildStore.setLoadingProgress(0);
      }
      break;
    default:
      try {
        programBuildStore.setLoadingProgress(0);
        await deleteNetworkIngredient(
          prospectId,
          recipeId,
          sideMenuChildren?.id
        );
        programBuildStore.fetchOrgRecipe(prospectId, recipeId);
        programBuildStore.setLoadingProgress(100);
      } catch (error) {
        programBuildStore.setLoadingProgress(0);
      }
      break;
  }
}
