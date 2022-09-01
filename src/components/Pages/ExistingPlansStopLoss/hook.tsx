import { useEffect, useState } from "react";
import { get } from "lodash";
import { useForm, useWatch } from "react-hook-form";
import {
  createOrgStopLossCarrier,
  createOrgThirdPartyAdministrator,
  listOrgThirdPartyAdministrators,
  listStopLossCarriers,
} from "src/api/benefits";
import {
  aggregateAttachmentPoints,
  contractTypes,
  specificDeductibles,
} from "src/constants/quote";
import { ICarrier, ICarrierPlan, ITpa, IVersion } from "src/interfaces/benefit";
import { IStopLossCarrierOption, ITpaOption } from "./interfaces";
import { handleVersionDefaultValue } from "./utils";

function useStopLossForm(
  orgId: string,
  selfFundedProgram: ICarrierPlan,
  version: IVersion
) {
  const [tpaOptions, setTpaOptions] = useState<ITpaOption[]>([]);
  const [stopLossCarrierOptions, setStopLossCarrierOptions] = useState<
    IStopLossCarrierOption[]
  >([]);

  const formControl = useForm({
    mode: "onChange",
    shouldUnregister: true,
    defaultValues: {
      tpa: null,
      stop_loss_carrier: null,
      specific_deductible: specificDeductibles[0],
      contract_length: contractTypes[2],
      aggregate_attachment_percent: aggregateAttachmentPoints[4],
      aggregate_tlo: "false",
      specific_tlo: "false",
      has_advanced_specific_funding: "true",
      has_agg_accommodation: "true",
      has_aggregating_specific: "false",
      aggregating_specific_deductible: 0,
    },
  });

  const { control, reset } = formControl;

  const watchTpa = useWatch({
    control,
    name: "tpa",
  });
  const watchCarrier = useWatch({
    control,
    name: "stop_loss_carrier",
  });

  async function handleTpaOptions(orgId: string) {
    const orgTpas: ITpa[] = await listOrgThirdPartyAdministrators(orgId);
    const options =
      (Array.isArray(orgTpas) &&
        orgTpas.map((tpa) => {
          if (!tpa.is_standard) {
            tpa.lozengeText = "Custom";
          }
          return { ...tpa, label: tpa.name, value: tpa.id };
        })) ||
      [];
    setTpaOptions(options);
  }

  async function handleStopLossCarrierOptions() {
    const stopLossCarriers: ICarrier[] = await listStopLossCarriers();
    const options =
      (Array.isArray(stopLossCarriers) &&
        stopLossCarriers.map((item) => {
          if (!item.is_standard) {
            item.lozengeText = "Custom";
          }
          return { ...item, label: item.name, value: item.id };
        })) ||
      [];
    setStopLossCarrierOptions(options);
  }

  async function handleAddTpaOptions(orgId: string, tpaName: string) {
    const tpaData = { name: tpaName } as ITpa;
    const newTpa = await createOrgThirdPartyAdministrator(orgId, tpaData);
    newTpa.lozengeText = "Custom";
    const newTpaOption = { ...newTpa, label: newTpa.name, value: newTpa.id };
    setTpaOptions([...tpaOptions, newTpaOption]);
  }

  async function handleAddCarrierOptions(orgId: string, carrierName: string) {
    const carrierData = { name: carrierName } as ICarrier;
    const newCarrier = await createOrgStopLossCarrier(orgId, carrierData);
    newCarrier.lozengeText = "Custom";
    const newCarrierOption = {
      ...stopLossCarrierOptions,
      label: newCarrier.name,
      value: newCarrier.id,
    };
    setStopLossCarrierOptions([...stopLossCarrierOptions, newCarrierOption]);
  }

  useEffect(() => {
    handleStopLossCarrierOptions();
  }, []);

  useEffect(() => {
    if (orgId) {
      handleTpaOptions(orgId);
    }
  }, [orgId]);

  useEffect(() => {
    const carrier = get(selfFundedProgram, "carrier") as ICarrier;
    const versionId = get(version, "id");
    if (tpaOptions.length && carrier && versionId) {
      const defaultTpaOption = tpaOptions.find(
        (tpa) => tpa.carrier === carrier.id
      );
      const versionDefaultValue = handleVersionDefaultValue(version);
      const formDefaultValue = {
        tpa: defaultTpaOption,
        ...versionDefaultValue,
      };
      reset(formDefaultValue);
    }
  }, [tpaOptions, selfFundedProgram, version]);

  useEffect(() => {
    const isNew = get(watchTpa, "__isNew__", false);
    const tpaName = get(watchTpa, "label");
    if (isNew && tpaName) {
      handleAddTpaOptions(orgId, tpaName);
    }
  }, [watchTpa]);

  useEffect(() => {
    const isNew = get(watchCarrier, "__isNew__", false);
    const tpaName = get(watchCarrier, "label");
    if (isNew && tpaName) {
      handleAddCarrierOptions(orgId, tpaName);
    }
  }, [watchCarrier]);

  return { formControl, tpaOptions, stopLossCarrierOptions };
}

export default useStopLossForm;
