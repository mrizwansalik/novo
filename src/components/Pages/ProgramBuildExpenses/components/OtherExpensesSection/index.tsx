import React from "react";
import { observer } from "mobx-react";
import { Col, Row } from "reactstrap";
import { Container } from "./otherExpensesSection.style";

const OtherExpensesSection = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h4>Other Expenses</h4>
        </Col>
      </Row>
      <Row>
        <p>
          For expenses such as ben admin fees, implementation fees or any other
          services not accounted for.
        </p>
      </Row>
      <Row>
        <Col>Name</Col>
        <Col>Free Type</Col>
        <Col>Amount</Col>
      </Row>
    </Container>
  );
};

export default observer(OtherExpensesSection);
