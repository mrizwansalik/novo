import React, { useEffect } from "react";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Row } from "reactstrap";
import { IParamTypes } from "src/types";
import { getStopLossOptionNameFromVariables } from "src/utils/quote";
import {
  StyledCheckbox,
  StyledCol,
  StyledInput,
} from "../../programBuildStopLoss.style";

const NameSection = () => {
  const { stopLossId } = useParams<IParamTypes>();
  const methods = useFormContext();
  const { control, getValues, setValue } = methods;

  const watchGenerateName = useWatch({
    control,
    name: "generateNameFromVariables",
  });

  function handleChangeName(nameValue, onChange) {
    setValue("generateNameFromVariables", false);
    onChange(nameValue);
  }

  useEffect(() => {
    if (watchGenerateName) {
      const formData = getValues();
      const currentStopLoss = get(formData, "currentStopLoss");
      const generatedName =
        getStopLossOptionNameFromVariables(currentStopLoss) + "%";
      setValue("currentStopLoss.name", generatedName);
    }
  }, [watchGenerateName, stopLossId]);

  return (
    <>
      <Row>
        <StyledCol lg={6} md={6}>
          <Controller
            control={control}
            name="currentStopLoss.name"
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, value } }) => (
              <StyledInput
                isControlled
                label="Name"
                placeholder="e.g. Aetna POS 1000"
                value={value}
                onChange={(e) => handleChangeName(e.target.value, onChange)}
              />
            )}
          />
        </StyledCol>
        <StyledCol lg={6} md={6}>
          <Controller
            control={control}
            name="generateNameFromVariables"
            render={({ field: { value, onChange } }) => (
              <StyledCheckbox
                label="Generate Name From Variables"
                onChange={onChange}
                checked={value}
              />
            )}
          />
        </StyledCol>
      </Row>
      <Row>
        <StyledCol lg={10} md={10}>
          <Controller
            control={control}
            name="currentStopLoss.notes"
            render={({ field: { onChange, value } }) => (
              <StyledInput
                isControlled
                label="Note"
                placeholder="e.g. Aetna POS 1000"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </StyledCol>
      </Row>
    </>
  );
};

export default NameSection;
