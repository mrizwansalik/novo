import { Col, Row } from "reactstrap";
import { Bottom, Paragraph, LastParagraph, BoldText } from "./style";

export default function BottomCard() {
  return (
    <>
      <Bottom>
        <Row>
          <Col sm={6} md={4} xs={12}>
            <Paragraph>
              <BoldText>Why Do I Have To This?</BoldText>
              <br></br>
              This information is used to determine the best price for your
              company's group health insurance plan.
            </Paragraph>
          </Col>
          <Col sm={6} md={4} xs={12}>
            <Paragraph>
              <b>These questions are 100% confidential</b> and no one within{" "}
              <b>{"company name"}</b> will ever see the completed questionnaire
              of another employee.
            </Paragraph>
          </Col>
          <Col sm={6} md={4} xs={12}>
            <Paragraph>
              By completing these questions you are not committing to enrolling
              into any benefit plans—you will be given the option to waive
              coverage during open enrollment
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col sm={6} md={10} xs={12}>
            <LastParagraph>
              If you do not complete these questions prior to underwriting you
              will <b>not be eligible to enroll in the plan this year.</b>
            </LastParagraph>
          </Col>
        </Row>
      </Bottom>
    </>
  );
}
