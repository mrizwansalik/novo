import { action, observable, makeObservable } from "mobx";
import { getMedicalPlansInPlanSet } from "src/api/planSet";
import { IMedicalPlan } from "src/interfaces/orgRecipes";
import { IRootStore } from "./rootStore";

class ProgramBuildPlanSetsStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  showPlanDetails: boolean = true;

  @observable
  plans: IMedicalPlan[] = [];

  @action
  public async getMedicalPlans(
    prospectId: string,
    planSetId: string
  ): Promise<void> {
    if (prospectId && planSetId) {
      const medicalPlans = await getMedicalPlansInPlanSet(
        prospectId,
        planSetId
      );
      this.plans = medicalPlans;
    } else {
      this.plans = [];
    }
  }

  @action
  public updateMedicalPlans(medicalPlans: IMedicalPlan[]) {
    this.plans = medicalPlans;
  }
}

export default ProgramBuildPlanSetsStore;
