import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Row } from "reactstrap";
import {
  aggregateAttachmentPoints,
  contractTypes,
  specificDeductibles,
} from "src/constants/quote";
import { StyledCol, StyledSelect } from "../../programBuildStopLoss.style";

const HeadSection = () => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <Row>
      <StyledCol lg={6} md={6}>
        <Controller
          control={control}
          name="currentStopLoss.specific_deductible"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <StyledSelect
              value={value}
              label="Specific Deductible *"
              options={specificDeductibles}
              onChange={onChange}
            />
          )}
        />
      </StyledCol>
      <StyledCol lg={6} md={6}>
        <Controller
          control={control}
          name="currentStopLoss.aggregate_attachment_percent"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <StyledSelect
              value={value}
              label="Aggregate Attach Point *"
              options={aggregateAttachmentPoints}
              onChange={onChange}
            />
          )}
        />
      </StyledCol>
      <StyledCol lg={6} md={6}>
        <Controller
          control={control}
          name="currentStopLoss.contract_length"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <StyledSelect
              value={value}
              label="Contract Type"
              options={contractTypes}
              onChange={onChange}
            />
          )}
        />
      </StyledCol>
    </Row>
  );
};
export default HeadSection;
