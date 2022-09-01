import { action, observable, makeObservable } from "mobx";
import {
  addExpense,
  getOrgRecipe,
  removeExpense,
  updateExpense,
} from "src/api/expenses";
import { IFee } from "src/interfaces/benefit";
import { IRootStore } from "./rootStore";

class ProgramBuildExpensesStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  showPlanDetails: boolean = true;

  @observable
  fees: IFee[] = [];

  @action
  public async getFees(orgId: string, orgRecipeId: string) {
    const fees = await getOrgRecipe(orgId, orgRecipeId);
    this.fees = fees.fees;
  }

  @action
  public async addExpenseAction(
    prospectId: string,
    recipeId: string,
    data: IFee
  ): Promise<void> {
    const fee = await addExpense(prospectId, recipeId, data);
    this.fees = [...this.fees.filter((i) => i.id), fee];
  }

  @action
  public async updateExpenseAction(
    prospectId: string,
    recipeId: string,
    data: IFee
  ): Promise<void> {
    const fee = await updateExpense(prospectId, recipeId, data);
    this.fees = [...this.fees.filter((i) => i.id !== fee.id), fee];
  }
  @action
  public async deleteExpenseAction(
    prospectId: string,
    recipeId: string,
    expenseId: string
  ): Promise<void> {
    await removeExpense(prospectId, recipeId, expenseId);
    this.fees = this.fees.filter((i) => i.id !== expenseId);
  }
}

export default ProgramBuildExpensesStore;
