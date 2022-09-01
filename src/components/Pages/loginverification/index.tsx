import { Col, Row } from "reactstrap";
import thumb from "src/assets/images/thumbs-up.png";

import { Container, LogoSection } from "./style";

export default function Loginverification() {
  return (
    <Container>
      <LogoSection
        style={{ marginTop: "12rem", marginLeft: "6rem" }}
        src={thumb}
        alt="image"
      />
      <Row>
        <Col sm={12} md={3}>
          <h2 style={{ marginLeft: "5rem", padding: "10px" }}>Thanks!</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12}>
          <h3 style={{ marginLeft: "5rem", padding: "10px" }}>
            A verification linkhas been sent to your email addess.Click the link
            in the email to complete this health questionnaire.
          </h3>
        </Col>
      </Row>
    </Container>
  );
}
