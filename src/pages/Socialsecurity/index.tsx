import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";

import { updateWorker } from "src/api/worker";
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
  FormNumberInput,
  ActionButtonsContainer,
} from "./style";

export default function Socialsecurityno() {
  const history = useHistory();

  const EmptyDependent = {
    government_number: "",
  };
  const [data, setData] = useState(EmptyDependent);
  const handleSubmit = () => {
    const workerId = localStorage.getItem("worker");
    console.log(data);
    const resData = updateWorker(workerId, data);
    history.push("/dashboard/worker/phq/highfive");
  };

  return (
    <Container>
      <TopBar />
      <InputCard>
        <Row>
          <Col sm={12} md={6}>
            <MainHeading>EMPLOYEE INFO</MainHeading>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={6}>
            <InputLabel>What's Your Social security Number?</InputLabel>

            <FormNumberInput
              customInput={StyledInput}
              format="###-##-####"
              mask="_"
              allowEmptyFormatting
              onChange={(e) => {
                setData({
                  ...data,
                  government_number: e.target.value,
                });
              }}
            />
          </Col>
        </Row>
        <Row></Row>

        <Row></Row>
        <ActionButtonsContainer>
          <Col sm={12} md={0}>
            <NextButton
              onClick={() => {
                handleSubmit();
              }}
            >
              NEXT &nbsp;&nbsp;
            </NextButton>
          </Col>
          <Col sm={12} md={0}>
            <BackButton
              onClick={() => {
                history.push("/dashboard/worker/phq/acknowledge");
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
