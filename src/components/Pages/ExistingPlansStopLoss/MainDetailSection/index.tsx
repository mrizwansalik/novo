import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Col, Row } from "reactstrap";
import {
  aggregateAttachmentPoints,
  contractTypes,
  specificDeductibles,
} from "src/constants/quote";
import {
  StyledCreatableSelect,
  StyledSelect,
} from "../existingPlansSelfFundedPage.style";
import { IStopLossCarrierOption, ITpaOption } from "../interfaces";

interface IMainDetailSectionProps {
  tpaOptions: ITpaOption[];
  stopLossCarrierOptions: IStopLossCarrierOption[];
}

const MainDetailSection = (props: IMainDetailSectionProps) => {
  const { tpaOptions, stopLossCarrierOptions } = props;

  const methods = useFormContext();
  const { control } = methods;

  return (
    <>
      <Row>
        <Col lg={6} md={6}>
          <Controller
            control={control}
            name="tpa"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledCreatableSelect
                label="TPA"
                options={tpaOptions}
                placeholder="e.g. BPA (type to filter)"
                onChange={onChange}
                value={value}
                isSearchable
              />
            )}
          />
        </Col>
        <Col lg={6} md={6}>
          <Controller
            control={control}
            name="stop_loss_carrier"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledCreatableSelect
                label="Stop Loss Carrier"
                options={stopLossCarrierOptions}
                placeholder="e.g. Aetna (type to filter)"
                onChange={onChange}
                value={value}
                isSearchable
              />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6}>
          <Controller
            control={control}
            name="specific_deductible"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledSelect
                value={value}
                label="Specific Deductible"
                options={specificDeductibles}
                onChange={onChange}
              />
            )}
          />
        </Col>
        <Col lg={6} md={6}>
          <Controller
            control={control}
            name="contract_length"
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
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6}>
          <Controller
            control={control}
            name="aggregate_attachment_percent"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledSelect
                value={value}
                label="Aggregate Attach Point"
                options={aggregateAttachmentPoints}
                onChange={onChange}
              />
            )}
          />
        </Col>
      </Row>
    </>
  );
};
export default MainDetailSection;
