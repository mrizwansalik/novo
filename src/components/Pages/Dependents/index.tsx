import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Label } from "reactstrap";
import { getDependents } from "src/api/dependents";
import { removeDependent } from "src/api/dependents";
import BottomCard from "src/pages/Bottomcard";
import TopBar from "src/pages/Bottomcard/Topsection";
import routes from "src/routes";
import useAddBrokerageForm from "../AddBrokeragePage/hooks";
import {
  Container,
  InputCard,
  SubHeading2,
  MainHeading,
  ActionButtonsContainer,
  ButtonContainer,
  RemoveIcon,
  InputLabel,
  StyledInput,
  EditIcon,
  LButton,
} from "./style";

export default function Dependents() {
  const { formControl, regionOptions, cityOptions } = useAddBrokerageForm();
  const history = useHistory();
  const [data, setData] = useState([]);
  const workerId = localStorage.getItem("worker");

  const Remove = (index) => {
    alert("Are you sure want to remove this?");
    const res = removeDependent(workerId, index);
    let narray = [...data];
    narray.splice(index, 1);
    setData(narray);
  };

  const editDependet = (index) => {
    history.push(routes.editdependents.getValue(index));
  };
  useEffect(() => {
    getDependents(workerId)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {});
  }, []);

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
              <h3>
                <b>DEPENDENTS</b>
              </h3>
            </MainHeading>
          </Col>
        </Row>

        {data?.length < 1 ? (
          <>
            <Row>
              <Col sm={12} md={10} lg={12}>
                <Label>You don't currently have any dependents.</Label>

                <hr></hr>
              </Col>
            </Row>
          </>
        ) : (
          Array.isArray(data) &&
          data?.map((i, index) => {
            return (
              <Row>
                <Col sm={12} md={4}>
                  <InputLabel> NAME</InputLabel>
                  <StyledInput>{i.name}</StyledInput>
                </Col>
                <Col sm={12} md={4}>
                  <InputLabel>RELATIONSHIP</InputLabel>
                  <StyledInput>
                    {i.relationship ? i.relationship : "None"}
                  </StyledInput>
                </Col>
                <Col sm={12} md={2}>
                  <InputLabel>AGE</InputLabel>
                  <StyledInput>{i.birthday ? i.birthday : "None"}</StyledInput>
                </Col>
                <Col sm={12} md={2}>
                  <ButtonContainer>
                    <EditIcon
                      onClick={() => editDependet(i.id)}
                      iconName="black_pencil.png"
                    />
                    <RemoveIcon
                      onClick={() => Remove(i.id)}
                      iconName="xCircle64px-red.png"
                    />
                  </ButtonContainer>
                </Col>
              </Row>
            );
          })
        )}

        <ActionButtonsContainer>
          <Col sm={12} md={4} lg={2}>
            <LButton
              onClick={() => {
                history.push(routes.adddependents.value);
              }}
            >
              Add New Dependent &nbsp;&nbsp;
            </LButton>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <SubHeading2
              onClick={() => {
                history.push(routes.acknowledge.value);
              }}
            >
              I'm done adding dependents{" "}
            </SubHeading2>
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
