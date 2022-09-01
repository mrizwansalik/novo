/* eslint-disable max-lines */
import { get } from "lodash";
import { deleteOrgRecipesTPAs } from "src/api/network";
import {
  deleteNetworkIngredient,
  deleteOrgRecipeStopLoss,
} from "src/api/orgRecipes";
import { removePlanSet } from "src/api/planSet";
import { ISubNetwork } from "src/interfaces/network";
import {
  IOrgRecipesFee,
  IOrgRecipesTPA,
  IPlanSet,
  IStopLoss,
} from "src/interfaces/orgRecipes";
import routes from "src/routes";
import ProgramBuildStore from "src/stores/programBuildStore";
import ProgramStore from "src/stores/programStore";
import { IParamTypes } from "src/types";
import { ProgramBuildSideMenuRouteID } from "./constants";
import { ISideMenu, ISideMenuChildren } from "./interfaces";

// TODO: Update more route when step is finish
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
    routeUrl: routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.network.getValue(
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
    routeUrl: routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.pharmacyBenefitManager.getValue(
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
    routeUrl: routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.costContainmentVendors.getValue(
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
    routeUrl: routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.tpa.getValue(
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
  const planSetStatus = get(orgRecipe, "plan_sets", []).some(
    (planset) => planset?.plans?.length > 0
  );
  const planSetsTab = {
    routeId: ProgramBuildSideMenuRouteID.PLAN_DESIGNS,
    title: `Plan Designs (${planSets.length})`,
    checked: planSetStatus,
    routeUrl: routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.plansets.getValue(
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
    routeUrl: routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.expenses.getValue(
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

  const stopLossContracts: IStopLoss[] = get(
    orgRecipe,
    "stop_loss_contracts",
    []
  );
  const stopLossTab = {
    routeId: ProgramBuildSideMenuRouteID.STOP_LOSS,
    title: `Stop Loss (${stopLossContracts.length})`,
    checked: stopLossContracts.length > 0,
    routeUrl: routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.stopLoss.getValue(
      orgId,
      prospectId,
      recipeId,
      ""
    ),
    children: stopLossContracts.map((stopLoss) => ({
      id: stopLoss.id,
      title: stopLoss.display_name,
    })),
  };

  const newSideMenu = [
    providerAccess,
    pharmacyBenefitManagers,
    costContainmentVendors,
    thirdPartyAdministrators,
    planSetsTab,
    expensesTab,
    stopLossTab,
  ];
  return newSideMenu;
}

export async function handleDeleteSubNetwork(
  routeId: string,
  routeParams: IParamTypes,
  programBuildStore: ProgramBuildStore,
  programStore: ProgramStore,
  sideMenuChildren: ISideMenuChildren,
  history
): Promise<void> {
  const {
    brokerageId,
    prospectId,
    recipeId,
    planSetId,
    stopLossId,
  } = routeParams;

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
    case ProgramBuildSideMenuRouteID.PLAN_DESIGNS:
      try {
        await removePlanSet(prospectId, recipeId, sideMenuChildren?.id);
        programStore.fetchOrgRecipe(prospectId, recipeId);
        if (planSetId === sideMenuChildren?.id) {
          history.push(
            routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.plansets.getValue(
              brokerageId,
              prospectId,
              recipeId,
              ""
            )
          );
        }
      } catch (error) {}
      break;
    case ProgramBuildSideMenuRouteID.STOP_LOSS:
      try {
        await deleteOrgRecipeStopLoss(
          prospectId,
          recipeId,
          sideMenuChildren?.id
        );
        programStore.fetchOrgRecipe(prospectId, recipeId);
        if (stopLossId === sideMenuChildren?.id) {
          history.push(
            routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.stopLoss.getValue(
              brokerageId,
              prospectId,
              recipeId,
              ""
            )
          );
        }
      } catch (error) {}
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

export function handleEdit(
  orgId: string,
  prospectId: string,
  recipeId: string,
  routeId: string,
  sideMenuChildren: ISideMenuChildren,
  history
) {
  switch (routeId) {
    case ProgramBuildSideMenuRouteID.PLAN_DESIGNS:
      history.push(
        routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.plansets.getValue(
          orgId,
          prospectId,
          recipeId,
          sideMenuChildren?.id
        )
      );
      break;
    case ProgramBuildSideMenuRouteID.STOP_LOSS:
      history.push(
        routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.stopLoss.getValue(
          orgId,
          prospectId,
          recipeId,
          ""
        )
      );
      break;
    default:
      break;
  }
}
