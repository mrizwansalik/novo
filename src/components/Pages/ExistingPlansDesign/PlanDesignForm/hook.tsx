import { useEffect, useState } from "react";
import { get } from "lodash";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import { addOrgCarrier, listOrgCarriers } from "src/api/plan";
import { ICarrierPlan, ICarrier } from "src/interfaces/benefit";
import { formatDefaultValue, IPlanDesignForm } from "./utils";

function usePlanDesignForm(carrierPlan: ICarrierPlan) {
  const [carrierOptions, setCarrierOptions] = useState([]);

  const params = useParams();
  const prospectId = get(params, "prospectId");

  const formDefaultValue = formatDefaultValue(carrierPlan);

  const formControl = useForm<IPlanDesignForm>({
    mode: "onChange",
    defaultValues: formDefaultValue,
  });

  const { control, reset } = formControl;

  const watchCarrier = useWatch({
    control,
    name: "carrier",
  });

  async function handleCarrierOptions(prospectId: string) {
    const stopLossCarriers: ICarrier[] = await listOrgCarriers(prospectId);
    const options =
      (Array.isArray(stopLossCarriers) &&
        stopLossCarriers.map((item) => {
          if (!item.is_standard) {
            item.lozengeText = "Custom";
          }
          return { ...item, label: item.name, value: item.id };
        })) ||
      [];
    setCarrierOptions(options);
  }

  async function handleAddCarrierOptions(
    prospectId: string,
    carrierName: string
  ) {
    const carrierData = { name: carrierName } as ICarrier;
    const newCarrier = await addOrgCarrier(prospectId, carrierData);
    newCarrier.lozengeText = "Custom";
    const newCarrierOption = {
      ...carrierOptions,
      label: newCarrier.name,
      value: newCarrier.id,
    };
    setCarrierOptions([...carrierOptions, newCarrierOption]);
  }

  useEffect(() => {
    const resetValue = formatDefaultValue(carrierPlan);
    reset(resetValue, { keepDirty: true });
  }, [carrierPlan]);

  useEffect(() => {
    if (prospectId) {
      handleCarrierOptions(prospectId);
    }
  }, [prospectId]);

  useEffect(() => {
    const isNew = get(watchCarrier, "__isNew__", false);
    const carrierName = get(watchCarrier, "label");
    if (isNew && carrierName) {
      handleAddCarrierOptions(prospectId, carrierName);
    }
  }, [watchCarrier]);

  // TODO: unsolved bug with react hook form isDirty state
  // useEffect(() => {
  //   if (watchDeductibleIn && isDirty) {
  //     setValue("deductible_family_in", watchDeductibleIn * 2);
  //   } else {
  //     setValue("deductible_family_in", 0);
  //   }
  // }, [watchDeductibleIn]);

  // useEffect(() => {
  //   if (watchOutOfPocketMaxIn && isDirty) {
  //     setValue("out_of_pocket_max_family_in", watchOutOfPocketMaxIn * 2);
  //   } else {
  //     setValue("out_of_pocket_max_family_in", 0);
  //   }
  // }, [watchOutOfPocketMaxIn]);

  return { formControl, formDefaultValue, carrierOptions };
}

export default usePlanDesignForm;
