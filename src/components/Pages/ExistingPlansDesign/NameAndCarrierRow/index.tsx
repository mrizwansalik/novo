import React from "react";
import { get } from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { IOption } from "src/types";
import {
  StyledCheckbox,
  StyledCreatableSelect,
  StyledInput,
} from "../existingPlansDesignPage.style";

interface INameAndCarrierRowProps {
  carrierOptions: IOption[];
}
const NameAndCarrierRow = ({ carrierOptions }: INameAndCarrierRowProps) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <Row>
      <Col lg={6} md={6}>
        <Controller
          control={control}
          name="name"
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <StyledInput
              isControlled
              label="Plan name"
              placeholder="e.g. Aetna POS 1000"
              error={get(errors, "name.message", "")}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="hsa_qualified"
          render={({ field: { value, onChange } }) => (
            <StyledCheckbox
              label="HSA Qualified"
              onChange={onChange}
              checked={value}
            />
          )}
        />
      </Col>
      <Col lg={6} md={6}>
        <Controller
          control={control}
          name="carrier"
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <StyledCreatableSelect
              label="Carrier"
              options={carrierOptions}
              placeholder="e.g. Aetna (type to filter)"
              onChange={onChange}
              error={get(errors, "carrier.message", "")}
              isSearchable
              value={value}
            />
          )}
        />
      </Col>
    </Row>
  );
};
export default NameAndCarrierRow;
