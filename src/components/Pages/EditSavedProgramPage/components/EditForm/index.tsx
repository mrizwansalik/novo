import React, { useEffect, useState } from "react";
import { CancelOutlined, Edit } from "@material-ui/icons";
import { debounce } from "lodash";
import { observer } from "mobx-react";
import { useParams, useHistory } from "react-router";
import { Row, Col, Input } from "reactstrap";
import Button from "src/components/Button";
import {
  SavedProgramTermsValue,
  AggregateAttachPoint,
  SpecificDeductable,
  ContractType,
} from "src/constants";
import {
  selectControlStyle,
  StyledSelect,
} from "src/pages/createNewQuote/components/ProfileForm/profileForm.style";
import {
  StyledLabel,
  StyledInput,
  StyledCheckbox,
} from "src/pages/ProgramIngredientsListPage/EditProgramIngredientsPage/styles";
import routes from "src/routes";
import useStore from "src/utils/useStore";
import { SubTitle } from "../../style";
import { Container, Title } from "./styles";

interface IParamsType {
  programId: any;
  versionId: string;
}

const EmptyData = {
  aggregate_attachment_percent: 0,
  aggregate_stop_loss_underwriting_factor: 0,
  aggregate_tlo: false,
  aggregating_specific_deductible: null,
  claims_fund_underwriting_factor: 0,
  contract_length: "",
  contract_length_agg: "",
  contract_length_spec: "",
  created: "",
  date_underwritten_rates_set: null,
  display_name: "",
  fees: [],
  files: {},
  has_advanced_specific_funding: true,
  has_agg_accommodation: true,
  id: "",
  is_blended: false,
  lasers: [],
  modified: "",
  name: "",
  network_discount_override: 0,
  network_ingredients: [],
  notes: "",
  number_of_tiers: 0,
  org_plans: [],
  overall_underwriting_factor: 0,
  proposal_documents: [],
  run_in: 0,
  run_out: 0,
  specific_deductible: 0,
  specific_stop_loss_underwriting_factor: 0,
  specific_tlo: false,
  status: "",
  stop_loss_carrier: null,
  stop_loss_contract: null,
  stop_loss_title: "",
  underwritten_status: "",
  version_type: "",
};

