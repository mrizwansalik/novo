import { action, makeObservable, observable } from "mobx";
import { getProspectProgress } from "src/api/prospects";
import { IProspectProgress } from "src/interfaces/onboarding";
import { IRootStore } from "./rootStore";

class ProspectDashboardStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  currentProspectProgress: IProspectProgress;

  @action
  public async setCurrentProspectProgress(prospectId: string) {
    this.currentProspectProgress = await getProspectProgress(prospectId);
  }
}

export default ProspectDashboardStore;
