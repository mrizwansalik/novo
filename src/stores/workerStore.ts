import { isEmpty } from "lodash";
import get from "lodash/get";
import { action, observable, makeObservable } from "mobx";
import { getWorkerSignUpToken } from "src/api/benefits";
import { IWorkerSignUpToken } from "src/interfaces/authentication";
import { fetchCurrentWorker as fetchCurrentWorkerApi } from "../api/fetchWorker";
import {
  getOrgWorkers,
  getProspectWorkers as getProspectWorkersAPI,
} from "../api/worker";
import { IWorker } from "../interfaces/worker";
import { IRootStore } from "./rootStore";
class WorkerStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.fetchCurrentWorker = this.fetchCurrentWorker.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
  }

  @observable
  workers: IWorker[] = [];

  @observable
  prospectWorkers: IWorker[] = [];

  @observable
  currentWorker: IWorker;

  @observable
  isLoading: boolean = false;

  @observable
  workerSignUpToken: string = "";

  @observable
  isGod: boolean = false;

  @action
  public async fetchCurrentWorker() {
    try {
      const workerInfo: IWorker = await fetchCurrentWorkerApi();
      this.currentWorker = workerInfo;
      localStorage.setItem("workerEmail", get(this.currentWorker, "email", ""));
    } catch (err) {}
  }

  @action
  public async setIsLoading(value) {
    this.isLoading = value;
  }

  @action
  public async getWorkers(orgId: string): Promise<void> {
    const workers: IWorker[] = await getOrgWorkers(orgId);
    this.workers = workers;
  }

  @action
  public async getProspectWorkers(prospectId: string): Promise<void> {
    const prospectWorkers: IWorker[] = await getProspectWorkersAPI(prospectId);
    this.prospectWorkers = prospectWorkers;
  }

  @action
  public setCurrentWorker(worker: IWorker): void {
    this.currentWorker = worker;
    if (!isEmpty(worker)) {
      const isWorkerGlobalAdmin = get(worker, "is_global_admin", false);
      this.isGod = isWorkerGlobalAdmin;
    }
  }

  @action
  public async createWorkerSignUpToken(orgId: string): Promise<void> {
    const signUpToken: IWorkerSignUpToken = await getWorkerSignUpToken(orgId);
    this.workerSignUpToken = signUpToken?.token;
  }
}

export default WorkerStore;
