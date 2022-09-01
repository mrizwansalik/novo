import { filter } from "lodash";
import { CoverageType } from "src/constants/enum/plan";
import { ICensusHuman } from "src/interfaces/census";
import { IMedicalPlan } from "src/interfaces/orgRecipes";

export function isParticipationValid(
  plan: IMedicalPlan,
  census: ICensusHuman[]
) {
  if (
    plan.participation_estimation_employee === 0 &&
    plan.participation_estimation_employee_spouse === 0 &&
    plan.participation_estimation_employee_child === 0 &&
    plan.participation_estimation_employee_family === 0
  ) {
    return false;
  }
  if (
    plan.participation_estimation_employee >
      filter(census, function (census) {
        return census.coverage_type === CoverageType.EMPLOYEE;
      }).length ||
    plan.participation_estimation_employee_spouse >
      filter(census, function (census) {
        return census.coverage_type === CoverageType.EMPLOYEE_SPOUSE;
      }).length ||
    plan.participation_estimation_employee_child >
      filter(census, function (census) {
        return census.coverage_type === CoverageType.EMPLOYEE_CHILDREN;
      }).length ||
    plan.participation_estimation_employee_family >
      filter(census, function (census) {
        return census.coverage_type === CoverageType.EMPLOYEE_FAMILY;
      }).length
  ) {
    return false;
  }
  return true;
}

export async function updateParticipation(plan: IMedicalPlan) {}
