import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";

import BottomCard from "../Bottomcard";
import TopBar from "../Bottomcard/Topsection";
import {
  Container,
  InputCard,
  StyledInput,
  BackButton,
  NextButton,
  MainHeading,
  InputLabel,
  ActionButtonsContainer,
} from "./style";

export default function Employeeposition() {
  const history = useHistory();
  const [job, setjob] = useState();
  const [sd, setsd] = useState();

  return (
    <Container>
      <TopBar />
      <InputCard>
        <Row>
          <Col sm={12} md={6}>
            <MainHeading>EMPLOYEE POSITION</MainHeading>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={6}>
            <InputLabel>What's Your Job Title?</InputLabel>
            <StyledInput placeholder="Job Title" />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <InputLabel>When Did You Start With The Company?</InputLabel>

            <StyledInput
              id="exampleDate"
              name="date"
              placeholder="date placeholder"
              type="date"
            />
          </Col>
        </Row>

        <Row></Row>
        <ActionButtonsContainer>
          <Col sm={12} md={0}>
            <NextButton
              onClick={() => {
                history.push("/dashboard/worker/phq/waiving");
              }}
            >
              NEXT &nbsp;&nbsp;
            </NextButton>
          </Col>
          <Col sm={12} md={0}>
            <BackButton
              onClick={() => {
                history.push("/dashboard/worker/phq/personal/status");
              }}
            >
              BACK &nbsp;&nbsp;
            </BackButton>
          </Col>
        </ActionButtonsContainer>
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
