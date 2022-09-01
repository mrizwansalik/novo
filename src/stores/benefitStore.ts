import { action, observable, makeObservable } from "mobx";
import { getDocuments } from "src/api/document";
import { IClaimsData, IPhqDocument } from "src/interfaces/benefit";
import { IClaimsDocuments } from "src/interfaces/prospects";
import { IAssignedDocumentsTree } from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import { getClaimsData, getPhqDocuments } from "../api/benefits";
import { IRootStore } from "./rootStore";
class BenefitStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  claimsData: IClaimsData[] = [];

  @observable
  phqDocuments: IPhqDocument[] = [];

  @observable
  renderedPhqDocuments: IPhqDocument[] = [];

  @observable
  selectedPhqDocuments: IPhqDocument[] = [];

  @observable
  assignedDocuments: IPhqDocument[] = [];

  @observable
  selectedAssignedDocument: IAssignedDocumentsTree = {} as IAssignedDocumentsTree;

  @observable
  loadingProgress: number = 0;

  @observable
  currentClaimsDocuments: IClaimsDocuments[] = [];

  @observable
  claimsYears: string[] = [];

  @observable
  claimsMonthsData = [];

  @observable
  yearClaimsAmount: number[] = [];

  @observable
  totalClaimsAmount: number = 0;

  @observable
  yearAssumedDiscounts: number[] = [];

  @observable
  yearStopLossClaims = [];

  @observable
  totalYearStopLossClaims: number[] = [];

  @observable
  totalStopLossClaims: number = 0;

  @action
  public async getClaimsDetail(orgId: string): Promise<void> {
    const claimsData = await getClaimsData(orgId);
    this.claimsData = claimsData.sort((a, b) => a.year - b.year);
    const highestStopLossCount = claimsData.reduce((prev, cur) => {
      if (cur.stop_loss_claims.length > prev) {
        return cur.stop_loss_claims.length;
      }
      return prev;
    }, 0);
    this.resetClaimsDataStore();
    this.claimsData.forEach((item, index) => {
      item.monthly_claims.forEach((month, monthIndex) => {
        this.claimsMonthsData[monthIndex]
          ? this.claimsMonthsData[monthIndex].push(month || 0)
          : (this.claimsMonthsData[monthIndex] = [month || 0]);
      });
      this.claimsYears[index] = item.year.toString();
      this.yearClaimsAmount[index] = item.monthly_claims.reduce((prev, cur) => {
        return prev + cur || prev;
      }, 0);
      this.yearAssumedDiscounts[index] = item.assumed_discount * 100;

      for (let i = 0; i < highestStopLossCount; i++) {
        this.yearStopLossClaims[i]
          ? this.yearStopLossClaims[i].push(
              item.stop_loss_claims[i]?.amount || 0
            )
          : (this.yearStopLossClaims[i] = [
              item.stop_loss_claims[i]?.amount || 0,
            ]);
      }
    });

    this.totalClaimsAmount = this.yearClaimsAmount.reduce(
      (total, current) => total + current || total,
      0
    );

    this.yearStopLossClaims.forEach((item) => {
      item.forEach((year, yearIndex) => {
        this.totalYearStopLossClaims[yearIndex]
          ? (this.totalYearStopLossClaims[yearIndex] += year || 0)
          : (this.totalYearStopLossClaims[yearIndex] = year || 0);
      });
    });

    this.totalStopLossClaims = this.totalYearStopLossClaims.reduce(
      (total, current) => total + current || total,
      0
    );
  }

  @action
  public async fetchPhqDocuments(): Promise<void> {
    this.phqDocuments = await getPhqDocuments();
  }

  @action
  public async fetchSelectedPhqDocuments(prospectId: string): Promise<void> {
    const phqDocuments = await getDocuments(prospectId);
    this.renderedPhqDocuments = [...phqDocuments];
    this.selectedPhqDocuments = [...phqDocuments];
  }

  @action
  public async fetchAssignedDocuments(prospectId: string): Promise<void> {
    this.assignedDocuments = await getDocuments(prospectId);
  }

  @action
  public setLoadingProgress(loadingProgress: number): void {
    this.loadingProgress = loadingProgress;
  }

  @action setSelectedPhqDocuments(selectedPhqDocuments: IPhqDocument[]): void {
    this.selectedPhqDocuments = [...selectedPhqDocuments];
  }

  @action setRenderedPhqDocuments(renderedPhqDocuments: IPhqDocument[]): void {
    this.renderedPhqDocuments = [...renderedPhqDocuments];
  }

  @action
  public setSelectedAssignedDocument(
    selectedAssignedDocument: IAssignedDocumentsTree
  ): void {
    this.selectedAssignedDocument = selectedAssignedDocument;
  }

  @action
  public setClaimsData(data: IClaimsData[]) {
    this.claimsData = data.sort((a, b) => a.year - b.year);
    const highestStopLossCount = data.reduce((prev, cur) => {
      if (cur.stop_loss_claims.length > prev) {
        return cur.stop_loss_claims.length;
      }
      return prev;
    }, 0);
    this.resetClaimsDataStore();
    this.claimsData.forEach((item, index) => {
      item.monthly_claims.forEach((month, monthIndex) => {
        this.claimsMonthsData[monthIndex]
          ? this.claimsMonthsData[monthIndex].push(month || 0)
          : (this.claimsMonthsData[monthIndex] = [month || 0]);
      });
      this.claimsYears[index] = item.year.toString();
      this.yearClaimsAmount[index] = item.monthly_claims.reduce((prev, cur) => {
        return prev + cur || prev;
      }, 0);
      this.yearAssumedDiscounts[index] = item.assumed_discount * 100;

      for (let i = 0; i < highestStopLossCount; i++) {
        this.yearStopLossClaims[i]
          ? this.yearStopLossClaims[i].push(
              item.stop_loss_claims[i]?.amount || 0
            )
          : (this.yearStopLossClaims[i] = [
              item.stop_loss_claims[i]?.amount || 0,
            ]);
      }
    });

    this.totalClaimsAmount = this.yearClaimsAmount.reduce(
      (total, current) => total + current || total,
      0
    );

    this.yearStopLossClaims.forEach((item) => {
      item.forEach((year, yearIndex) => {
        this.totalYearStopLossClaims[yearIndex]
          ? (this.totalYearStopLossClaims[yearIndex] += year || 0)
          : (this.totalYearStopLossClaims[yearIndex] = year || 0);
      });
    });

    this.totalStopLossClaims = this.totalYearStopLossClaims.reduce(
      (total, current) => total + current || total,
      0
    );
  }

  @action
  public setClaimsDocuments(claimsDocuments: IClaimsDocuments[]) {
    this.currentClaimsDocuments = claimsDocuments;
  }

  @action
  public resetClaimsDataStore(): void {
    this.claimsYears = [];
    this.claimsMonthsData = [];
    this.yearClaimsAmount = [];
    this.totalClaimsAmount = 0;
    this.yearAssumedDiscounts = [];
    this.yearStopLossClaims = [];
    this.totalYearStopLossClaims = [];
    this.totalStopLossClaims = 0;
  }
}

export default BenefitStore;
