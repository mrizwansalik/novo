import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { addPhqWorker } from "src/api/fetchOrgToken";
import { IParamTypes } from "src/types";
import SideBar from "../signup/sidebar";

import {
  Container,
  LButton,
  Styledlabel,
  StyledInput,
  LogoSection,
} from "./style";

const Empty = {
  first_name: "",
  last_name: "",
  email: "",
};
export default function SignupTest() {
  const [data, setData] = useState(Empty);
  const history = useHistory();
  const { orgId } = useParams<IParamTypes>();
  const handleSubmit = () => {
    addPhqWorker(data, orgId);
    history.push("/signup/verified");
  };

  return (
    <Container>
      <Row>
        <Col md={9} sm={12}>
          <Row style={{ marginTop: "5rem", marginLeft: "5rem" }}>
            <Col sm={12} md={4}>
              <h1>
                {" "}
                <span>👋</span>&nbsp;Hello.
              </h1>
            </Col>
          </Row>

          <Row
            style={{
              marginTop: "20px",
              marginLeft: "5rem",
              marginBottom: "3rem",
            }}
          >
            <Col sm={12} md={5}>
              <h4>To get started,tell us who you are.</h4>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "5rem",
              marginLeft: "5rem",
              marginRight: "1rem",
            }}
          >
            <Col sm={12} md={4}>
              <Styledlabel>First name</Styledlabel>
              <StyledInput
                onChange={(e) => {
                  setData({
                    ...data,
                    first_name: e.target.value,
                  });
                }}
              />
            </Col>
            <Col md={2} sm={12}></Col>
            <Col sm={12} md={4}>
              <Styledlabel>Last name</Styledlabel>
              <StyledInput
                onChange={(e) => {
                  setData({
                    ...data,
                    last_name: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem", marginLeft: "5rem" }}>
            <Col sm={12} md={8}>
              <Styledlabel>Email</Styledlabel>
              <StyledInput
                onChange={(e) => {
                  setData({
                    ...data,
                    email: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem", marginLeft: "5rem" }}>
            <Col sm={12} md={4}>
              <LButton
                onClick={() => {
                  handleSubmit();
                }}
              >
                Ok, Lets Go&nbsp;&nbsp;
                <LogoSection
                  src={`/assets/icons/right-arrow-white.png`}
                  alt="image"
                />
              </LButton>
            </Col>
          </Row>
        </Col>
        <Col md={3} sm={12}>
          <SideBar />
        </Col>
      </Row>
    </Container>
  );
}
