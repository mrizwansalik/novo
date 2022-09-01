import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Col, Row } from "reactstrap";
import InputRadio from "src/components/InputRadio";
import { StyledRadioGroup } from "../existingPlansSelfFundedPage.style";

const TerminalLiabilitySection = () => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <>
      <Row>
        <Col>
          <h2>Terminal Liability Options</h2>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6}>
          <Controller
            control={control}
            name="aggregate_tlo"
            render={({ field: { onChange, value } }) => (
              <StyledRadioGroup>
                <legend>Aggregate TLO</legend>
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
          <Controller
            control={control}
            name="specific_tlo"
            render={({ field: { onChange, value } }) => (
              <StyledRadioGroup>
                <legend>Specific TLO</legend>
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
    </>
  );
};
export default TerminalLiabilitySection;
