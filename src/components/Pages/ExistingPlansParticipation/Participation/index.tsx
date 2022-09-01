import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Col, Row } from "reactstrap";
import NumberInput from "src/components/NumberInput";
import { participationMappings } from "../constants";
import {
  PaddingRow,
  StyledInput,
  Title,
} from "../existingPlansParticipationPage.style";

const Participation = () => {
  const { control } = useFormContext();

  return (
    <>
      <Row>
        <Col lg={12} md={12}>
          <Title>
            <h3>Participation</h3>
          </Title>
        </Col>
      </Row>
      <PaddingRow>
        {participationMappings.map((mapping) => {
          return (
            <Col lg={3} md={3} sm={6}>
              <Controller
                control={control}
                name={mapping.key}
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
                    label={mapping.label}
                  />
                )}
              />
            </Col>
          );
        })}
      </PaddingRow>
    </>
  );
};
export default Participation;
