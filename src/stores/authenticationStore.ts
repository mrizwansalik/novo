import { get } from "lodash";
import { action, observable } from "mobx";
import { IOrg } from "src/interfaces/org";
import { IRootStore } from "./rootStore";

class AuthenticationStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  @observable
  isOrgAllay: boolean = false;

  @observable
  isGod: boolean = false;

  @action
  public checkIsWorkerGod() {
    const currentWorker = this.rootStore.workerStore.currentWorker;
    const isWorkerGlobalAdmin = get(currentWorker, "is_global_admin", false);
    this.isGod = isWorkerGlobalAdmin;
  }

  @action
  public checkIsOrgAllay(org: IOrg): boolean {
    const isOrgAllay = org && org.is_the_force_strong_with_this_one === true;
    this.isOrgAllay = isOrgAllay;
    return isOrgAllay;
  }
}

export default AuthenticationStore;
