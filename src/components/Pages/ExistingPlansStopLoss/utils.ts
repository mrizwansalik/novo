import { get } from "lodash";
import {
  createPlanComparison,
  createPlanComparisonVersion,
  getExistingPlansVersion,
  listPlanComparisons,
  updatePlanComparison,
  updatePlanComparisonVersion,
} from "src/api/plan";
import { ICarrier, ICarrierPlan, IVersion } from "src/interfaces/benefit";
import { IOrg } from "src/interfaces/org";
import { getSelfFundedProgram } from "src/utils/brokerService";

export function handleVersionDefaultValue(version: IVersion) {
  const stopLossCarrier = version.stop_loss_carrier as ICarrier;
  const stopLossCarrierOption = {
    ...stopLossCarrier,
    label: stopLossCarrier.name,
    value: stopLossCarrier.id,
  };

  const specificDeductible = version.specific_deductible;
  const specificDeductibleOption = {
    label: `$${specificDeductible}`,
    value: specificDeductible,
  };

  const contractLength = version.contract_length;
  const contractLengthOption = {
    label: contractLength,
    value: contractLength,
  };

  const aggregateAttachmentPoint = version.aggregate_attachment_percent;
  const aggregateAttachmentPointOption = {
    label: `${aggregateAttachmentPoint}%`,
    value: aggregateAttachmentPoint,
  };

  const defaultValue = {
    stop_loss_carrier: stopLossCarrierOption,
    specific_deductible: specificDeductibleOption,
    contract_length: contractLengthOption,
    aggregate_attachment_percent: aggregateAttachmentPointOption,
    aggregate_tlo: version.aggregate_tlo.toString(),
    specific_tlo: version.specific_tlo.toString(),
    has_advanced_specific_funding: version.has_advanced_specific_funding.toString(),
    has_agg_accommodation: version.has_agg_accommodation.toString(),
    has_aggregating_specific: (
      version.aggregating_specific_deductible > 0
    ).toString(),
    aggregating_specific_deductible: version.aggregating_specific_deductible,
  };
  return defaultValue;
}

function formatFormData(data) {
  const aggregate_attachment_percent = get(
    data,
    "aggregate_attachment_percent.value"
  );
  const contract_length = get(data, "contract_length.value");
  const specific_deductible = get(data, "specific_deductible.value");
  const aggregate_tlo = get(data, "aggregate_tlo") === "true";
  const has_advanced_specific_funding =
    get(data, "has_advanced_specific_funding") === "true";
  const has_agg_accommodation = get(data, "has_agg_accommodation") === "true";
  const specific_tlo = get(data, "specific_tlo") === "true";

  const carrier = get(data, "tpa.value");
  const versionData = {
    ...data,
    aggregate_attachment_percent,
    specific_deductible,
    contract_length,
    aggregate_tlo,
    has_advanced_specific_funding,
    has_agg_accommodation,
    specific_tlo,
  };
  delete versionData.tpa;

  return { carrier, versionData };
}

export async function handleSubmitForm(
  data,
  prospectId: string,
  selfFundedProgram: ICarrierPlan,
  version: IVersion
) {
  const { carrier, versionData } = formatFormData(data);

  selfFundedProgram.carrier = carrier;
  version = {
    ...version,
    ...versionData,
  };

  let upsertedSelfFundedProgram: ICarrierPlan;
  if (selfFundedProgram.id) {
    upsertedSelfFundedProgram = await updatePlanComparison(
      prospectId,
      selfFundedProgram
    );
  } else {
    upsertedSelfFundedProgram = await createPlanComparison(
      prospectId,
      selfFundedProgram
    );
  }

  let upsertedVersion: IVersion;
  if (version.id) {
    upsertedVersion = await updatePlanComparisonVersion(
      prospectId,
      version,
      upsertedSelfFundedProgram
    );
  } else {
    upsertedVersion = await createPlanComparisonVersion(
      prospectId,
      version,
      upsertedSelfFundedProgram
    );
  }

  // if editing, need to ensure all existing plans have the same TPA and
  // update them if not
  // TODO: handle edit logic later
  // let promises = [];
  // if (upsertedVersion.id) {
  //   each(ctrl.existingPlans, function (plan) {
  //     if (
  //       plan.carrier_plan.carrier.id !== ctrl.selfFundedProgram.carrier.carrier
  //     ) {
  //       var currentCarrierID = plan.carrier_plan.carrier.id;
  //       plan.carrier_plan.carrier = ctrl.selfFundedProgram.carrier.carrier;
  //       promises.push(
  //         benefitService.updateCarrierPlan(currentCarrierID, plan.carrier_plan)
  //       );
  //     }
  //   });
  // }

  return { upsertedVersion, upsertedSelfFundedProgram };
}

export async function handleSelfFundedProgram(
  prospectDetail: IOrg,
  existingPlansStore
) {
  const planComparisons: ICarrierPlan[] = await listPlanComparisons(
    prospectDetail.id
  );
  const selfFundedProgram: ICarrierPlan = getSelfFundedProgram(
    planComparisons,
    prospectDetail
  );
  existingPlansStore.setSelfFundedProgram(selfFundedProgram);
  if (selfFundedProgram && selfFundedProgram.id) {
    const planVersion: IVersion = await getExistingPlansVersion(
      prospectDetail.id,
      selfFundedProgram.id
    );
    existingPlansStore.setVersion(planVersion);
  }
}
