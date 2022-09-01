import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Row } from "reactstrap";
import InputRadio from "src/components/InputRadio";
import NumberInput from "src/components/NumberInput";
import {
  SectionTitle,
  StyledCol,
  StyledInput,
  StyledRadioGroup,
} from "../../programBuildStopLoss.style";

const FundingSection = () => {
  const methods = useFormContext();
  const { control } = methods;

  const hasAggregatingSpecific = useWatch({
    control,
    name: "has_aggregating_specific",
  });

  return (
    <>
      <Row>
        <StyledCol>
          <SectionTitle>Funding</SectionTitle>
        </StyledCol>
      </Row>
      <Row>
        <StyledCol lg={6} md={6}>
          <Controller
            control={control}
            name="has_aggregating_specific"
            render={({ field: { onChange, value } }) => (
              <StyledRadioGroup>
                <legend>Aggregating specific</legend>
                <div>
                  <InputRadio
                    label="Yes"
                    onChange={() => onChange(true)}
                    checked={value === true}
                  />
                  <InputRadio
                    label="No"
                    onChange={() => onChange(false)}
                    checked={value === false}
                  />
                </div>
              </StyledRadioGroup>
            )}
          />
        </StyledCol>
        <StyledCol lg={6} md={6}>
          <Controller
            control={control}
            name="currentStopLoss.has_agg_accommodation"
            render={({ field: { onChange, value } }) => (
              <StyledRadioGroup>
                <legend>Agg Accommodation</legend>
                <div>
                  <InputRadio
                    label="Yes"
                    onChange={() => onChange(true)}
                    checked={value === true}
                  />
                  <InputRadio
                    label="No"
                    onChange={() => onChange(false)}
                    checked={value === false}
                  />
                </div>
              </StyledRadioGroup>
            )}
          />
        </StyledCol>
      </Row>
      {hasAggregatingSpecific && (
        <Row>
          <StyledCol lg={12} md={12}>
            <Controller
              control={control}
              name="currentStopLoss.aggregating_specific_deductible"
              render={({ field: { onChange, value } }) => (
                <NumberInput
                  onValueChange={({ value }) => {
                    onChange(Number(value));
                  }}
                  value={value}
                  customInput={StyledInput}
                  thousandSeparator={true}
                  prefix={"$ "}
                  isMedium
                  allowEmptyFormatting
                  isControlled
                  label="Aggregating Specific Deductible"
                />
              )}
            />
          </StyledCol>
        </Row>
      )}
      <Row>
        <StyledCol>
          <Controller
            control={control}
            name="currentStopLoss.has_advanced_specific_funding"
            render={({ field: { onChange, value } }) => (
              <StyledRadioGroup>
                <legend>Advanced Specific Funding</legend>
                <div>
                  <InputRadio
                    label="Yes"
                    onChange={() => onChange(true)}
                    checked={value === true}
                  />
                  <InputRadio
                    label="No"
                    onChange={() => onChange(false)}
                    checked={value === false}
                  />
                </div>
              </StyledRadioGroup>
            )}
          />
        </StyledCol>
      </Row>
    </>
  );
};
export default FundingSection;
