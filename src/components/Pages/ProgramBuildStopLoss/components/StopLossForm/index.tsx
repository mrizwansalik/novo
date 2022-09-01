import React from "react";
import { Col, Row } from "reactstrap";
import FundingSection from "../FundingSection";
import HeadSection from "../HeadSection";
import LiabilitySection from "../LiabilitySection";
import NameSection from "../NameSection";

const StopLossForm = () => {
  return (
    <Row>
      <Col lg={8} md={8}>
        <HeadSection />
        <LiabilitySection />
        <FundingSection />
        <NameSection />
      </Col>
    </Row>
  );
};
export default StopLossForm;
