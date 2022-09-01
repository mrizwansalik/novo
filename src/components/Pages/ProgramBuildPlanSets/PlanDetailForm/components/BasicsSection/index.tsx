import React from "react";
import { get } from "lodash";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Col, Row } from "reactstrap";
import NumberInput from "src/components/NumberInput";
import { minValueZero } from "src/constants";
import {
  StyledCheckbox,
  StyledInput,
  Title,
  Container,
} from "../../planDetailForm.style";

const BasicsSection = () => {
  const { control, formState, setValue } = useFormContext();
  const { errors } = formState;
  const deductibleInValue = useWatch({
    control,
    name: "medical_plan.deductible_in",
  });

  const outOfPocketMaxInValue = useWatch({
    control,
    name: "medical_plan.out_of_pocket_max_in",
  });

  return (
    <Container>
      <Row>
        <Title>
          <h1>Basics</h1>
        </Title>
      </Row>
      <Row>
        <Col lg={5} md={5}>
          <Title>
            <h2>Deductibles *</h2>
          </Title>
          <Row>
            <Col lg={4} md={4}>
              <Controller
                control={control}
                name="medical_plan.deductible_in"
                render={({ field: { onChange, value } }) => (
                  <NumberInput
                    onValueChange={({ value }) => {
                      onChange(parseInt(value));
                    }}
                    value={value}
                    onBlur={(e) => {
                      setValue(
                        "medical_plan.deductible_family_in",
                        deductibleInValue * 2
                      );
                    }}
                    customInput={StyledInput}
                    thousandSeparator={true}
                    prefix={"$ "}
                    allowEmptyFormatting
                    isControlled
                    label="Individual"
                    error={get(
                      errors,
                      "medical_plan.deductible_in.message",
                      ""
                    )}
                  />
                )}
              />
            </Col>
            <Col lg={4} md={4}>
              <Controller
                control={control}
                name="medical_plan.deductible_family_in"
                rules={minValueZero}
                render={({ field: { onChange, value } }) => (
                  <NumberInput
                    onValueChange={({ value }) => {
                      onChange(parseInt(value));
                    }}
                    value={value}
                    customInput={StyledInput}
                    thousandSeparator={true}
                    prefix={"$ "}
                    allowEmptyFormatting
                    isControlled
                    label="Family"
                    error={get(
                      errors,
                      "medical_plan.deductible_family_in.message",
                      ""
                    )}
                  />
                )}
              />
            </Col>
          </Row>
        </Col>
        <Col lg={5} md={5}>
          <Title>
            <h2>Out of Pocket *</h2>
          </Title>
          <Row>
            <Col lg={4} md={4}>
              <Controller
                control={control}
                name="medical_plan.out_of_pocket_max_in"
                render={({ field: { onChange, value } }) => (
                  <NumberInput
                    onValueChange={({ value }) => {
                      onChange(parseInt(value));
                    }}
                    onBlur={(e) => {
                      setValue(
                        "medical_plan.out_of_pocket_max_family_in",
                        outOfPocketMaxInValue * 2
                      );
                    }}
                    value={value}
                    customInput={StyledInput}
                    thousandSeparator={true}
                    prefix={"$ "}
                    allowEmptyFormatting
                    isControlled
                    label="Individual"
                    error={get(
                      errors,
                      "medical_plan.out_of_pocket_max_in.message",
                      ""
                    )}
                  />
                )}
              />
            </Col>
            <Col lg={4} md={4}>
              <Controller
                control={control}
                name="medical_plan.out_of_pocket_max_family_in"
                render={({ field: { onChange, value } }) => (
                  <NumberInput
                    onValueChange={({ value }) => {
                      onChange(parseInt(value));
                    }}
                    value={value}
                    customInput={StyledInput}
                    thousandSeparator={true}
                    prefix={"$ "}
                    allowEmptyFormatting
                    isControlled
                    label="Family"
                    error={get(
                      errors,
                      "medical_plan.out_of_pocket_max_family_in.message",
                      ""
                    )}
                  />
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller
            control={control}
            name="medical_plan.hsa_qualified"
            render={({ field: { value, onChange } }) => (
              <StyledCheckbox
                label="HSA Qualified"
                onChange={(e) => {
                  onChange(e.target.checked);
                  if (e.target.checked) {
                    deductibleInValue
                      ? setValue(
                          "medical_plan.deductible_family_in",
                          deductibleInValue * 2
                        )
                      : setValue("medical_plan.deductible_family_in", 0);
                  }
                }}
                checked={value}
              />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6}>
          <Title>
            <h2>In &amp; Out of Network (% plan pays)</h2>
          </Title>
          <Row>
            <Col lg={2} md={2}>
              <Controller
                control={control}
                name="medical_plan.coinsurance_in"
                render={({ field: { onChange, value } }) => (
                  <NumberInput
                    onValueChange={({ value }) => {
                      onChange(parseInt(value) / 100);
                    }}
                    value={value * 100}
                    customInput={StyledInput}
                    thousandSeparator={true}
                    suffix={"  %"}
                    isSmall
                    allowEmptyFormatting
                    isControlled
                    error={get(
                      errors,
                      "medical_plan.coinsurance_in.message",
                      ""
                    )}
                  />
                )}
              />
            </Col>
            <Col lg={2} md={2}>
              <Controller
                control={control}
                name="medical_plan.coinsurance_out"
                render={({ field: { onChange, value } }) => (
                  <NumberInput
                    onValueChange={({ value }) => {
                      onChange(parseInt(value) / 100);
                    }}
                    value={value * 100}
                    customInput={StyledInput}
                    thousandSeparator={true}
                    suffix={"  %"}
                    isSmall
                    allowEmptyFormatting
                    isControlled
                    error={get(
                      errors,
                      "medical_plan.coinsurance_out.message",
                      ""
                    )}
                  />
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default BasicsSection;
