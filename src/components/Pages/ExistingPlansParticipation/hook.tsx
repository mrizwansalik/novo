import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { IPlan } from "src/interfaces/benefit";
import { getDefaultPlanFormData } from "./utils";

interface IUseParticipationFormProps {
  plan: IPlan;
}

const useParticipationForm = (props: IUseParticipationFormProps) => {
  const { plan } = props;

  const formControl = useForm();
  const { control, reset } = formControl;

  const watchHasRenewalRates = useWatch({
    control,
    name: "hasRenewalRates",
  });

  useEffect(() => {
    const planData = getDefaultPlanFormData(plan);
    reset(planData);
  }, [plan]);

  return { formControl, watchHasRenewalRates };
};
export default useParticipationForm;
