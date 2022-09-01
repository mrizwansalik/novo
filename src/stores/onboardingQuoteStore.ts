import { get } from "lodash";
import { observable, makeObservable, action } from "mobx";
import { getOrgDetail } from "src/api/org";
import { IOnboardingStep, IProspectProgress } from "src/interfaces/onboarding";
import { IOrg } from "src/interfaces/org";

import { IRootStore } from "./rootStore";

class OnboardingQuoteStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  prospectDetail: IOrg;

  @observable
  prospectProgress: IProspectProgress;

  @observable
  step: IOnboardingStep;

  @observable
  currentStage: number = 1;

  @observable
  currentStep: number = 1;

  @action
  public setProspectDetail(prospectDetail: IOrg) {
    this.prospectDetail = prospectDetail;
  }

  @action
  public async getProspectDetail(prospectId: string) {
    if (prospectId) {
      const prospectDetail = await getOrgDetail(prospectId);
      this.prospectDetail = prospectDetail;
    }
  }

  @action
  public setCurrentStage(currentPath: string): void {
    if (currentPath.includes("profile")) {
      this.currentStage = 1;
      return;
    }

    if (currentPath.includes("census")) {
      this.currentStage = 2;
      return;
    }

    if (currentPath.includes("health")) {
      this.currentStage = 3;
    }

    if (currentPath.includes("existing-plans")) {
      this.currentStage = 4;
    }

    if (currentPath.includes("program-build")) {
      this.currentStage = 5;
    }
  }

  @action
  public setCurrentStep(
    currentPath: string,
    onboardingStep?: IOnboardingStep
  ): void {
    const indexOffset = get(onboardingStep, "index_offset", 0);

    if (currentPath.includes("choice") || currentPath.includes("profile")) {
      this.currentStep = 0;
    }

    if (
      currentPath.includes("network") ||
      currentPath.includes("self-funded-stop-loss")
    ) {
      this.currentStep = 1;
    }

    if (
      currentPath.includes("claims-documents") ||
      currentPath.includes("plan-design") ||
      currentPath.includes("participation") ||
      currentPath.includes("invite") ||
      currentPath.includes("pharmacy-benefit-manager")
    ) {
      this.currentStep = 2;
    }

    if (currentPath.includes("plan-design")) {
      this.currentStep = 1 + indexOffset;
    }

    if (
      currentPath.includes("claims-history") ||
      currentPath.includes("status") ||
      currentPath.includes("cost-containment-vendors")
    ) {
      this.currentStep = 3;
    }

    if (currentPath.includes("tpa")) {
      this.currentStep = 4;
    }

    if (currentPath.includes("plansets")) {
      this.currentStep = 5;
    }

    if (currentPath.includes("expenses")) {
      this.currentStep = 6;
    }

    if (currentPath.includes("participation")) {
      this.currentStep = 2 + indexOffset;
    }

    if (currentPath.includes("documents")) {
      this.currentStep = 3 + indexOffset;
    }

    if (currentPath.includes("stop-loss")) {
      this.currentStep = 7;
    }
  }
}

export default OnboardingQuoteStore;
