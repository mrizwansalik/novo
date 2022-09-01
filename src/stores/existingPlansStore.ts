import { action, makeObservable, observable } from "mobx";
import { getOrgPlan } from "src/api/plan";
import { listExistingPlans } from "src/api/quote";
import { ICarrierPlan, IPlan, IVersion } from "src/interfaces/benefit";
import { getExistingCarrierPlan } from "src/utils/benefit";
import { IRootStore } from "./rootStore";

class ExistingPlansStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  existingPlans: IPlan[] = [];

  @observable
  plan: IPlan;

  @observable
  carrierPlan: ICarrierPlan;

  @observable
  selfFundedProgram: ICarrierPlan;

  @observable
  version: IVersion = {
    version_type: "existing",
    stop_loss_carrier: null,
    aggregating_specific_deductible: null,
    lasers: [],
  };

  @action
  public async getExistingPlans(orgId: string) {
    const existingPlans = await listExistingPlans(orgId);
    this.existingPlans = existingPlans;
  }

  @action
  public async getExistingPlan(orgId: string, planId: string) {
    if (planId) {
      const existingPlan = await getOrgPlan(orgId, planId);
      this.plan = existingPlan;
    } else {
      this.plan = null;
    }
  }

  @action
  public setCarrierPlan() {
    if (this.plan) {
      this.carrierPlan = this.plan.carrier_plan;
    } else {
      this.carrierPlan = getExistingCarrierPlan(
        this.rootStore.orgStore.orgDetail,
        this.rootStore.benefitStore.claimsData,
        this.selfFundedProgram
      );
    }
  }

  @action
  public updateExistingPlans(orgPlan: IPlan) {
    const foundIndex = this.existingPlans.findIndex(
      (plan) => plan.id === orgPlan.id
    );
    if (foundIndex > -1) {
      this.existingPlans[foundIndex] = orgPlan;
    } else {
      this.existingPlans.push(orgPlan);
    }
  }

  @action
  public setSelfFundedProgram(program: ICarrierPlan) {
    this.selfFundedProgram = program;
  }

  @action
  public setVersion(version: IVersion) {
    this.version = version;
  }

  @action removeExistingPlan(planId: string) {
    const planList = this.existingPlans;
    const index = planList.findIndex((plan) => plan.id === planId);
    if (index > -1) {
      planList.splice(index, 1);
      this.existingPlans = planList;
    }
  }

  @action setExistingPlans(plans: IPlan[]) {
    this.existingPlans = plans;
  }
}

export default ExistingPlansStore;
