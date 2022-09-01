import React from "react";
import { get } from "lodash";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Col, Row } from "reactstrap";
import NumberInput from "src/components/NumberInput";
import { copayTypeOptions, minValueOne } from "src/constants";
import {
  hasCopayAmount,
  hasCopayMax,
  isCopayTypeDollars,
  isCopayTypePercentage,
} from "src/utils/benefit";
import {
  StyledInput,
  StyledSelect,
  Title,
} from "../existingPlansDesignPage.style";

const CoinsuranceAndOfficeVisitRow = () => {
  const { control, formState, setValue } = useFormContext();
  const { errors } = formState;

  const watchCopayOfficeVisitType = useWatch({
    control,
    name: "copay_office_visit_type",
  });
  const watchCopayOfficeVisitTypeValue = get(
    watchCopayOfficeVisitType,
    "value",
    ""
  ) as string;

  return (
    <Row>
      <Col lg={6} md={6}>
        <Title>
          <h2>Co-insurance </h2> &nbsp;
          <h2>(In-network)</h2>
        </Title>
        <Row>
          <Col lg={6} md={6}>
            <Controller
              control={control}
              name="coinsurance_in"
              rules={minValueOne}
              render={({ field: { onChange, value } }) => (
                <NumberInput
                  onValueChange={({ value }) => {
                    onChange(value);
                  }}
                  value={value}
                  customInput={StyledInput}
                  thousandSeparator={true}
                  suffix={" %"}
                  isMedium
                  isControlled
                  label="Plan Pays"
                  error={get(errors, "coinsurance_in.message", "")}
                />
              )}
            />
          </Col>
        </Row>
      </Col>
      <Col lg={6} md={6}>
        <Title>
          <h2>Office Visit</h2>
        </Title>
        <Row>
          <Col lg={12} md={12}>
            <Row>
              <Col lg={12} md={12}>
                <Controller
                  control={control}
                  name="copay_office_visit_type"
                  render={({ field: { onChange, value } }) => (
                    <StyledSelect
                      options={copayTypeOptions}
                      onChange={onChange}
                      value={value}
                      label="Type"
                      placeholder=""
                      error={get(errors, "copay_office_visit_type.message", "")}
                    />
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6}>
                {hasCopayAmount(watchCopayOfficeVisitTypeValue) && (
                  <Controller
                    control={control}
                    name="copay_office_visit"
                    render={({ field: { onChange, value } }) => (
                      <NumberInput
                        onValueChange={({ value }) => {
                          onChange(value);
                        }}
                        value={value}
                        customInput={StyledInput}
                        thousandSeparator={true}
                        prefix={
                          isCopayTypeDollars(watchCopayOfficeVisitTypeValue)
                            ? "$ "
                            : ""
                        }
                        suffix={
                          isCopayTypePercentage(watchCopayOfficeVisitTypeValue)
                            ? " %"
                            : ""
                        }
                        error={get(errors, "copay_office_visit.message", "")}
                        isMedium
                        allowEmptyFormatting
                        isControlled
                        label="Amount"
                      />
                    )}
                  />
                )}
              </Col>
              <Col lg={6} md={6}>
                {hasCopayMax(watchCopayOfficeVisitTypeValue) && (
                  <Controller
                    control={control}
                    name="copay_office_visit_max"
                    rules={minValueOne}
                    render={({ field: { onChange, value } }) => (
                      <NumberInput
                        onValueChange={({ value }) => {
                          onChange(value);
                        }}
                        value={value}
                        customInput={StyledInput}
                        thousandSeparator={true}
                        prefix={
                          isCopayTypeDollars(watchCopayOfficeVisitTypeValue)
                            ? "$ "
                            : ""
                        }
                        suffix={
                          isCopayTypePercentage(watchCopayOfficeVisitTypeValue)
                            ? " %"
                            : ""
                        }
                        error={get(
                          errors,
                          "copay_office_visit_max.message",
                          ""
                        )}
                        isMedium
                        allowEmptyFormatting
                        isControlled
                        label="Max"
                      />
                    )}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default CoinsuranceAndOfficeVisitRow;
