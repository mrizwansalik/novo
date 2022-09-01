import { get, isObject, isUndefined } from "lodash";
import moment from "moment";
import {
  addCarrierPlan,
  createOrgPlan,
  createOrgPlanCompositeTier,
  updateCarrierPlan,
  updateOrgPlan,
  updateOrgPlanCompositeTier,
} from "src/api/plan";
import {
  copayTypesDollars,
  copayTypesPercentages,
  emptyMedicalCarrierPlan,
} from "src/constants";
import { ContributionType } from "src/constants/enum/plan";
import {
  IClaimsData,
  ICarrierPlan,
  IPlan,
  IFamilyStatusPricings,
} from "src/interfaces/benefit";
import { IOrg } from "src/interfaces/org";

export async function saveCarrierPlan(carrierId, plan, orgId) {
  let upsertedPlan: ICarrierPlan;
  if (plan && plan.id) {
    upsertedPlan = await updateCarrierPlan(carrierId, plan);
  } else {
    upsertedPlan = await addCarrierPlan(carrierId, plan, orgId);
  }

  return upsertedPlan;
}

export async function saveOrgPlan(orgId, plan) {
  let orgPlan: IPlan;
  if (plan.id) {
    orgPlan = await updateOrgPlan(orgId, plan);
  } else {
    orgPlan = await createOrgPlan(orgId, plan);
  }
  return orgPlan;
}

export function hasCopayAmount(copayType: string): boolean {
  return isCopayTypePercentage(copayType) || isCopayTypeDollars(copayType);
}

export function isCopayTypePercentage(copayType: string) {
  return copayTypesPercentages.includes(copayType);
}

export function isCopayTypeDollars(copayType: string) {
  return copayTypesDollars.includes(copayType);
}

export function hasCopayMax(copayType: string): boolean {
  return copayType.includes("max");
}

export function getExistingCarrierPlan(
  org: IOrg,
  allClaimsData: IClaimsData[],
  selfFundedProgram
): ICarrierPlan {
  // get variables from claims data if possible
  const newMedicalPlan: ICarrierPlan = emptyMedicalCarrierPlan;
  if (org && allClaimsData) {
    const lastYear = getLastClaimsYear(org);
    const claimsData = allClaimsData.find(
      (claimsData) => claimsData.year === lastYear
    );
    if (claimsData) {
      setExistingPlanFromClaimsData(newMedicalPlan, claimsData);
    }
  }

  // set tpa from program
  if (selfFundedProgram) {
    newMedicalPlan.carrier = selfFundedProgram.carrier;
  }

  return newMedicalPlan;
}

export function getLastClaimsYear(org: IOrg) {
  if (
    isObject(org) &&
    isObject(org.census_data) &&
    isObject(org.census_data.health_plan)
  ) {
    const effectiveDateMoment = moment(
      org.census_data.health_plan.effective_date
    );
    if (effectiveDateMoment.isValid()) {
      return effectiveDateMoment.year() - 1;
    }
  }
  return moment().year() - 1;
}

export function setExistingPlanFromClaimsData(
  existingPlan: ICarrierPlan,
  claimsData: IClaimsData
) {
  if (isObject(existingPlan) && isObject(claimsData)) {
    existingPlan.deductible_in = claimsData.experience_deductible;
    existingPlan.deductible_family_in = existingPlan.deductible_in * 2;
    existingPlan.coinsurance_in = claimsData.experience_coinsurance;
    existingPlan.out_of_pocket_max_in = claimsData.experience_oop_max;
    existingPlan.out_of_pocket_max_family_in =
      existingPlan.out_of_pocket_max_in * 2;
  }
}

export async function saveOrgPlanCompositeTiers(orgId: string, plan: IPlan) {
  const tiers: IFamilyStatusPricings[] = get(
    plan,
    "family_status_pricings",
    []
  );
  const hasRenewalRates = get(plan, "hasRenewalRates", false);

  const promises = [];
  tiers.forEach((tier) => {
    if (!hasRenewalRates) {
      tier.renewal_price = 0;
      tier.renewal_price_at_expected = 0;
    }

    // Remove the error from the tiers
    if (!isUndefined(tier.error)) {
      delete tier.error;
    }

    // set rate if percentage
    if (tier.contribution_type === ContributionType.PERCENTAGE) {
      tier.contribution_rate = tier.contribution_percent;
      tier.dependent_contribution_rate = tier.dependent_contribution_percent;
    }
    const promise = saveOrgPlanCompositeTier(orgId, plan.id, tier);
    promises.push(promise);
  });

  await Promise.all(promises);
}

export async function saveOrgPlanCompositeTier(
  orgId: string,
  planId: string,
  tier: IFamilyStatusPricings
): Promise<IFamilyStatusPricings> {
  let newTier;
  if (tier.id) {
    newTier = await updateOrgPlanCompositeTier(orgId, planId, tier);
  } else {
    newTier = await createOrgPlanCompositeTier(orgId, planId, tier);
  }

  return newTier;
}

export async function saveOrgPlans(
  orgId: string,
  plans: IPlan[]
): Promise<IPlan[]> {
  const saveOrgPlanPromises = [];
  plans.forEach((plan) => {
    const saveOrgPlanPromise = saveOrgPlan(orgId, plan);
    saveOrgPlanPromises.push(saveOrgPlanPromise);
  });
  const newPlans = await Promise.all(saveOrgPlanPromises);
  return newPlans;
}
