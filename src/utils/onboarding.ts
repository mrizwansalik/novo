import { get } from "lodash";
import { IOnboardingStep, IProspectProgress } from "src/interfaces/onboarding";

export function createClientProfileStep(
  progress: IProspectProgress
): IOnboardingStep {
  const client = get(progress, "client");
  return {
    label: "Client Profile",
    code: "profile",
    steps: 1,
    stepIndex: client ? 1 : 0,
    skipped: false,
    skippable: false,
    route: ".profile",
  };
}

export function createCensusStep(progress: IProspectProgress): IOnboardingStep {
  const step: IOnboardingStep = {
    label: "Census",
    code: "census",
    steps: 2,
    stepIndex: -1,
    skipped: false,
    skippable: true,
    route: ".client.census",
    routes: [
      ".client.census",
      ".client.census.choice",
      ".client.census.template",
      ".client.census.details",
    ],
  };

  if (progress) {
    step.skipped = progress.census_skipped && progress.census_count === 0;
    if (progress.census_count >= 5) {
      // completed if there are more than 5 uploaded census humans
      step.stepIndex = step.steps;
    }
  }

  return step;
}

export function createHealthHistoryStep(
  progress: IProspectProgress
): IOnboardingStep {
  const step: IOnboardingStep = {
    label: "Health History",
    code: "health_history",
    steps: 3,
    stepIndex: -1,
    skipped: false,
    skippable: true,
    route: ".client.health",
    routes: [
      ".client.health",
      ".client.health.choice",
      ".client.health.claims-documents",
      ".client.health.claims-history",
    ],
  };

  if (progress) {
    if (progress.census_skipped) {
      // NOT skippable if census was skipped
      step.skippable = false;
    }

    step.skipped = progress.health_history_skipped;

    // claims docs or PHQs started?
    if (progress.claims_documents_count >= 2) {
      // BE increments claims_documents_count by 1 if the previous year has all three doc types (claims, claims_large
      //claims_benefits_) and then by 1 again if current year has all three docs tagged for the three doc types
      //thus if claims_documents_count is greater than 2 then documents step is deemed complete
      step.steps = 3;
      step.stepIndex = 2;

      if (progress.claims_data_count > 0) {
        // claims data complete
        step.stepIndex = 3;
      } else {
        // claims data incomplete
        step.stepIndex = 2;
      }
    } else if (progress.phq_workers > 0 || progress.phq_count > 2) {
      step.steps = progress.census_skipped ? 3 : 2; // choice, emails/phqs, (phq progress if census was skipped)
      step.stepIndex = 1; // emails/phqs

      if (
        progress.phq_workers > 0 &&
        progress.phq_workers_completed_phqs === progress.phq_workers
      ) {
        // if humans have been added and they all are complete (for export function               // step, that they have emails)
        step.stepIndex = 2;

        // if census was skipped there is an additional phq progress step
        if (
          progress.census_skipped &&
          progress.phq_workers > 0 &&
          progress.phq_workers_completed_phqs === progress.phq_workers
        ) {
          step.stepIndex = 3;
        }
      }
    }
  }

  return step;
}

export function createExistingPlansStep(
  progress: IProspectProgress
): IOnboardingStep {
  const step: IOnboardingStep = {
    label: "Existing Plans",
    code: "existing_plans",
    steps: 4,
    stepIndex: -1,
    skipped: false,
    skippable: true,
    route: ".client.existing-plans",
    routes: [
      ".client.existing-plans",
      ".client.existing-plans.choice",
      ".client.existing-plans.self-funded-stop-loss",
      ".client.existing-plans.plan-design",
      ".client.existing-plans.participation",
      ".client.existing-plans.documents",
    ],
  };

  if (progress) {
    step.skipped = progress.existing_plans_skipped;
    step.fully_funded = !progress.existing_plans_self_funded;
    step.index_offset = 0;
    if (progress.existing_plans_self_funded) {
      // has extra stop-loss step
      step.steps += 1;
      step.index_offset = 1;
    }

    if (progress.existing_plans_count === 0) {
      // stop-loss or plans
      step.stepIndex = step.stepIndex + step.index_offset;
    } else if (
      progress.existing_plans_complete < progress.existing_plans_count
    ) {
      // plan participation & pricing incomplete
      step.stepIndex = step.stepIndex + step.index_offset + 3;
    } else if (!progress.existing_plans_documents_complete) {
      // existing_plans_documents_complete is a boolean
      step.stepIndex = step.stepIndex + step.index_offset + 4;
    } else {
      step.stepIndex = step.steps;
    }
  }

  return step;
}

export function createProgramBuildStep(
  progress: IProspectProgress
): IOnboardingStep {
  const step: IOnboardingStep = {
    label: "Program Build",
    code: "program_build",
    steps: 8,
    stepIndex: -1,
    skipped: false,
    skippable: false,
    route: ".client.program-build",
  };

  if (progress) {
    if (progress.has_org_recipe) {
      //has_org_recipe is a boolean
      step.has_org_recipe = progress.has_org_recipe;
      //set stepIndex to 1 since in progress logic we search for furthest completed subroute,
      //and we calculate subroute completion by stepIndex
      step.stepIndex = 0;
      /* TODO
          if (progress.program_build.stop_loss_terms > 0) {
              step.stepIndex = step.steps;
          } else if (progress.program_build.expenses > 0) {
              step.stepIndex = step.steps - 1;
          } else if (progress.program_build.plans > 0) {
              step.stepIndex = step.steps - 2;
          } else if (progress.program_build.tpas > 0) {
              step.stepIndex = step.steps - 3;
          } else if (progress.program_build.vendors > 0) {
              step.stepIndex = step.steps - 4;
          } else if (progress.program_build.pbms > 0) {
              step.stepIndex = step.steps - 5;
          } else if (progress.program_build.provider_access > 0) {
              step.stepIndex = step.steps - 6;
          }
          */
    }
  }

  return step;
}

export function onboardingHeaderSteps(progress: IProspectProgress) {
  progress.client = true;

  return [
    createClientProfileStep(progress),
    createCensusStep(progress),
    createHealthHistoryStep(progress),
    createExistingPlansStep(progress),
    createProgramBuildStep(progress),
  ];
}
