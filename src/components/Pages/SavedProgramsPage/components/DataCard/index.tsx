import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import {
  KeyboardArrowRightOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowLeftOutlined,
  EditOutlined,
  CheckCircleOutline,
  HighlightOffOutlined,
} from "@material-ui/icons";
import { observer } from "mobx-react";
import {
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ButtonGroup,
  Col,
} from "reactstrap";
import ActionSheet from "../ActionSheet";
import { Container, Title } from "./styles";

const DataCard = (props) => {
  const { data, index, update, onDelete } = props;
  const [stopLossArrow, setStopLossArrow] = useState(false);
  const [expensesArrow, setExpensesArrow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [itemId, setItemId] = useState(3);
  const [versionIndex, setVersionIndex] = useState(0);
  const [nameEdit, setNameEdit] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const dataSet = ["sub", "sub", "sub", "sub", "sub", "sub"];

  const statusChecking = (status) => {
    if (status === true) return "yes";
    return "No";
  };

  const handleUpdateName = (data) => {
    const orgId = localStorage.getItem("orgId");
    const updatedData = {
      ...data,
      carrier: data.carrier.id,
      name: nameValue,
    };
    try {
      const response = update(orgId, data.id, updatedData);
      if (response) {
        setNameEdit(false);
        setNameValue("");
      }
    } catch (e) {}
  };

  const handleDelete = (id) => {
    const orgId = localStorage.getItem("orgId");
    try {
      const response = onDelete(orgId, id);
      if (response) {
        setOpenModal(false);
      }
    } catch (e) {}
  };
  useEffect(() => {
    setNameValue(data.name);
  }, [data]);

  return (
    <Container>
      <Row>
        {" "}
        <Title>
          {nameEdit ? (
            <Col>
              <input
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
              <CheckCircleOutline
                color="primary"
                onClick={() => handleUpdateName(data)}
              />
              <HighlightOffOutlined
                color="error"
                onClick={() => setNameEdit(false)}
              />
            </Col>
          ) : (
            <span onClick={() => setNameEdit(true)}>
              {data?.name}
              <EditOutlined />
            </span>
          )}
        </Title>
        <ActionSheet
          setOpen={setOpenModal}
          program={data?.id}
          version={data?.versions[versionIndex]?.id}
        />
      </Row>
      <Row>Group Size Restrictions - None</Row>
      <hr />
      <Row>
        <div className="col-md-8">
          <Accordion onClick={() => setStopLossArrow(!stopLossArrow)}>
            <AccordionSummary>
              {stopLossArrow ? (
                <KeyboardArrowDownOutlined />
              ) : (
                <KeyboardArrowRightOutlined />
              )}{" "}
              Stop-Loss Details
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: "100%" }}>
                <div>{data?.versions[versionIndex]?.stop_loss_title}</div>
                <Row className="mt-3">
                  <Col className="col-md-3">
                    <div className="fw-light">Specific Deductible</div>
                    <div>
                      ${data?.versions[versionIndex]?.specific_deductible}
                    </div>
                  </Col>
                  <Col className="col-md-3">
                    <div className="fw-light">Aggregate Attach Point</div>
                    <div>
                      {data?.versions[versionIndex]
                        ?.aggregate_attachment_percent * 100}
                      %
                    </div>
                  </Col>
                  <Col className="col-md-3">
                    <div className="fw-light">Contract Type</div>
                    <div>{data?.versions[versionIndex]?.contract_length}</div>
                  </Col>
                  <Col className="col-md-3">
                    <div className="fw-light">Specific TLO</div>
                    <div>
                      {statusChecking(
                        data?.versions[versionIndex]?.specific_tlo
                      )}
                    </div>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col className="col-md-3">
                    <div className="fw-light">Aggregate TLO</div>
                    <div>
                      {statusChecking(
                        data?.versions[versionIndex]?.aggregate_tlo
                      )}
                    </div>
                  </Col>
                  <Col className="col-md-3">
                    <div className="fw-light">Agg Accommodation</div>
                    <div>
                      {statusChecking(
                        data?.versions[versionIndex]?.has_agg_accommodation
                      )}
                    </div>
                  </Col>
                  <Col className="col-md-3">
                    <div className="fw-light">Advanced Spec Funding</div>
                    <div>
                      {statusChecking(
                        data?.versions[versionIndex]
                          ?.has_advanced_specific_funding
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </AccordionDetails>
          </Accordion>

          <hr />
          <Accordion onClick={() => setExpensesArrow(!expensesArrow)}>
            <AccordionSummary>
              {expensesArrow ? (
                <KeyboardArrowDownOutlined />
              ) : (
                <KeyboardArrowRightOutlined />
              )}
              Expenses
            </AccordionSummary>
            <AccordionDetails>some</AccordionDetails>
          </Accordion>
        </div>
        <div className="col-md-4">
          <div
            style={{
              borderLeft: "2px solid #E1E9EC",
              paddingLeft: "10px",
              paddingTop: "2rem",
            }}
          >
            <h4>Stop-loss Options</h4>
            {data.versions.map((item, index) => {
              return (
                <div key={item.id}>
                  {versionIndex === index ? (
                    <KeyboardArrowLeftOutlined />
                  ) : (
                    <KeyboardArrowRightOutlined />
                  )}
                  {
                    <span
                      className={
                        versionIndex === index
                          ? "font-weight-bold"
                          : "font-weight-normal"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => setVersionIndex(index)}
                    >
                      {item.name}
                    </span>
                  }
                </div>
              );
            })}
          </div>
        </div>
      </Row>
      <Row>
        <Modal isOpen={openModal} toggle={(e) => setOpenModal(false)}>
          <ModalHeader>Are you sure!</ModalHeader>
          <ModalBody>
            <ButtonGroup className="d-flex d-center">
              <Button color="danger" onClick={() => handleDelete(data?.id)}>
                Yes
              </Button>
              <Button color="primary" onClick={() => setOpenModal(false)}>
                No
              </Button>
            </ButtonGroup>
          </ModalBody>
        </Modal>
      </Row>
    </Container>
  );
};

export default observer(DataCard);
