import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";

import BottomCard from "../Bottomcard";
import TopBar from "../Bottomcard/Topsection";
import {
  Container,
  InputCard,
  MainHeading,
  Mainlogo,
  SubHeading,
} from "./style";

export default function Highfive() {
  const history = useHistory();
  const [job, setjob] = useState();
  const [sd, setsd] = useState();

  return (
    <Container>
      <TopBar />
      <InputCard>
        <Row>
          <Col md={2} lg={2} xs={6} sm={6}>
            <Mainlogo>
              {" "}
              <h1>✋</h1>
            </Mainlogo>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <MainHeading>High Five--you're done!</MainHeading>
          </Col>
        </Row>

        <Row>
          <SubHeading>And it didn't hurt (much)</SubHeading>
        </Row>

        <Row></Row>
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
