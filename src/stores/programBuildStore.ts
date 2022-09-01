import { get } from "lodash";
import { action, observable, makeObservable, set } from "mobx";
import {
  getSubNetworksByType,
  getThirdPartyAdministrators,
  getNetworkIngredientWithTPAs,
  generateProgram,
} from "src/api/network";
import { getOrgRecipeById } from "src/api/orgRecipes";
import { INetworkCategoriesWorker } from "src/components/Pages/ProgramBuild/TPAProgramSection/components/ProgramCard/hooks";
import { NetworkAPIType, NETWORK_INGREDIENT_TYPE } from "src/constants";
import { ITpa } from "src/interfaces/benefit";
import {
  INetworkIngredientWithTPAs,
  ISubNetwork,
} from "src/interfaces/network";
import { IOrgRecipes } from "src/interfaces/orgRecipes";
import { IRootStore } from "./rootStore";

class ProgramBuildStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      subNetworks: observable,
      pharmacyBenefitManagers: observable,
      costContainmentVendors: observable,
      orgRecipe: observable,
      tpas: observable,
      networkIngredientWithTPAs: observable,
      loadingProgress: observable,
      tpasCollapsed: observable,
      setTpasCollapsed: action,
      networkCategoryTree: observable,
      setNetworkCategoryTree: action,
      generatingPrograms: observable,
      numberOfPrograms: observable,
      calculateNumberOfPrograms: action,
    });
    this.rootStore = rootStore;
  }

  subNetworks: ISubNetwork[] = [];

  pharmacyBenefitManagers: ISubNetwork[] = [];

  costContainmentVendors: ISubNetwork[] = [];

  orgRecipe: IOrgRecipes = {} as IOrgRecipes;

  tpas: ITpa[] = [];

  @observable
  networkCategoryTree: INetworkCategoriesWorker[] = [];

  networkIngredientWithTPAs: INetworkIngredientWithTPAs[] = [];

  tpasCollapsed: boolean = true;

  loadingProgress: number = 0;

  generatingPrograms: boolean = false;

  numberOfPrograms: number = 0;

  @action
  async fetchSubNetworks(prospectId: string): Promise<void> {
    this.subNetworks = await getSubNetworksByType(
      prospectId,
      NetworkAPIType.SUB_NETWORKS
    );
  }

  @action
  async fetchPharmacyBenefitManagers(prospectId: string): Promise<void> {
    this.pharmacyBenefitManagers = await getSubNetworksByType(
      prospectId,
      NetworkAPIType.PHARMACY_BENEFIT_MANAGERS
    );
  }

  @action
  async fetchCostContainmentVendors(prospectId: string): Promise<void> {
    this.costContainmentVendors = await getSubNetworksByType(
      prospectId,
      NetworkAPIType.COST_CONTAINMENT_VENDORS
    );
  }

  @action
  async fetchThirdPartyAdministrators(
    orgId: string,
    keyword?: string
  ): Promise<void> {
    const tpas = await getThirdPartyAdministrators(orgId);
    if (!!keyword) {
      const filteredTpas = Array.isArray(tpas)
        ? tpas
            .filter(
              (tpa: ITpa) =>
                tpa?.name?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
                !keyword
            )
            ?.filter((tpa: ITpa) => !!tpa?.can_customize_program)
        : [];
      this.tpas = filteredTpas;
    } else {
      this.tpas = Array.isArray(tpas)
        ? tpas?.filter((tpa: ITpa) => !!tpa?.can_customize_program)
        : [];
    }
  }

  @action
  async fetchNetworkIngredientWithTPAs(prospectId: string): Promise<void> {
    this.networkIngredientWithTPAs = await getNetworkIngredientWithTPAs(
      prospectId
    );
  }

  @action
  async fetchOrgRecipe(prospectId: string, recipeId: string): Promise<void> {
    this.orgRecipe = await getOrgRecipeById(prospectId, recipeId);
  }

  setTpasCollapsed(tpasCollapsed: boolean): void {
    this.tpasCollapsed = tpasCollapsed;
  }

  setNetworkCategoryTree(
    tpaOrder: number,
    networkCategoryTree: INetworkCategoriesWorker
  ): void {
    const newNetworkCategoryTree = [...this.networkCategoryTree];
    newNetworkCategoryTree[tpaOrder] = networkCategoryTree;
    set(this.networkCategoryTree, newNetworkCategoryTree);
  }

  @action
  public setLoadingProgress(loadingProgress: number): void {
    this.loadingProgress = loadingProgress;
  }
  @action
  async generateBuildProgram(prospectId: string, recipeId: string, data: any) {
    const response = await generateProgram(prospectId, recipeId, data);
    return response;
  }

  @action
  public calculateNumberOfPrograms() {
    let tpa_network_pbm_combinations = 0;
    const tpas = get(this.orgRecipe, "tpas", []);
    const planSets = get(this.orgRecipe, "plan_sets", []);
    if (!tpas.length || !planSets.length) {
      this.numberOfPrograms = 0;
    } else {
      tpas.forEach(function (tpa) {
        const ingredients = tpa.network_ingredients;
        const pbms = ingredients.filter(function (ingredient) {
          return (
            ingredient.network_ingredient_type === NETWORK_INGREDIENT_TYPE.PBM
          );
        });
        const networks = ingredients.filter(function (ingredient) {
          return (
            ingredient.network_ingredient_type ===
              NETWORK_INGREDIENT_TYPE.SUB_NET ||
            ingredient.network_ingredient_type === NETWORK_INGREDIENT_TYPE.RBP
          );
        });
        tpa_network_pbm_combinations += pbms.length * networks.length;
      });

      const valid_plansets = planSets.filter(function (planset) {
        return planset.plans.length > 0;
      }).length;

      this.numberOfPrograms = tpa_network_pbm_combinations * valid_plansets;
    }
  }
}

export default ProgramBuildStore;
