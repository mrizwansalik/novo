import { get, isEmpty } from "lodash";
import { createOrgPlan } from "src/api/plan";
import { addOrgPlanToExistingPlans } from "src/api/quote";
import { copayTypeOptions } from "src/constants";
import { ICarrierPlan, IPlan } from "src/interfaces/benefit";
import { IOption } from "src/types";
import {
  hasCopayAmount,
  hasCopayMax,
  isCopayTypePercentage,
  saveCarrierPlan,
  saveOrgPlan,
} from "src/utils/benefit";

export interface IPlanDesignForm {
  id?: string;
  name?: string;
  hsa_qualified: boolean;
  carrier?: IOption;
  deductible_in: number;
  deductible_family_in: number;
  out_of_pocket_max_in: number;
  out_of_pocket_max_family_in: number;
  coinsurance_in: number;
  copay_office_visit_type?: IOption;
  copay_office_visit: number;
  copay_office_visit_max: number;
}

export async function trySavePlan(formData, orgId, currentPlan?: ICarrierPlan) {
  const carrierPlan = formatFormData(formData);

  const carrierOrTpaID = carrierPlan.carrier.carrier
    ? carrierPlan.carrier.carrier
    : carrierPlan.carrier;

  const newCarrierPlan = await saveCarrierPlan(
    carrierOrTpaID,
    carrierPlan,
    orgId
  );

  let newOrgPlan: IPlan;
  if (currentPlan) {
    currentPlan.name = newCarrierPlan.name;
    newOrgPlan = await saveOrgPlan(orgId, currentPlan);
  } else {
    const emptyPlan: IPlan = {
      carrier_plan_id: newCarrierPlan.id,
    };
    newOrgPlan = await createOrgPlan(orgId, emptyPlan);
    await addOrgPlanToExistingPlans(orgId, newOrgPlan);
  }
  return newOrgPlan;
  // TODO: set plan to state
}

export function formatFormData(formData: IPlanDesignForm) {
  const carrier = get(formData, "carrier.value");
  const copay_office_visit_type = get(
    formData,
    "copay_office_visit_type.value"
  );
  const {
    deductible_in,
    deductible_family_in,
    out_of_pocket_max_in,
    out_of_pocket_max_family_in,
    coinsurance_in,
    copay_office_visit,
    copay_office_visit_max,
  } = formData;

  const coinsuranceIn = Number(coinsurance_in) / 100;
  const copayOfficeVisit = isCopayTypePercentage(copay_office_visit_type)
    ? Number(copay_office_visit) / 100
    : Number(copay_office_visit);
  const copayOfficeVisitMax =
    isCopayTypePercentage(copay_office_visit_type) && copay_office_visit_max
      ? Number(copay_office_visit_max) / 100
      : Number(copay_office_visit_max);
  return {
    ...formData,
    carrier,
    copay_office_visit_type,
    coinsurance_in: coinsuranceIn,
    copay_office_visit: copayOfficeVisit,
    copay_office_visit_max: copayOfficeVisitMax,
    deductible_in: Number(deductible_in),
    deductible_family_in: Number(deductible_family_in),
    out_of_pocket_max_in: Number(out_of_pocket_max_in),
    out_of_pocket_max_family_in: Number(out_of_pocket_max_family_in),
  };
}

export function validateForm(formData, setError): boolean {
  const { copay_office_visit, copay_office_visit_max } = formData;
  const copayType = get(formData, "copay_office_visit_type.value", "");

  if (hasCopayAmount(copayType) && copay_office_visit <= 0) {
    setError("copay_office_visit", {
      type: "manual",
      message: "This field is required",
    });
    return false;
  }

  if (hasCopayMax(copayType) && copay_office_visit_max <= 0) {
    setError("copay_office_visit_max", {
      type: "manual",
      message: "This field is required",
    });
    return false;
  }

  return true;
}

export function formatDefaultValue(carrierPlan: ICarrierPlan) {
  const formDefaultValue = {
    id: get(carrierPlan, "id", ""),
    name: get(carrierPlan, "name", ""),
    hsa_qualified: get(carrierPlan, "hsa_qualified", false),
    deductible_in: get(carrierPlan, "deductible_in", 0),
    deductible_family_in: get(carrierPlan, "deductible_family_in", 0),
    out_of_pocket_max_in: get(carrierPlan, "out_of_pocket_max_in", 0),
    out_of_pocket_max_family_in: get(
      carrierPlan,
      "out_of_pocket_max_family_in",
      0
    ),
    coinsurance_in: get(carrierPlan, "coinsurance_in", 0) * 100,
    copay_office_visit: get(carrierPlan, "copay_office_visit", 0),
    copay_office_visit_max: get(carrierPlan, "copay_office_visit_max", 0),
    carrier: null,
    copay_office_visit_type: null,
  };

  const carrier = get(carrierPlan, "carrier", {});
  const copay_office_visit_type = get(
    carrierPlan,
    "copay_office_visit_type",
    ""
  );

  if (!isEmpty(carrier)) {
    const selectedCarrier = {
      ...carrier,
      label: get(carrier, "name"),
      value: get(carrier, "id"),
    };
    formDefaultValue.carrier = selectedCarrier;
  }

  if (copay_office_visit_type) {
    const selectedCopayType = copayTypeOptions.find(
      (option) => option.value === copay_office_visit_type
    );
    formDefaultValue.copay_office_visit_type = selectedCopayType;
  }

  return formDefaultValue;
}
