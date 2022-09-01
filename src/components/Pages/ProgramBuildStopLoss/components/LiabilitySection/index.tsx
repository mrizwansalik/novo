import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Row } from "reactstrap";
import InputRadio from "src/components/InputRadio";
import {
  SectionTitle,
  StyledCol,
  StyledRadioGroup,
} from "../../programBuildStopLoss.style";

const LiabilitySection = () => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <>
      <Row>
        <StyledCol>
          <SectionTitle>Terminal Liability Options</SectionTitle>
        </StyledCol>
      </Row>
      <Row>
        <StyledCol lg={6} md={6}>
          <Controller
            control={control}
            name="currentStopLoss.specific_tlo"
            render={({ field: { onChange, value } }) => (
              <StyledRadioGroup>
                <legend>Specific TLO</legend>
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
            name="currentStopLoss.aggregate_tlo"
            render={({ field: { onChange, value } }) => (
              <StyledRadioGroup>
                <legend>Aggregate TLO</legend>
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
export default LiabilitySection;
