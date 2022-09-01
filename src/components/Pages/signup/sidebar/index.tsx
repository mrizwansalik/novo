import { Col, Row } from "reactstrap";
import logo from "src/assets/images/novo.png";
import { Rightsidecontainer, LogoSection, SideFooter } from "./style";

export default function SideBar() {
  return (
    <>
      <Rightsidecontainer>
        <Row>
          <Col sm={12} md={6}>
            <LogoSection src={logo} alt="image" />
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={10}>
            <h6 style={{ marginTop: "5rem" }}>Why am i being asked this?</h6>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={12}>
            <p style={{ fontSize: "14px", color: "white" }}>
              This information is used to come up with the best price for your
              company's group health insurance plan.
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <p style={{ fontSize: "14px", color: "white", marginTop: "10px" }}>
              At the end of each section you’ll be able to review and change
              your answers.
            </p>
          </Col>
        </Row>
        <Row style={{ marginTop: "8rem" }}>
          <Col sm={12} md={12}>
            <p style={{ fontSize: "12px" }}>
              <b>These questions are 100% confidential</b>and no one within your
              employer will ever see the completed questionnaire of another
              employee.
            </p>
          </Col>
        </Row>
        <SideFooter>
          <Row>
            <Col sm={12} md={12}>
              <p style={{ fontSize: "12px" }}>
                By completing these questions you are not committing to
                enrolling into any benefit plans—you will be given the option to
                waive coverage during open enrollment.
              </p>
            </Col>
          </Row>
        </SideFooter>

        <SideFooter>
          <Row>
            <Col sm={12} md={12}>
              <p style={{ fontSize: "12px", marginBottom: "110px" }}>
                If you do not complete these questions prior to underwriting you
                will <b>not be eligible to enroll in the plan this year.</b>
              </p>
            </Col>
          </Row>
        </SideFooter>
      </Rightsidecontainer>
    </>
  );
}
