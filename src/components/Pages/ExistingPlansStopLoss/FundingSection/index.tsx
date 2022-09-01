import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Col, Row } from "reactstrap";
import InputRadio from "src/components/InputRadio";
import NumberInput from "src/components/NumberInput";
import {
  StyledInput,
  StyledRadioGroup,
} from "../existingPlansSelfFundedPage.style";

const FundingSection = () => {
  const methods = useFormContext();
  const { control, setValue } = methods;

  const watchHasAggregatingSpecific = useWatch({
    control,
    name: "has_aggregating_specific",
  });
  const hasAggregatingSpecific = watchHasAggregatingSpecific === "true";

  useEffect(() => {
    if (!hasAggregatingSpecific) {
      setValue("aggregating_specific_deductible", 0);
    }
  }, [hasAggregatingSpecific]);

  return (
    <>
      <Row>
        <Col>
          <h2>Funding</h2>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6}>
          <Controller
            control={control}
            name="has_advanced_specific_funding"
            render={({ field: { onChange, value } }) => (
              <StyledRadioGroup>
                <legend>Specific Advance</legend>
                <div>
                  <InputRadio
                    label="Yes"
                    value={"true"}
                    onChange={onChange}
                    checked={value === "true"}
                  />
                  <InputRadio
                    label="No"
                    value={"false"}
                    onChange={onChange}
                    checked={value === "false"}
                  />
                </div>
              </StyledRadioGroup>
            )}
          />
        </Col>
        <Col lg={6} md={6}>
          {" "}
          <Controller
            control={control}
            name="has_agg_accommodation"
            render={({ field: { onChange, value } }) => (
              <StyledRadioGroup>
                <legend>Aggregate Accommodation</legend>
                <div>
                  <InputRadio
                    label="Yes"
                    value={"true"}
                    onChange={onChange}
                    checked={value === "true"}
                  />
                  <InputRadio
                    label="No"
                    value={"false"}
                    onChange={onChange}
                    checked={value === "false"}
                  />
                </div>
              </StyledRadioGroup>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6}>
          <Controller
            control={control}
            name="has_aggregating_specific"
            render={({ field: { onChange, value } }) => (
              <StyledRadioGroup>
                <legend>Aggregating Specific</legend>
                <div>
                  <InputRadio
                    label="Yes"
                    value={"true"}
                    onChange={onChange}
                    checked={value === "true"}
                  />
                  <InputRadio
                    label="No"
                    value={"false"}
                    onChange={onChange}
                    checked={value === "false"}
                  />
                </div>
              </StyledRadioGroup>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6}>
          <Controller
            control={control}
            name="aggregating_specific_deductible"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                onValueChange={({ value }) => {
                  onChange(value);
                }}
                value={value}
                customInput={StyledInput}
                thousandSeparator={true}
                prefix={"$ "}
                isMedium
                allowEmptyFormatting
                isControlled
                label="Aggregating Specific Deductible"
                disabled={!hasAggregatingSpecific}
              />
            )}
          />
        </Col>
      </Row>
    </>
  );
};
export default FundingSection;
