import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { addEmployeeDetail } from "src/api/worker";
import routes from "src/routes";
import BottomCard from "../Bottomcard";
import TopBar from "../Bottomcard/Topsection";

import {
  InputCard,
  BackButton,
  NextButton,
  MainHeading,
  ActionButtonsContainer,
  Container,
} from "./style";

export default function Employeeposition() {
  const history = useHistory();

  const handleSubmit = () => {
    const workerId = localStorage.getItem("worker");
    const data = { census_data: { phq: { waiving: true } } };
    const responseData = addEmployeeDetail(workerId, data);
    history.push(routes.dependentsintro.value);
  };
  return (
    <Container>
      <TopBar />
      <InputCard>
        <Row>
          <Col sm={12} md={8} lg={12} xs={12}>
            <MainHeading>
              <h3>
                {" "}
                <b>
                  DO YOU INTEND TO ENROLL IN THE MEDICAL BENIFITS YUOR EMPLOYER
                  IS PLAINING TO OFFER?
                </b>
              </h3>
            </MainHeading>
          </Col>
        </Row>

        <ActionButtonsContainer>
          <Col sm={12} md={0}>
            <NextButton
              onClick={() => {
                handleSubmit();
              }}
            >
              YES &nbsp;&nbsp;
            </NextButton>
          </Col>
          <Col sm={12} md={0}>
            <BackButton
              onClick={() => {
                history.push("//dashboard/worker/phq/dependentsintro");
              }}
            >
              NO &nbsp;&nbsp;
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
