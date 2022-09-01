import { IOnboardingStep, IProspectProgress } from "src/interfaces/onboarding";
import {
  createCensusStep,
  createClientProfileStep,
  createExistingPlansStep,
  createHealthHistoryStep,
} from "src/utils/onboarding";

export function configOnboardingState(
  currentPath: string,
  prospectProgress: IProspectProgress
): IOnboardingStep {
  let step: IOnboardingStep;
  if (currentPath.includes("profile")) {
    step = createClientProfileStep(prospectProgress);
  }

  if (currentPath.includes("census")) {
    step = createCensusStep(prospectProgress);
  }

  if (currentPath.includes("health")) {
    step = createHealthHistoryStep(prospectProgress);
  }

  if (currentPath.includes("existing-plans")) {
    step = createExistingPlansStep(prospectProgress);
  }

  return step;
}
