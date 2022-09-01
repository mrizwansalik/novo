import { filter } from "lodash";
import { CoverageType } from "src/constants/enum/plan";
import { participationMappings } from "src/constants/humanCensus";
import { IPlan } from "src/interfaces/benefit";
import { ICensusHuman } from "src/interfaces/census";

export function getPlanParticipation(census: ICensusHuman[]) {
  const censusCount = {
    participation_estimation_employee: 0,
    participation_estimation_employee_spouse: 0,
    participation_estimation_employee_child: 0,
    participation_estimation_employee_family: 0,
  };
  census.forEach((human) => {
    const { coverage_type } = human;
    if (coverage_type === CoverageType.EMPLOYEE) {
      censusCount.participation_estimation_employee++;
    }
    if (coverage_type === CoverageType.EMPLOYEE_SPOUSE) {
      censusCount.participation_estimation_employee_spouse++;
    }
    if (coverage_type === CoverageType.EMPLOYEE_CHILDREN) {
      censusCount.participation_estimation_employee_child++;
    }
    if (coverage_type === CoverageType.EMPLOYEE_FAMILY) {
      censusCount.participation_estimation_employee_family++;
    }
  });

  const planParticipation = {};
  participationMappings.forEach((mapping) => {
    planParticipation[mapping] = censusCount[mapping];
  });

  return planParticipation;
}

export function getParticipationFromExistingPlansOrCensusOptions(
  census: ICensusHuman[],
  existingPlans: IPlan[]
) {
  const numberOfCensusEmployeesWithType = getNumberOfEpmloyeesWithType(census);
  const optionFromCensus = {
    label: "Census",
    value: {
      participation_estimation_employee: numberOfCensusEmployeesWithType.EE,
      participation_estimation_employee_spouse:
        numberOfCensusEmployeesWithType.ES,
      participation_estimation_employee_child:
        numberOfCensusEmployeesWithType.EC,
      participation_estimation_employee_family:
        numberOfCensusEmployeesWithType.EF,
    },
  };

  let participationOptions = [
    {
      label: "-",
      value: {
        participation_estimation_employee: 0,
        participation_estimation_employee_spouse: 0,
        participation_estimation_employee_child: 0,
        participation_estimation_employee_family: 0,
      },
    },
    optionFromCensus,
  ];

  if (Array.isArray(existingPlans) && existingPlans.length > 0) {
    const optionsFormPlans = existingPlans.map(function (plan) {
      return {
        label: plan.carrier_plan.name,
        value: {
          participation_estimation_employee:
            plan.participation_estimation_employee || 0,
          participation_estimation_employee_spouse:
            plan.participation_estimation_employee_spouse || 0,
          participation_estimation_employee_child:
            plan.participation_estimation_employee_child || 0,
          participation_estimation_employee_family:
            plan.participation_estimation_employee_family || 0,
        },
      };
    });
    participationOptions = [...participationOptions, ...optionsFormPlans];
  }

  return participationOptions;
}

export function getNumberOfEpmloyeesWithType(census: ICensusHuman[]) {
  return {
    EE: filter(census, function (censusItem) {
      return censusItem.coverage_type === CoverageType.EMPLOYEE;
    }).length,
    ES: filter(census, function (censusItem) {
      return censusItem.coverage_type === CoverageType.EMPLOYEE_SPOUSE;
    }).length,
    EC: filter(census, function (censusItem) {
      return censusItem.coverage_type === CoverageType.EMPLOYEE_CHILDREN;
    }).length,
    EF: filter(census, function (censusItem) {
      return censusItem.coverage_type === CoverageType.EMPLOYEE_FAMILY;
    }).length,
  };
}