const EditForm = () => {
  const { savedProgramStore } = useStore();
  const {
    detailSavedProgram,
    savedProgramDisplayList,
    deleteSpecificVersion,
    makeDuplicateVersion,
    getDetailOfProgram,
    editSpecificVersion,
  } = savedProgramStore;
  const { programId, versionId } = useParams<IParamsType>();
  const history = useHistory();
  const [defaultName, setDefaultName] = useState(true);
  const [versionIndex, setVersionIndex] = useState(0);
  const [versionData, setVerionData] = useState(EmptyData);
  const [programData, setProgramData] = useState({});

  const statusChecking = (status) => {
    if (status === true) return "yes";
    return "No";
  };

  const orgId = localStorage.getItem("orgId");

  const handleDuplicate = () => {
    const item = {
      copy_prices: detailSavedProgram?.versions[versionIndex]?.id,
    };
    makeDuplicateVersion(orgId, detailSavedProgram?.id, versionData?.id, item);
  };

  useEffect(() => {
    setProgramData(
      savedProgramDisplayList.find((item) => item.id === programId)
    );
    setVerionData(
      savedProgramDisplayList
        .find((item) => item.id === programId)
        .versions.find((version) => version.id === versionId)
    );
  }, [versionIndex]);

  const handleDeleteVersion = (id) => {
    deleteSpecificVersion(orgId, programId, id);
    setProgramData(
      savedProgramDisplayList
        ?.find((item) => item.id === programId)
        .versions?.filter((ver) => ver.id !== id)
    );
    debounce(() => {
      getDetailOfProgram(orgId, programId);
    }, 200);
  };

  const handleEditClick = (id) => {
    const res = editSpecificVersion(
      orgId,
      programId,
      versionData.id,
      versionData
    );
    if (res) {
      setVerionData(
        savedProgramDisplayList
          .find((item) => item.id === programId)
          .versions.find((version) => version.id === id)
      );
      history.push(
        routes.dashboard.brokerage.editTemplatePrograms.getValue(programId, id)
      );
    }
  };

  const handleSaveVersion = () => {
    const res = editSpecificVersion(
      orgId,
      programId,
      versionData.id,
      versionData
    );
    if (res) {
      history.push(routes.dashboard.brokerage.templatePrograms.value);
    }
  };
  return (
    <Container>
      <Row>
        {" "}
        <Title>{detailSavedProgram?.name}</Title>
      </Row>
      <Row></Row>
      <br />
      <Row>
        <Col md={detailSavedProgram?.versions?.length > 1 ? 8 : 12}>
          <Row>
            <Col>
              <StyledLabel>STOP-LOSS OPTION NAME</StyledLabel>
              <StyledInput
                value={versionData?.stop_loss_title}
                onChange={(e) => {
                  setVerionData({
                    ...versionData,
                    stop_loss_title: e.target.value,
                  });
                }}
                disabled={defaultName}
              />
            </Col>
            <Col>
              <br />
              <StyledCheckbox
                checked={defaultName}
                onChange={() => setDefaultName(!defaultName)}
              />
              <label>Generate Name From Variable</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <StyledSelect
                label="SPECIFIC DEDUCTIBLE"
                options={SpecificDeductable}
                controlStyle={selectControlStyle}
                placeholder="e.g. 10000"
                value={SpecificDeductable.find(
                  (item) => item.value === versionData.specific_deductible
                )}
                onChange={(e) =>
                  setVerionData({
                    ...versionData,
                    specific_deductible: e.value,
                  })
                }
                isSearchable
              />
            </Col>
            <Col>
              <StyledSelect
                label="AGGREGATE ATTACH POINT"
                options={AggregateAttachPoint}
                controlStyle={selectControlStyle}
                placeholder="e.g. 125%"
                value={AggregateAttachPoint.find(
                  (item) =>
                    item.value === versionData.aggregate_attachment_percent
                )}
                onChange={(e) =>
                  setVerionData({
                    ...versionData,
                    aggregate_attachment_percent: e.value,
                  })
                }
                isSearchable
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <StyledSelect
                label="CONTRACT TYPE"
                options={ContractType}
                controlStyle={selectControlStyle}
                placeholder="e.g. 12/12"
                value={ContractType.find(
                  (item) => item.value === versionData.contract_length
                )}
                onChange={(e) =>
                  setVerionData({
                    ...versionData,
                    contract_length: e.value,
                  })
                }
                isSearchable
              />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <StyledSelect
                label="SPECIFIC TLO"
                options={SavedProgramTermsValue}
                controlStyle={selectControlStyle}
                placeholder="e.g. No"
                value={SavedProgramTermsValue.find(
                  (item) => item.value === versionData.specific_tlo.toString()
                )}
                onChange={(e) =>
                  setVerionData({
                    ...versionData,
                    specific_tlo: JSON.parse(e.value),
                  })
                }
                isSearchable
              />
            </Col>
            <Col>
              <StyledSelect
                label="AGGREGATE TLO"
                options={SavedProgramTermsValue}
                controlStyle={selectControlStyle}
                placeholder="e.g. No"
                value={SavedProgramTermsValue.find(
                  (item) => item.value === versionData.aggregate_tlo.toString()
                )}
                onChange={(e) =>
                  setVerionData({
                    ...versionData,
                    aggregate_tlo: JSON.parse(e.value),
                  })
                }
                isSearchable
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <StyledSelect
                label="AGG ACCOMMODATION"
                options={SavedProgramTermsValue}
                controlStyle={selectControlStyle}
                placeholder="e.g. No"
                value={SavedProgramTermsValue.find(
                  (item) =>
                    item.value === versionData.has_agg_accommodation.toString()
                )}
                onChange={(e) =>
                  setVerionData({
                    ...versionData,
                    has_agg_accommodation: JSON.parse(e.value),
                  })
                }
                isSearchable
              />
            </Col>
            <Col>
              <StyledSelect
                label="ADVANCED SPEC FUNDING"
                options={SavedProgramTermsValue}
                controlStyle={selectControlStyle}
                placeholder="e.g. No"
                value={SavedProgramTermsValue.find(
                  (item) =>
                    item.value ===
                    versionData.has_advanced_specific_funding.toString()
                )}
                onChange={(e) =>
                  setVerionData({
                    ...versionData,
                    has_advanced_specific_funding: JSON.parse(e.value),
                  })
                }
                isSearchable
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <StyledLabel>NOTE</StyledLabel>
              <Input
                type="textarea"
                value={versionData?.notes}
                onChange={(e) =>
                  setVerionData({
                    ...versionData,
                    notes: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
          <br />
        </Col>
        {detailSavedProgram?.versions?.length > 1 && (
          <Col className="col-md-4">
            <div
              style={{
                borderLeft: "2px solid #E1E9EC",
                paddingLeft: "10px",
                paddingTop: "2rem",
              }}
            >
              <SubTitle>Stop-loss Options</SubTitle>
              {detailSavedProgram.versions.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className={item.id === versionId ? "bg-light " : ""}
                  >
                    {item.id !== versionId ? (
                      <Edit
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditClick(item.id)}
                      />
                    ) : (
                      "  "
                    )}
                    <CancelOutlined
                      color="error"
                      style={{ cursor: "pointer" }}
                      fontSize="small"
                      onClick={() => {
                        handleDeleteVersion(item.id);
                      }}
                      className={item.id === versionId && "ms-4"}
                    />
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
          </Col>
        )}
      </Row>
      <Row>
        <Col md={2}>
          <Button
            color="primary"
            label="Save Stop-Loss"
            onClick={() => handleSaveVersion()}
          />
        </Col>
        <Col>
          <Button
            color="success"
            outline
            label="Add Another Stop-loss Option"
            onClick={() => handleDuplicate()}
          />
        </Col>
      </Row>
      <Row>
        {/* <Modal isOpen={openModal} toggle={(e) => setOpenModal(false)}>
          <ModalHeader>Are you sure!</ModalHeader>
          <ModalBody>
            <ButtonGroup className="d-flex d-center">
              <Button color="danger" onClick={() => handleDelete(detailSavedProgram?.id)}>
                Yes
              </Button>
              <Button color="primary" onClick={() => setOpenModal(false)}>
                No
              </Button>
            </ButtonGroup>
          </ModalBody>
        </Modal> */}
      </Row>
    </Container>
  );
};

export default observer(EditForm);
