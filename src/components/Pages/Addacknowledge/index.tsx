import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";

import BottomCard from "src/pages/Bottomcard";
import TopBar from "src/pages/Bottomcard/Topsection";

import {
  InputCard,
  NextButton,
  MainHeading,
  ActionButtonsContainer,
  Container,
} from "./style";

export default function Acknowledgement() {
  const history = useHistory();

  return (
    <Container>
      <TopBar />
      <InputCard>
        <Row>
          <Col sm={12} md={10} lg={12} xs={12}>
            <MainHeading>
              <h4>
                {" "}
                <b>
                  I ACKNOWLEDGE AND CONFIRM THAT I WILL ANSWER EACH QUESTION
                  COMPLETELY AND TRUTHFULLY. I UNDERSTAND THAT ANY
                  MISINFORMATION, LACK OF DISCLOSURE OR MISREPRESENTATION OF
                  MEDICAL INFORMATION ON MY PART MAY RESULT IN LATER RERATING OF
                  PREMIUM, DENIAL OF CLAIMS, AND/OR TERMINATION OF COVERAGE. I
                  AM OBLIGATED TO DISCLOSE ACCURATE AND COMPLETE ANSWERS TO ALL
                  QUESTIONS AND MY SIGNATURE AFFIRMS THIS UNDERSTANDING.
                </b>{" "}
              </h4>
            </MainHeading>
          </Col>
        </Row>

        <ActionButtonsContainer>
          <Col sm={12} md={0}>
            <NextButton
              onClick={() => {
                history.push("/dashboard/worker/phq/socialsecurity");
              }}
            >
              I AGREE &nbsp;&nbsp;
            </NextButton>
          </Col>
          {/* <Col sm={12} md={0}>
            <BackButton
              onClick={() => {
                history.push("//dashboard/worker/phq/dependentsintro");
              }}
            >
              NO &nbsp;&nbsp;
            </BackButton>
          </Col> */}
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
