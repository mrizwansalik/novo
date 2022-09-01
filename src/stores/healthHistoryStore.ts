import { action, makeObservable, observable } from "mobx";

import {
  getWorkerSignUpToken as getWorkerSignUpTokenApi,
  getWaivedUsers as getWaivedUsersApi,
  getPhqDocuments as getPhqDocumentsApi,
} from "src/api/benefits";
import { getDocuments } from "src/api/document";
import { getOrgWorkers } from "src/api/worker";
import {
  updateWorkerDocumentStatus as updateWorkerDocumentStatusApi,
  deleteWorker as deleteWorkerApi,
} from "src/api/worker";
import { SpecialTime } from "src/constants";
import { IWorkerSignUpToken } from "src/interfaces/authentication";
import { IPhqDocument, IWaivedUser } from "src/interfaces/benefit";
import { IWorker } from "src/interfaces/worker";
import { IRootStore } from "./rootStore";

class HealthHistoryStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  workerSignupToken: string = "";

  @observable
  workerList: IWorker[] = [];

  @observable
  documentList: IPhqDocument[] = [];

  @observable
  waivedUserList: IWaivedUser[] = [];

  @observable
  awaitingWorkers: IWorker[] = [];

  @observable
  unsubmittedWorkers: IWorker[] = [];

  @observable
  submittedWorkers: IWorker[] = [];

  @observable
  workersHasSignedDocuments: string[] = [];

  @observable
  allPhqDocuments: IPhqDocument[] = [];

  @observable
  displayPHQs: IPhqDocument[] = [];

  @observable
  selectedWorkers: any = {};

  @observable
  selectedWorkerIdList: string[] = [];

  @observable
  selectedYear: string = `${SpecialTime.LAST_YEAR}`;

  @action
  public async getWorkerSignUpToken(prospectId: string): Promise<void> {
    const signUpToken: IWorkerSignUpToken = await getWorkerSignUpTokenApi(
      prospectId
    );
    this.workerSignupToken = signUpToken?.token;
  }

  @action
  public async getWorkerList(prospectId: string): Promise<void> {
    const workers: IWorker[] = await getOrgWorkers(prospectId);
    this.workerList = workers;
  }

  @action
  public async getDocumentList(prospectId: string): Promise<void> {
    const documents = await getDocuments(prospectId);
    this.documentList = documents;
  }

  @action
  public async getWaivedUsers(prospectId: string): Promise<void> {
    const waivedUsers = await getWaivedUsersApi(prospectId);
    this.waivedUserList = waivedUsers;
  }

  @action
  public async getAllPhqDocuments(): Promise<void> {
    const documents = await getPhqDocumentsApi();
    this.allPhqDocuments = documents;
  }

  @action
  public async fetchWorkerData(prospectId: string): Promise<void> {
    await Promise.all([
      this.getAllPhqDocuments(),
      this.getWorkerSignUpToken(prospectId),
      this.getWorkerList(prospectId),
      this.getDocumentList(prospectId),
      this.getWaivedUsers(prospectId),
    ]);
    this.initSelectedWorkers();
  }

  @action
  public setAwaitingWorkers(workers: IWorker[]): void {
    this.awaitingWorkers = workers || [];
  }

  @action
  public setUnsubmittedWorkers(workers: IWorker[]): void {
    this.unsubmittedWorkers = workers || [];
  }

  @action
  public setSubmittedWorkers(workers: IWorker[]): void {
    this.submittedWorkers = workers || [];
  }
  @action
  public setWorkersHasSignedDocuments(workerIds: string[]): void {
    this.workersHasSignedDocuments = workerIds || [];
  }
  @action
  public async updateWorkerDocumentStatus(
    prospectId: string,
    workerId: string,
    documentId: string,
    value: string
  ): Promise<void> {
    await updateWorkerDocumentStatusApi(workerId, documentId, value);
    await this.getDocumentList(prospectId);
  }

  @action
  public async deleteWorker(workerId: string): Promise<void> {
    await deleteWorkerApi(workerId);
  }

  @action
  public async getDisplayPhqList(): Promise<void> {
    const displayDocuments = this.documentList.map((document) => {
      document.carrier = this.allPhqDocuments.find(
        (item) => item.id === document.id
      )?.carrier;
      return document;
    });
    this.displayPHQs = displayDocuments;
  }

  @action
  public setSelectedWorker(workers: any): void {
    this.selectedWorkers = workers;
    this.selectedWorkerIdList = Object.keys(this.selectedWorkers);
  }

  @action
  public initSelectedWorkers(): void {
    this.selectedWorkers = {};
    this.workerList?.forEach((item) => {
      this.selectedWorkers[item.id] = false;
    });
    this.selectedWorkerIdList = Object.keys(this.selectedWorkers);
  }

  @action
  public setSelectedYear(selectedYear: string): void {
    this.selectedYear = selectedYear;
  }
}

export default HealthHistoryStore;
