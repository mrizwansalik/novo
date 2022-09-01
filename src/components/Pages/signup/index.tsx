import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { fetchOrganisationToken } from "src/api/fetchOrgToken";
import { IParamTypes } from "src/types";
import SideBar from "./sidebar";

import {
  Container,
  LogoSection,
  Card,
  Headinghello,
  CardFont,
  SubHeading,
  LButton,
  BuutonHeading,
  Bottomsignin,
  Bottompgrah,
} from "./styles";

const Empty = { id: "", name: "", phq_status: "" };

export default function Signup() {
  const [show, setshow] = useState(false);
  const [data, setData] = useState<any>({});
  const history = useHistory();
  const { orgId } = useParams<IParamTypes>();
  useEffect(() => {
    const res = fetchOrganisationToken(orgId);
    if (res) {
      res.then((data) => {
        setData(data);
      });
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col md={9} sm={12}>
          {show ? (
            <Card>
              <Row style={{ padding: "14px" }}>
                <Col>
                  <h3>
                    You will be asked the following pieces of information about
                    your dependents and self:
                  </h3>
                </Col>
              </Row>

              <CardFont>
                <Row>
                  <Col sm={12} md={3}>
                    <b>Personal Information:</b>
                    <p>DOB, gender, address, weight, height, tobacco use.</p>
                  </Col>
                  <Col sm={12} md={3}>
                    <b>Dependent Information:</b>
                    <p>Name, DOB, gender, weight, height, tobacco use.</p>
                    <br></br>
                    <p style={{ color: "red" }}>
                      If you do not provide this information they will not be
                      eligible to enroll in the plan.
                    </p>
                  </Col>
                  <Col sm={12} md={3}>
                    <b>Medical History:</b>
                    <p>Simple yes or no questions.</p>
                    <br></br>
                    <p style={{ color: "blue" }}>
                      If you click yes to any conditions it will ask for
                      diagnosis and treatment.
                    </p>
                  </Col>
                  <Col sm={12} md={3}>
                    <b>Medication:</b>
                    <p>
                      Prescription name, use frequency, and dosage will be asked
                    </p>
                  </Col>
                </Row>
              </CardFont>
            </Card>
          ) : (
            <Headinghello>
              <Row>
                <Col md={1} lg={1}></Col>

                <Col md={10} lg={10}>
                  <h1>
                    {" "}
                    <span>👋</span>&nbsp;Hello.
                  </h1>
                </Col>
              </Row>
              <br></br>
              <SubHeading>
                <Row>
                  <Col sm={12} md={1} lg={1} xs={12}></Col>
                  <Col sm={12} md={10} lg={10} xs={12}>
                    <h5>
                      {data?.name} is using Novo Connection to collect
                      information for you and your colleagues in order to
                      provide the best price possible for your company’s group
                      health insurance plan.
                    </h5>
                  </Col>
                </Row>
              </SubHeading>
            </Headinghello>
          )}
          <BuutonHeading>
            <Col sm={8} md={1} xs={12}></Col>

            <Col sm={12} md={3} lg={4}>
              <LButton
                onClick={() => {
                  history.push("/signup/setup/" + orgId);
                }}
              >
                Ok, Let's Go&nbsp;&nbsp;
                <LogoSection
                  src={`/assets/icons/right-arrow-white.png`}
                  alt="image"
                />
              </LButton>
            </Col>
            <Col sm={12} md={3} lg={3}>
              <p
                style={{
                  marginRight: "10px",
                  fontSize: "13px",
                  color: "#6D8491",
                  marginLeft: "5px",
                  padding: "5px",
                }}
              >
                What Kind of formation will be collected? Glad you asked. You
                can find out &nbsp;
                <a
                  href="#"
                  style={{ color: "blue" }}
                  onClick={() => {
                    if (show === false) {
                      setshow(true);
                    } else {
                      setshow(false);
                    }
                  }}
                >
                  Here
                </a>
              </p>
            </Col>
          </BuutonHeading>
          <Bottomsignin>
            <Col sm={8} md={1} xs={12}></Col>

            <Col sm={8} md={6} xs={12}>
              <span>Already Have an account?</span>
              <span>
                <a href="#/login">Sign in</a>
              </span>
            </Col>
          </Bottomsignin>
          <Bottompgrah>
            <Col sm={8} md={1} xs={12} lg={1}></Col>
            <Col sm={12} md={8} lg={8} xs={12}>
              <p>
                By clicking "Ok, Let's Go" you agree to do business
                electronically with your employer, including but not limited to
                signing documents, providing information as requested, and the
                authorization to receive notifications via the email address
                provided above. I also confirm that I have the ability,
                equipment and software necessary to access Novo Connection,
                view/sign documents and print copies if necessary.
              </p>
            </Col>
          </Bottompgrah>
        </Col>
        <Col md={3} sm={12} xs={0}>
          <SideBar />
        </Col>
      </Row>
    </Container>
  );
}
