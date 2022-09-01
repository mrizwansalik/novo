/* eslint-disable max-lines */
import { isObject, isEmpty } from "lodash";
import { createOrgRecipe, getOrgRecipes } from "src/api/orgRecipes";
import { listPlanComparisons } from "src/api/plan";
import { IVersion, IFee, ICarrierPlan } from "src/interfaces/benefit";
import { IOrgRecipes } from "src/interfaces/orgRecipes";

export const defaultContractType = "12/18";
export const defaultAggregateAttachmentPoint = 1.25;
export const defaultSpecificDeductible = 20000;

export function getDefaultVersion(): IVersion {
  const version: IVersion = {
    version_type: "existing",
    stop_loss_carrier: null,
    aggregating_specific_deductible: null,
    lasers: [],
  };

  version.name = "";
  version.specific_deductible = 10000;
  version.aggregate_attachment_percent = 1.15;
  version.specific_tlo = false;
  version.aggregate_tlo = false;
  version.has_agg_accommodation = true;
  version.has_advanced_specific_funding = true;
  if (version.version_type === "underwritten") {
    setVersionFeeAmount(
      version,
      "aggregate_accommodation",
      "Aggregate Accommodation",
      0
    );
    setVersionFeeAmount(
      version,
      "advanced_specific_funding",
      "Advanced Specific Funding",
      0
    );
    version.contract_length_spec = "12/18";
    version.contract_length_agg = "12/18";
  } else {
    version.contract_length = "12/18";
  }

  return version;
}

export function setVersionFeeAmount(
  version: IVersion,
  type: string,
  name: string,
  amount: number
) {
  let fee: IFee = version.fees.find((fee: IFee) => fee.fee_type === type);
  if (name) {
    if (!fee) {
      fee = getNewFee(type);
      version.fees.push(fee);
    }
    fee.name = name;
    fee.amount_number = amount;
    fee.amount_type = "fixed_per_employee_per_month";
  }
}

export function getNewFee(feeType: string, amountType?: string) {
  return {
    fee_type: feeType,
    amount_type: amountType ? amountType : "fixed_per_employee_per_month",
    name: "",
    amount_number: 0,
    amount_employee: 0,
    amount_spouse: 0,
    amount_children: 0,
    amount_family: 0,
    amount_text: "",
  };
}

export function getEmptyPlanComparison(effectiveDate: string) {
  return {
    versions: [],
    contract_length: defaultContractType,
    aggregate_attachment_percent: defaultAggregateAttachmentPoint,
    specific_tlo: false,
    aggregate_tlo: false,
    aggregate_accommodation: 0,
    has_agg_accommodation: true,
    has_advanced_specific_funding: true,
    effective_date: effectiveDate,
    fees: [],
    plan_ids: [],
  };
}

export async function getOrCreateOrgRecipe(
  orgId: string
): Promise<IOrgRecipes> {
  const orgRecipes: IOrgRecipes[] = await getOrgRecipes(orgId);

  if (orgRecipes.length === 0) {
    const newRecipe = await createOrgRecipe(orgId);
    return newRecipe;
  }
  return orgRecipes[0]; //TODO: temporary. we will have more thatn one recipe per org in the future
}

export async function getProgramsThatHaveVersions(
  orgId: string,
  orgRecipeId?: string
): Promise<ICarrierPlan[]> {
  const programs: ICarrierPlan[] = await listPlanComparisons(orgId);

  const versions = programs.filter((program) => {
    let includeProgram = true;
    program.versions.forEach(function (version) {
      if (version.version_type === "existing") {
        includeProgram = false;
      }

      if (orgRecipeId && program.recipe_key === null) {
        includeProgram = false;
      }
    });
    return includeProgram;
  });

  return versions;
}

/*
  Carrier: Creative Risk Underwriters
  Spec: $25,000
  Spec Contract: 12/15
  Advanced Funding: Yes
  Agg Corridor: 125%
  Agg Contract: 12/12
  Agg Accommodation: Yes
  Terminal Liabiilty Option: Yes

  Displayed Name: Creative -- $25k 12/15 AF; 125% 12/12 AA TLO
*/
export function getStopLossOptionNameFromVariables(stopLossOption?) {
  let name = "";
  if (!isEmpty(stopLossOption)) {
    // carrier name part
    if (
      isObject(stopLossOption.stop_loss_carrier) &&
      stopLossOption.stop_loss_carrier.name
    ) {
      const toks = stopLossOption.stop_loss_carrier.name.split(" ");
      if (toks.length > 0) {
        name = toks[0] + " - ";
      }
    }

    const specPartsString = getStopLossOptionNameSpec(stopLossOption);
    name += specPartsString;

    const aggPartsString = getStopLossOptionNameAgg(stopLossOption);

    if (specPartsString && aggPartsString) {
      name += "; ";
    }

    // Aggregating Specific Deductible
    if (stopLossOption.aggregating_specific_deductible > 0) {
      name += "AgSp $";
      name += stopLossOption.aggregating_specific_deductible;
      name += "; ";
    }

    name += aggPartsString;
  }
  return name.trim();
}

export function getStopLossOptionNameSpec(stopLossOption) {
  let str = "";
  if (!isEmpty(stopLossOption)) {
    const specParts = [];

    // specific deductible part
    let specThousands = 0;
    const specificDeductible =
      typeof stopLossOption.specific_deductible === "number"
        ? stopLossOption.specific_deductible
        : stopLossOption.specific_deductible.value;
    if (isFinite(specificDeductible)) {
      specThousands = Math.trunc(specificDeductible / 1000);
    }
    specParts.push("$" + specThousands + "k");

    if (stopLossOption.version_type === "underwritten") {
      // specific contract part
      if (stopLossOption.contract_length_spec) {
        specParts.push(stopLossOption.contract_length_spec);
      }
    } else {
      // contract part
      const contractLength =
        typeof stopLossOption.contract_length === "string"
          ? stopLossOption.contract_length
          : stopLossOption.contract_length.value;
      if (contractLength) {
        specParts.push(contractLength);
      }
    }

    // advanced specific funding part
    if (stopLossOption.has_advanced_specific_funding) {
      specParts.push("AF");
    }

    // agg TLO part
    if (stopLossOption.specific_tlo) {
      specParts.push("TLO");
    }

    if (specParts.length > 0) {
      str = specParts.join(" ");
    }
  }
  return str;
}

export function getStopLossOptionNameAgg(stopLossOption) {
  let str = "";
  if (stopLossOption) {
    let aggParts = [];

    // agg corridor part
    let aggCorridor = 0;
    const attachmentPercent =
      typeof stopLossOption.aggregate_attachment_percent === "number"
        ? stopLossOption.aggregate_attachment_percent
        : stopLossOption.aggregate_attachment_percent.value;
    if (isFinite(attachmentPercent)) {
      aggCorridor = attachmentPercent.toFixed(2);
    }
    aggParts.push(aggCorridor);

    // agg contract part
    if (stopLossOption.contract_length_agg) {
      aggParts.push(stopLossOption.contract_length_agg);
    }

    // agg accommodation part
    if (stopLossOption.has_agg_accommodation) {
      aggParts.push("AA");
    }

    // agg TLO part
    if (stopLossOption.aggregate_tlo) {
      aggParts.push("TLO");
    }

    if (aggParts.length > 0) {
      str = aggParts.join(" ");
    }
  }
  return str;
}
