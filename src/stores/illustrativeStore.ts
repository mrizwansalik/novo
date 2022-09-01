import { action, observable, makeObservable } from "mobx";
import { illustrativeDetail } from "src/api/illustrative";
import { listPlanComparisonsWithSummaryPricing } from "src/api/plan";
import { IRootStore } from "./rootStore";

class IllustrativeStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.getIllustrative = this.getIllustrative.bind(this);
    this.summaryPrice = this.summaryPrice.bind(this);
  }

  @observable
  illustrative: any = {};

  @observable
  summaryPricing: any = [];

  @observable
  expenses: any = [];

  @action
  public async getIllustrative(orgId: string, planId: string) {
    const response = await illustrativeDetail(orgId, planId);
    this.illustrative = response;
    this.expenses = response?.versions[0]?.fees;
    for (
      let i = 0;
      i <= response?.versions[0]?.network_ingredients?.length;
      i++
    ) {
      if (response?.versions[0]?.network_ingredients[i]?.fees?.length > 0) {
        this.expenses.push(
          response?.versions[0]?.network_ingredients[i]?.fees[0]
        );
      }
    }
    return response;
  }

  @action
  public async summaryPrice(orgId: string) {
    const response = await listPlanComparisonsWithSummaryPricing(orgId);
    this.summaryPricing = response;
    return response;
  }
}

export default IllustrativeStore;
