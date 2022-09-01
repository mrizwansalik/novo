import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Row, Col } from "reactstrap";
import {
  SwitchArea,
  SwitchButton,
} from "../existingPlansParticipationPage.style";

const RenewalSwitch = () => {
  const { control } = useFormContext();

  return (
    <Row>
      <Col lg={12} md={12}>
        <SwitchArea>
          <Controller
            name="hasRenewalRates"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <SwitchButton
                  onChange={onChange}
                  checked={value}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor="#def8ff"
                  offColor="#f7f7f7"
                  onHandleColor="#0097f5"
                  offHandleColor="#0097f5"
                  height={26}
                  width={50}
                />
              );
            }}
          />

          <h3>Renewal Rates</h3>
        </SwitchArea>
      </Col>
    </Row>
  );
};

export default RenewalSwitch;
