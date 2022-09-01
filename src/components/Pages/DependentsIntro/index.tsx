import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import BottomCard from "src/pages/Bottomcard";
import TopBar from "src/pages/Bottomcard/Topsection";
import routes from "src/routes";
import useAddBrokerageForm from "../AddBrokeragePage/hooks";

import {
  Container,
  SubHeading,
  InputCard,
  SubHeading2,
  MainHeading,
  ActionButtonsContainer,
  LButton,
  SubButton,
} from "./style";

export default function Dependentsintro() {
  const { formControl, regionOptions, cityOptions } = useAddBrokerageForm();
  const history = useHistory();
  const [address, setaddress] = useState();
  const [city, setcity] = useState();
  const [state, setstate] = useState();
  const [zipcode, setzipcode] = useState();
  const [phoneno, setphoneno] = useState();
  const {
    control,
    formState: { isValid },
    register,
    handleSubmit,
  } = formControl;

  return (
    <Container>
      <TopBar />
      <InputCard>
        <Row>
          <Col sm={12} md={6}>
            <MainHeading>
              <h6>NEXT</h6>
            </MainHeading>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={6} xs={12}>
            <SubHeading2>
              <h2>
                <b>Dependents (Spouse/Children)</b>
              </h2>
            </SubHeading2>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={10} lg={12}>
            <SubHeading>
              <p>
                Add any dependents that will be included on your benefits.
                Dependents include spouse, Children or domestic partner. If you
                didn't provide your dependent's information they will not be
                elligible to enroll in the plan-no exceptions can be made.
              </p>
            </SubHeading>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={10} lg={12}>
            <SubHeading>
              <p>
                Each dependent you add will require name, DOB, gender,
                relationship to you weight, height, tobacco use.
              </p>
            </SubHeading>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={10} lg={12}>
            <hr></hr>
          </Col>
        </Row>
        <ActionButtonsContainer>
          <Col sm={12} md={4} lg={2}>
            <LButton
              onClick={() => {
                history.push(routes.dependents.value);
              }}
            >
              Ok, Let's Go &nbsp;&nbsp;
            </LButton>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <SubButton
              onClick={() => {
                history.push("/dashboard/worker/phq/acknowledge");
              }}
            >
              {" "}
              I have no dependents
            </SubButton>
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
