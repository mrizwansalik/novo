import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { resetPassword } from "src/api/resetPassword";
import BottomCard from "src/pages/Bottomcard";
import TopBar from "src/pages/Bottomcard/Topsection";
import routes from "src/routes";
import {
  Container,
  InputCard,
  StyledInput,
  LButton,
  MainHeading,
  SubHeading,
  SubHeading2,
} from "./style";

const Empty = {
  password: "",
};

export default function Setpassword() {
  const history = useHistory();
  const [password, setpassword] = useState(Empty);

  const handleSubmit = () => {
    console.log(password, "data");
    resetPassword(password);
    history.push(routes.contactinfo.value);
  };

  return (
    <Container>
      <TopBar />

      <InputCard>
        <Row>
          <Col sm={12} md={6}>
            <MainHeading>Set Password</MainHeading>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={4}>
            <SubHeading>Password</SubHeading>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={10} lg={10} xs={12}>
            <StyledInput
              placeholder="New Password"
              type="password"
              minlength="8"
              required="true"
              onChange={(e) => {
                setpassword({
                  ...password,
                  password: e.target.value,
                });
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={12}>
            <SubHeading2>MUST BE ATLEST 8 CHARACTER LONG</SubHeading2>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <LButton
              onClick={() => {
                handleSubmit();
              }}
            >
              NEXT &nbsp;&nbsp;
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
