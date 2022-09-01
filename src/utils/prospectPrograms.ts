import { cloneDeep, each, filter } from "lodash";
import { PROGRAM_TYPE } from "src/constants/enum";
import { ICarrierPlan } from "src/interfaces/benefit";
import { IProspectProgress } from "src/interfaces/prospects";

export function getAvailableIllustrativePrograms(programs: ICarrierPlan[]) {
  const rval = [];
  const illustVersions = getIllustrativeProgramVersions(programs);
  each(illustVersions, function (program) {
    if (hasAvailableIllustrativeVersion(program)) {
      rval.push(program);
    }
  });

  return rval;
}

export function getAvailableUnderwrittenPlanComparisons(
  programs: ICarrierPlan[]
) {
  const rval = [];
  const underwrittenComparisons = getUnderwrittenPlanComparisons(programs);
  each(underwrittenComparisons, function (program) {
    if (hasAvailableUnderwrittenVersion(program)) {
      rval.push(program);
    }
  });
  return rval;
}

export function getIllustrativeProgramVersions(programs: ICarrierPlan[]) {
  const rval = [];
  each(programs, function (program) {
    const illustVersions = getIllustrativeVersions(program);
    if (illustVersions.length > 0) {
      rval.push(program);
    }
  });
  return rval;
}

export function getUnderwrittenPlanComparisons(programs: ICarrierPlan[]) {
  const rval = [];
  each(programs, function (program) {
    const underwrittenVersions = getUnderwrittenProgramVersions(program);
    if (underwrittenVersions.length > 0) {
      rval.push(program);
    }
  });

  return rval;
}

export function hasAvailableIllustrativeVersion(planComparison: ICarrierPlan) {
  const illustVersions = getIllustrativeVersions(planComparison);

  let hasAvailable = false;
  each(illustVersions, function (illustVersion) {
    if (
      illustVersion.status === PROGRAM_TYPE.AVAIL ||
      illustVersion.status === PROGRAM_TYPE.PENDING
    ) {
      hasAvailable = true;
    }
  });
  return hasAvailable;
}

export function hasAvailableUnderwrittenVersion(planComparison: ICarrierPlan) {
  const underwrittenVersions = getUnderwrittenProgramVersions(planComparison);
  let hasAvailable = false;
  each(underwrittenVersions, function (underwrittenVersion) {
    if (underwrittenVersion.status === PROGRAM_TYPE.AVAIL) {
      hasAvailable = true;
    }
  });
  return hasAvailable;
}

export function getIllustrativeVersions(planComparison: ICarrierPlan) {
  return filter(planComparison.versions, { version_type: PROGRAM_TYPE.ILLUST });
}

export function getUnderwrittenProgramVersions(planComparison: ICarrierPlan) {
  return filter(planComparison.versions, { version_type: "underwritten" });
}

export function updateProgramsVersions(
  currentPrograms: ICarrierPlan[],
  updatedPrograms: ICarrierPlan[]
): ICarrierPlan[] {
  const newPrograms = cloneDeep(currentPrograms);

  newPrograms.forEach((program) => {
    const updatedProgram = updatedPrograms.find(
      (plan) => plan.id === program.id
    );
    program.pricing_calculation_complete =
      updatedProgram.pricing_calculation_complete;

    // For each version get the updated version, and then update the constious price fields
    program.versions.forEach((programVersion) => {
      const updatedVersion = updatedProgram.versions.find(
        (version) => version.id === programVersion.id
      );
      if (updatedVersion) {
        programVersion.status = updatedVersion.status;
        programVersion.network_ingredients = updatedVersion.network_ingredients;
        programVersion.risk_corridor = updatedVersion.risk_corridor;
        programVersion.total_annual_admin_fees =
          updatedVersion.total_annual_admin_fees;
        programVersion.total_annual_cost_no_corridor =
          updatedVersion.total_annual_cost_no_corridor;
        programVersion.total_annual_maximum_cost =
          updatedVersion.total_annual_maximum_cost;
        programVersion.total_annual_stop_loss_cost =
          updatedVersion.total_annual_stop_loss_cost;
        programVersion.total_expected_claims_fund =
          updatedVersion.total_expected_claims_fund;
        programVersion.version_type = updatedVersion.version_type;
      }
    });

    return program;
  });

  return newPrograms;
}

export function existingPlanDocumentsProvided(
  clientProgress: IProspectProgress
) {
  if (clientProgress) {
    return clientProgress.existing_plans_documents_complete;
  }
  return false;
}

export function phqsProvided(clientProgress: IProspectProgress) {
  if (clientProgress) {
    return (
      clientProgress.phq_workers > 0 &&
      clientProgress.phq_workers_completed_phqs === clientProgress.phq_workers
    );
  }
  return false;
}

export function claimsDataProvided(clientProgress: IProspectProgress) {
  if (clientProgress) {
    return clientProgress.claims_documents_count >= 2;
  }
  return false;
}

export function checkCanBeUnderwritten(
  isGod: boolean,
  clientProgress: IProspectProgress
): boolean {
  if (isGod) {
    return true;
  }
  if (existingPlanDocumentsProvided(clientProgress)) {
    if (claimsDataProvided(clientProgress)) {
      return true;
    }
    if (phqsProvided(clientProgress)) {
      return true;
    }
  }
  return false;
}
