import { useEffect } from "react";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { rxTierFields, RX_TIER_OPTIONS } from "src/constants/rxTier";
import {
  StyledNumberInput,
  StyledInput,
  StyledSelect,
} from "../../planDetailForm.style";
import RxTierSwitch from "../RxTierSwitch";
import { StyledLabel } from "./rxTierSelect.style";

const RxTierSelect = () => {
  const { control, formState, handleSubmit, setValue } = useFormContext();
  const { errors } = formState;
  const rxTierOption = useWatch({
    control,
    name: "medical_plan.rx_tier",
  });
  const selectedHsaQualified = useWatch({
    control,
    name: "medical_plan.hsa_qualified",
  });

  const handleOptionChange = (option) => {
    if (Array.isArray(option.fields)) {
      rxTierFields.forEach((item) => {
        if (option.fields.find((i) => i.mapping === item.mapping)) {
          setValue(item.mapping, item.default);
          setValue(item.mapping + "_type", "dollars");
        } else {
          setValue(item.mapping, 0);
          setValue(item.mapping + "_type", "");
        }
      });
    }
  };

  useEffect(() => {
    if (selectedHsaQualified) {
      setValue("medical_plan.rx_tier", "");
      handleOptionChange(RX_TIER_OPTIONS.find((item) => item.value === ""));
    }
  }, [selectedHsaQualified]);

  return (
    <div>
      <Col sm="12" lg="5">
        <Controller
          control={control}
          name="medical_plan.rx_tier"
          render={({ field: { onChange, value } }) => (
            <StyledSelect
              options={RX_TIER_OPTIONS}
              isDisabled={selectedHsaQualified}
              onChange={(option) => {
                handleOptionChange(option);
                onChange(option.value);
              }}
              defaultValue={RX_TIER_OPTIONS.find((item) => item.value === "")}
              value={RX_TIER_OPTIONS.find((item) => item.value === value)}
            />
          )}
        />
      </Col>
      <Row>
        {[
          "preventative_generic_preferred_non_preferred_specialty",
          "preventative_generic_preferred_non_preferred",
        ].includes(rxTierOption) && (
          <Col sm="2">
            <Controller
              control={control}
              name="medical_plan.rx_preventative"
              render={({ field: { onChange, value } }) => (
                <StyledNumberInput
                  onValueChange={({ value }) => {
                    onChange(value);
                  }}
                  value={value}
                  customInput={StyledInput}
                  thousandSeparator={true}
                  prefix={"$ "}
                  allowEmptyFormatting
                  isControlled
                />
              )}
            />
            <StyledLabel>Preventative</StyledLabel>
          </Col>
        )}
        {rxTierOption !== "" && (
          <>
            <Col sm="2">
              <Controller
                control={control}
                name="medical_plan.rx_generic"
                render={({ field: { onChange, value } }) => (
                  <StyledNumberInput
                    onValueChange={({ value }) => {
                      onChange(value);
                    }}
                    value={value}
                    customInput={StyledInput}
                    thousandSeparator={true}
                    prefix={"$ "}
                    allowEmptyFormatting
                    isControlled
                  />
                )}
              />
              <StyledLabel>Generic</StyledLabel>
            </Col>
            <Col sm="2">
              <Controller
                control={control}
                name="medical_plan.rx_preferred"
                render={({ field: { onChange, value } }) => (
                  <StyledNumberInput
                    onValueChange={({ value }) => {
                      onChange(value);
                    }}
                    value={value}
                    customInput={StyledInput}
                    thousandSeparator={true}
                    prefix={"$ "}
                    allowEmptyFormatting
                    isControlled
                  />
                )}
              />
              <StyledLabel>Preferred</StyledLabel>
            </Col>
            <Col sm="2">
              <Controller
                control={control}
                name="medical_plan.rx_non_preferred"
                render={({ field: { onChange, value } }) => (
                  <StyledNumberInput
                    onValueChange={({ value }) => {
                      onChange(value);
                    }}
                    value={value}
                    customInput={StyledInput}
                    thousandSeparator={true}
                    prefix={"$ "}
                    allowEmptyFormatting
                    isControlled
                  />
                )}
              />
              <StyledLabel>Non-Preferred</StyledLabel>
            </Col>
          </>
        )}
        {[
          "preventative_generic_preferred_non_preferred_specialty",
          "generic_preferred_non_preferred_specialty",
        ].includes(rxTierOption) && (
          <Col sm="4">
            <Row>
              <Col md="5">
                <Controller
                  control={control}
                  name="medical_plan.rx_specialty"
                  render={({ field: { onChange, value } }) => (
                    <StyledNumberInput
                      onValueChange={({ value }) => {
                        onChange(value);
                      }}
                      value={value}
                      customInput={StyledInput}
                      thousandSeparator={true}
                      prefix={"$ "}
                      allowEmptyFormatting
                      isControlled
                    />
                  )}
                />
                <StyledLabel>Specialty</StyledLabel>
              </Col>
              <Col md="7">
                {/* rx_specialty_type */}
                {/* Specialty is co-insurance */}
                <Controller
                  control={control}
                  name="medical_plan.rx_specialty_type"
                  render={({ field: { onChange, value } }) => {
                    const label = `Specialty is ${
                      value === "percentage" ? "co-insurance" : "co-pay"
                    }`;
                    return (
                      <RxTierSwitch
                        label={label}
                        onChange={(e) =>
                          e.target.checked
                            ? onChange("percentage")
                            : onChange("")
                        }
                      />
                    );
                  }}
                />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default RxTierSelect;
