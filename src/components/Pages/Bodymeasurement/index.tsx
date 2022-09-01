import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import BottomCard from "src/pages/Bottomcard";
import TopBar from "src/pages/Bottomcard/Topsection";

import {
  Container,
  LogoSection,
  InputCard,
  LButton,
  MainHeading,
  MiniHeading,
  SubHeading,
  Border,
} from "./style";

export default function BodyMeasurement() {
  const history = useHistory();

  const [password, setpassword] = useState();

  return (
    <Container>
      <TopBar />

      <InputCard>
        <Row></Row>
        <Row>
          <Col sm={12} md={8}>
            <MiniHeading>NEXT</MiniHeading>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <MainHeading>Body Measurements</MainHeading>
          </Col>
        </Row>

        <SubHeading>
          <Row>
            <Col sm={12} md={10} lg={10} xs={12}>
              <p>
                {" "}
                The next group of questions will ask you to provide your contact
                information.it will be used to auto-populate various forms and
                documents as necessary.
              </p>
            </Col>
          </Row>
        </SubHeading>

        <Row>
          <Col sm={10} md={11} lg={11} xs={10}>
            <Border></Border>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={3}>
            <LButton
              onClick={() => {
                history.push("/dashboard/worker/phq/personal/contact-details");
              }}
            >
              Ok, Let's Go &nbsp;&nbsp;
              <LogoSection
                src={`/assets/icons/right-arrow-white.png`}
                alt="image"
              />
            </LButton>
          </Col>
        </Row>
      </InputCard>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <BottomCard />
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
}
