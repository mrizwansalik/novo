import { defaultCompositeTiers } from "src/constants";
import { IFamilyStatusPricings, IPlan } from "src/interfaces/benefit";
import { participationMappings } from "./constants";

export function getTierLabel(tier: IFamilyStatusPricings): string {
  if (tier.name.length === 2 || !tier.code) {
    return tier.name;
  }

  if (tier.name.length > 2 || tier.code) {
    return tier.code;
  }

  return "";
}

export function getDefaultPlanFormData(plan: IPlan) {
  plan.hasRenewalRates = false;

  participationMappings.map((mapping) => {
    if (!plan[mapping.key]) {
      plan[mapping.key] = 0;
    }
    return plan;
  });

  let pricings;
  const { family_status_pricings } = plan;
  if (
    Array.isArray(family_status_pricings) &&
    family_status_pricings.length > 0
  ) {
    pricings = family_status_pricings.map((pricing) => {
      // TODO: check version for renewal_price_at_expected
      if (pricing.renewal_price) {
        plan.hasRenewalRates = true;
      }
      if (!pricing.price) {
        pricing.price = 0;
      }
      if (!pricing.price_at_expected) {
        pricing.price_at_expected = 0;
      }
      if (!pricing.renewal_price) {
        pricing.renewal_price = 0;
      }
      if (!pricing.renewal_price_at_expected) {
        pricing.renewal_price_at_expected = 0;
      }

      return pricing;
    });
  } else {
    pricings = defaultCompositeTiers;
  }

  plan.family_status_pricings = pricings;
  return plan;
}
