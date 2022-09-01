import { Controller, useFormContext } from "react-hook-form";
import { SubNetworkFormValues } from "../../../../constants";
import { RelativeBlock, CommonTextarea } from "./customForm.styles";

const CustomForm = () => {
  const { control } = useFormContext();

  return (
    <RelativeBlock>
      <Controller
        name={SubNetworkFormValues.AMOUNT_CUSTOM}
        control={control}
        defaultValue=""
        render={({ field }) => <CommonTextarea {...field} defaultValue="" />}
      />
    </RelativeBlock>
  );
};

export default CustomForm;
