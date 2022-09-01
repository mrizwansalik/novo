import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IDependentDetail } from "src/interfaces/dependent";

function addDependentDetailForm() {
  const formControl = useForm<IDependentDetail>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { control, trigger, setValue } = formControl;

  useEffect(() => {
    trigger();
  }, []);

  return {
    formControl,
    control,
  };
}

export default addDependentDetailForm;
