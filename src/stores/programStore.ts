import { action, observable, makeObservable } from "mobx";
import { getOrgRecipeById } from "src/api/orgRecipes";
import { PlanStateName } from "src/constants";
import { IOrgRecipes } from "src/interfaces/orgRecipes";
import { IRootStore } from "./rootStore";

class ProgramStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  currentStateName: PlanStateName = PlanStateName.PLAN;

  @observable
  orgRecipe: IOrgRecipes;

  @observable
  isDashboardPage: boolean = false;

  @action
  public setCurrentStateName(stateName: PlanStateName) {
    this.currentStateName = stateName;
  }

  @action
  async fetchOrgRecipe(prospectId: string, recipeId: string): Promise<void> {
    this.orgRecipe = await getOrgRecipeById(prospectId, recipeId);
  }

  @action
  public setIsDashboardPage(isDashboardPage: boolean) {
    this.isDashboardPage = isDashboardPage;
  }
}

export default ProgramStore;
