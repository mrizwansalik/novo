import { Col, Row } from "reactstrap";

import { Heading, SubHeading, Card, Count } from "./style";

export default function Sidecard({ rate }) {
  return (
    <>
      <Card>
        <Row className="no-gutters">
          <Col md={12} sm={12}>
            <Heading>Contract Detail</Heading>
          </Col>
        </Row>

        <div>
          <Row className="no-gutters">
            <Col xs="auto" md={12} sm={12}>
              <SubHeading>Specific DEtuctible</SubHeading>
              <Count>$ {rate.specific_deductible}</Count>
            </Col>
          </Row>
        </div>

        <div>
          <Row className="no-gutters">
            <Col xs="auto" md={12} sm={12}>
              <SubHeading>Aggregate Attach Point</SubHeading>
              <Count>
                {Math.round(rate?.aggregate_attachment_percent * 100).toFixed(
                  0
                )}{" "}
                %
              </Count>
            </Col>
          </Row>
        </div>
        <div>
          <Row className="no-gutters">
            <Col xs="auto" md={12} sm={12}>
              <SubHeading>Contract Type</SubHeading>
              <Count>{`spec: ${rate.contract_length_spec} agg: ${rate.contract_length_agg}`}</Count>
            </Col>
          </Row>
        </div>
        <div>
          <Row className="no-gutters">
            <Col xs="auto" md={12} sm={12}>
              <SubHeading>TLO</SubHeading>
              <Count>
                {`spec: ${rate.specific_tlo ? "Included" : "N/A"}`}{" "}
              </Count>
              <Count> {`agg: ${rate.specific_tlo ? "Included" : "N/A"}`}</Count>
            </Col>
          </Row>
        </div>
        <div>
          <Row className="no-gutters">
            <Col xs="auto" md={12} sm={12}>
              <SubHeading>Funding</SubHeading>
              <Count>{rate.has_advanced_specific_funding ? "FA" : "N/A"}</Count>
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
}
