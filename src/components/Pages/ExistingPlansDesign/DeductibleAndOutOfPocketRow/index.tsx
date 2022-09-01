import React from "react";
import { get } from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { Col, Row } from "reactstrap";
import NumberInput from "src/components/NumberInput";
import { minValueOne } from "src/constants";
import { StyledInput, Title } from "../existingPlansDesignPage.style";

const DeductibleAndOutOfPocketRow = () => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <Row>
      <Col lg={6} md={6}>
        <Title>
          <h2>Deductibles</h2> &nbsp;
          <h2>(In-network)</h2>
        </Title>
        <Row>
          <Col lg={6} md={6}>
            <Controller
              control={control}
              name="deductible_in"
              rules={minValueOne}
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
                  label="Individual"
                  error={get(errors, "deductible_in.message", "")}
                />
              )}
            />
          </Col>
          <Col lg={6} md={6}>
            <Controller
              control={control}
              name="deductible_family_in"
              rules={minValueOne}
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
                  label="Family"
                  error={get(errors, "deductible_family_in.message", "")}
                />
              )}
            />
          </Col>
        </Row>
      </Col>
      <Col lg={6} md={6}>
        <Title>
          <h2>Out of Pocket </h2> &nbsp;
          <h2>(In-network)</h2>
        </Title>
        <Row>
          <Col lg={6} md={6}>
            <Controller
              control={control}
              name="out_of_pocket_max_in"
              rules={minValueOne}
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
                  label="Individual"
                  error={get(errors, "out_of_pocket_max_in.message", "")}
                />
              )}
            />
          </Col>
          <Col lg={6} md={6}>
            <Controller
              control={control}
              name="out_of_pocket_max_family_in"
              rules={minValueOne}
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
                  label="Family"
                  error={get(errors, "out_of_pocket_max_family_in.message", "")}
                />
              )}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default DeductibleAndOutOfPocketRow;
