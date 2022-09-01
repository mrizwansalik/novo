import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Col } from "reactstrap";
import { StyledNumberInput } from "../../planDetailForm.style";
import {
  Container,
  StyledRow,
  StyledRadioGroup,
  StyledInputRadio,
} from "./formRadioGroup.style";

const DEDUCTIBLE_COINSURANCE = "deductible_coinsurance";
const DOLLARS = "dollars";

const FormRadioGroup = (props) => {
  const {
    labelGroup,
    mapping = "",
    defaultValue,
    label,
    disabled = false,
  } = props;

  const { control, setValue } = useFormContext();

  const handleChangeCoPay = (onChange) => {
    onChange(DOLLARS);
    setValue(mapping, defaultValue);
  };

  const handleChangeCoInsurance = (onChange) => {
    onChange(DEDUCTIBLE_COINSURANCE);
    setValue(mapping, null);
  };

  const selectedFieldValue = useWatch({
    control,
    name: `${mapping}_type`,
  });
  const hasType = selectedFieldValue === "true";

  const hsaQualified = useWatch({
    control,
    name: "hsa_qualified",
  });

  useEffect(() => {
    if (!hasType) {
      setValue(`${mapping}_type`, DEDUCTIBLE_COINSURANCE);
    }
  }, [hasType]);

  useEffect(() => {
    if (hsaQualified) {
      setValue(`${mapping}_type`, DEDUCTIBLE_COINSURANCE);
      setValue(`${mapping}`, null);
    }
  }, [hsaQualified]);

  return (
    <Container>
      <StyledRow>
        <Col xs="6" lg="7">
          <Controller
            control={control}
            name={`${mapping}_type`}
            render={({ field: { onChange, value } }) => (
              <StyledRadioGroup>
                <legend>{labelGroup.main}</legend>
                <div>
                  <StyledInputRadio
                    label={labelGroup.top}
                    disabled={hsaQualified}
                    value={DEDUCTIBLE_COINSURANCE}
                    onChange={(e) => handleChangeCoInsurance(onChange)}
                    checked={value === DEDUCTIBLE_COINSURANCE}
                  />
                  <StyledInputRadio
                    label={labelGroup.bottom}
                    disabled={hsaQualified}
                    value={DOLLARS}
                    onChange={() => handleChangeCoPay(onChange)}
                    checked={value === DOLLARS}
                  />
                </div>
              </StyledRadioGroup>
            )}
          />
        </Col>
        {selectedFieldValue === DOLLARS && (
          <Col xs="6" lg="5">
            <Controller
              control={control}
              name={mapping}
              render={({ field: { onChange, value } }) => (
                <StyledNumberInput
                  onValueChange={({ value }) => onChange(value)}
                  value={value}
                  thousandSeparator={true}
                  prefix={"$ "}
                  allowEmptyFormatting
                />
              )}
            />
          </Col>
        )}
      </StyledRow>
    </Container>
  );
};

export default FormRadioGroup;
