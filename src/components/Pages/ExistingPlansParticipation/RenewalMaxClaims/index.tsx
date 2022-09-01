import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Col, Row } from "reactstrap";
import NumberInput from "src/components/NumberInput";
import { IFamilyStatusPricings } from "src/interfaces/benefit";
import {
  PaddingRow,
  StyledInput,
  Title,
} from "../existingPlansParticipationPage.style";
import { getTierLabel } from "../utils";

const RenewalMaxClaims = () => {
  const { control } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: "family_status_pricings",
  });

  return (
    <>
      <Row>
        <Col lg={12} md={12}>
          <Title>
            <h3>Renewal Rates at Max Claims</h3>
          </Title>
        </Col>
      </Row>
      <PaddingRow>
        {fields.map((tier: IFamilyStatusPricings, index: number) => {
          return (
            <Col lg={3} md={3} sm={6}>
              <Controller
                control={control}
                name={`family_status_pricings.${index}.renewal_price`}
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
                    label={getTierLabel(tier)}
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
export default RenewalMaxClaims;
