/* eslint-disable max-lines */
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { Title } from "../../planDetailForm.style";
import { Container } from "../../planDetailForm.style";
import FormRadioGroup from "../FormRadioGroup";
import { StyledRow } from "./insurancePays.style";

const FIELDS = [
  {
    label: "Primary Care Office Visit",
    attr: "copay_pcp",
    mapping: "medical_plan.copay_office_visit",
    defaultValue: 20,
  },
  {
    label: "Specialist Office Visit",
    attr: "copay_specialist",
    mapping: "medical_plan.copay_specialist",
    defaultValue: 35,
  },
  {
    label: "Urgent Care Facility",
    attr: "copay_urgent_care",
    mapping: "medical_plan.copay_urgent_care",
    defaultValue: 75,
  },
  {
    label: "Emergency Room",
    attr: "copay_er",
    mapping: "medical_plan.copay_emergency_room",
    defaultValue: 200,
  },
  {
    label: "Ambulatory Surgery Center",
    attr: "copay_ambulatory",
    mapping: "medical_plan.copay_ambulatory",
    defaultValue: 100,
  },
  {
    label: "Hospital",
    attr: "copay_hospital",
    mapping: "medical_plan.copay_hospital",
    defaultValue: 400,
  },
];

const InsurancePaysSection = () => {
  const { control } = useFormContext();

  const selectedHsaQualified = useWatch({
    control,
    name: "medical_plan.hsa_qualified",
  });

  return (
    <Container>
      <Row>
        <Title>
          <h1>Co-insurance/Co-pays</h1>
        </Title>
      </Row>
      <StyledRow>
        {FIELDS.map((field) => (
          <Col lg={4} md={4}>
            <FormRadioGroup
              labelGroup={{
                main: field.label,
                top: "Co-insurance",
                bottom: "Co-pay",
              }}
              {...field}
              disabled={!!selectedHsaQualified}
            />
          </Col>
        ))}
      </StyledRow>
    </Container>
  );
};
export default InsurancePaysSection;
