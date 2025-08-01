import { useState, useEffect, Fragment } from "react";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Col, Row, Input, FormGroup } from "reactstrap";
import Button from "src/components/Button";
import ConfirmModal from "src/components/ConfirmModal";
import FileUploader from "src/components/FileUploader";
import TpasubHeader from "src/components/Header/components/TpaHeader";
import PageLayout from "src/components/PageLayout";
import {
  CarrierBox,
  CarrierLogoNo,
  Dotted,
  CarrierLogo128,
} from "src/components/Pages/CarrierListPage/components/CarrierList/styles";
import SingleSelect from "src/components/SingleSelect";
import { BaseFilePath, usStates } from "src/constants";

import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  selectControlStyle,
  StyledSelect,
} from "../createNewQuote/components/ProfileForm/profileForm.style";

import {
  Container,
  StyledInput,
  Label,
  StyledLabel,
  StyledCol,
  SLabel,
  Circle,
  Logo,
  Bottom,
  Save,
  CB,
  CCb,
  CCcb,
  Del,
  ACircle,
  BigPlus,
} from "./styles";
interface IParamsType {
  programId: any;
}

const sortOptions = [
  {
    value: "fixed_per_employee_per_month",
    label: "PEPM",
  },
  {
    value: "four_tier_fixed_per_employee_per_month",
    label: "Tiered",
  },
  {
    value: "fixed_per_script",
    label: "Perscript",
  },
  {
    value: "one_time_fee",
    label: "one-time Fee",
  },
  {
    value: "custom_text",
    label: "Custom",
  },
];

const EmptyTpa = {
  id: "",
  name: "",
  minimum_group_size: 0,
  maximum_group_size: null,
  custom_plan_minimum_group_size: 0,
  custom_plan_maximum_group_size: null,
  maximum_number_plans: null,
  is_editable: true,
  carrier: "",
  can_customize_program: true,
  has_pre_packaged_plans: false,
  default_fee: {
    amount_type: "",
    amount_number: 0,
    fee_type: "",
    amount_employee: 0,
    amount_spouse: 0,
    amount_children: 0,
    amount_family: 0,
  },
  excluded_states: [],
  picture: "",
  picture_thumbnail_128: "",
};

function AddedTpas(props) {
  const { title, url } = props;

  const gsp = {
    value: (
      <StyledInput
        type="number"
        placeholder="$ 0"
        onChange={(e) => e.target.value}
      />
    ),
    item: (
      <StyledInput
        type="number"
        placeholder="0"
        onChange={(e) => setGroupSizeVAlue(e.target.value)}
      />
    ),
  };

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenModalUpload, setIsOpenModalUpload] = useState(false);

  const [table, setTable] = useState(false);
  const [field, setField] = useState("PEMP");
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [program, setProgram] = useState<any>(EmptyTpa);

  const [groupSizeVAlue, setGroupSizeVAlue] = useState();
  const [pempNewItem, setPempNewItem] = useState([gsp]);
  const { programIngredientStore, tpaStore } = useStore();
  const {
    getTPAList,
    TPADisplayList,
    getSingleTPA,
    deleteTPA,
    singleTpa,
    updateTPA,
  } = tpaStore;
  const { tpaId } = useParams<IParamTypes>();
  const orgId = localStorage.getItem("orgId");
  const history = useHistory();

  const addingValue = () => {
    setPempNewItem((old) => [...old, gsp]);
  };
  const removevalue = (index) => {
    var narray = [...pempNewItem];

    narray.splice(index, 1);
    setPempNewItem(narray);
  };

  const checkinput = () => {
    if (check1 === false) {
      setCheck1(true);
    } else {
      setCheck1(false);
    }
  };

  const checkinput2 = () => {
    if (check2 === false) {
      setCheck2(true);
    } else {
      setCheck2(false);
    }
  };
  const checkinput3 = () => {
    if (check3 === false) {
      setCheck3(true);
    } else setCheck3(false);
  };

  const customAllowFileTypes = ["image/*"];
  const handleSubmit = async () => {
    const res = await updateTPA(program);
    if (res) {
      history.push(routes.dashboard.god.tpa.list.value);
      setProgram(EmptyTpa);
    }
  };
  async function onDeleteConfirm() {
    const data = await deleteTPA(tpaId);
    toast.success("Succesfully deleted.");
    setIsOpenConfirmModal(false);
    history.push(routes.dashboard.god.tpa.list.value);
  }
  useEffect(() => {
    getSingleTPA(tpaId);
  }, []);
  useEffect(() => {
    setProgram(singleTpa);
  }, [singleTpa]);

  return (
    <PageLayout title="Edit Tpa | Novo Connection">
      <Fragment>
        <TpasubHeader title={singleTpa.name} />
        <Container>
          <Col md={8}>
            <Row>
              <Col sm={12} md={6}>
                <Label>TPA NAME</Label>
                <StyledInput
                  value={program.name}
                  placeholder="e.g New Tpa"
                  onChange={(e) => {
                    setProgram({
                      ...program,
                      name: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col md={6} xs={12}>
                <Logo>
                  <StyledLabel>Logo</StyledLabel>
                  <CarrierBox>
                    {program.picture_thumbnail_128 ? (
                      <CarrierLogo128 src={program.picture_thumbnail_128} />
                    ) : (
                      <CarrierLogoNo />
                    )}

                    <Dotted />
                    <Button
                      label="Upload Logo"
                      onClick={() => setIsOpenModalUpload(true)}
                    />

                    <Button
                      className="float-end"
                      color="danger"
                      label="Delete"
                    />
                  </CarrierBox>
                </Logo>
              </Col>
            </Row>
            <Row>
              <Col md={6} xs={12}>
                <Label>MINIMUM GROUP SIZE</Label>
                <StyledInput
                  placeholder="0"
                  type="number"
                  value={program.minimum_group_size}
                  onChange={(e) =>
                    setProgram({
                      ...program,
                      minimum_group_size: e.target.value,
                    })
                  }
                />
              </Col>
              <Col>
                <Label>MAXIMUM GROUP SIZE</Label>
                <StyledInput
                  placeholder="0"
                  type="number"
                  disabled={check1}
                  value={program.maximum_group_size}
                  onChange={(e) => {
                    setProgram({
                      ...program,
                      maximum_group_size: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col>
                <CB>
                  <Input
                    type="checkbox"
                    checked={check1}
                    onClick={() => setCheck1(!check1)}
                  />{" "}
                  No Maximum
                </CB>
              </Col>
            </Row>
            <Row>
              <Col md={6} xs={12}>
                <Label>CUSTOM PLAN MINIMUM GROUP SIZE</Label>
                <StyledInput
                  placeholder="0"
                  type="number"
                  value={program.custom_plan_minimum_group_size}
                  onChange={(e) => {
                    setProgram({
                      ...program,
                      custom_plan_minimum_group_size: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col>
                <Label>CUSTOM PLAN MAXIMUM GROUP SIZE</Label>
                <StyledInput
                  placeholder="0"
                  type="number"
                  value={program.custom_plan_maximum_group_size}
                  disabled={check2}
                  onChange={(e) => {
                    setProgram({
                      ...program,
                      custom_plan_maximum_group_size: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col>
                <CCb>
                  <Input
                    type="checkbox"
                    checked={check2}
                    onClick={() => setCheck2(!check2)}
                  />
                  No Maximum
                </CCb>
              </Col>
            </Row>
            <Row>
              <Col md={4} xs={1}>
                <Label>MAXIMUM NUMBER OF PLANS</Label>
                <StyledInput
                  placeholder="0"
                  type="number"
                  disabled={check3}
                  value={program.maximum_number_plans}
                  onChange={(e) => {
                    setProgram({
                      ...program,
                      maximum_number_plans: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col>
                <Col>
                  <CCcb>
                    <Input
                      type="checkbox"
                      checked={check3}
                      onClick={() => setCheck3(!check3)}
                    />{" "}
                    No Maximum
                  </CCcb>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col md={6} style={{}}>
                <Label>TPA FEE</Label>
                <SLabel>There is no TPA fee</SLabel>
                <Button
                  style={{ marginBottom: "18px" }}
                  size="sm"
                  color="primary"
                  label="Add one"
                  onClick={() => {
                    setTable(true);
                  }}
                />
              </Col>
            </Row>

            {table ? (
              <CarrierBox>
                <Del>
                  <Circle
                    onClick={() => {
                      window.confirm(
                        "ARE YOU SURE YOU WANT TO REMOVE TPA FEE? "
                      );
                      setTable(false);
                    }}
                  />

                  {/* <Button
                    style={{
                      borderRadius: "100%",
                      color: "red",
                      fontSize: "10px",
                      backgroundColor: "white",
                      border: "1px solid red",
                    }}
                    label="X"
                    onClick={() => {
                      confirm("ARE YOU SURE YOU WANT TO REMOVE TPA FEE? ");
                      setTable(false);
                    }}
                  /> */}
                </Del>

                {/* {field === "PEMP" && ( */}
                <Row>
                  <Col md={6} xs={12} style={{ marginTop: "-4rem" }}>
                    <Label style={{ marginLeft: "10px" }}>NAME</Label>
                    <StyledInput
                      placeholder="TPA Fee"
                      type="number"
                      onChange={(e) =>
                        setProgram({
                          ...program,
                          default_fee: {
                            ...program.default_fee,
                            fee_type: e.target.value,
                          },
                        })
                      }
                    />
                  </Col>

                  <Row
                    style={{
                      marginTop: "2rem",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Col md={6} xs={12}>
                      {field === "fixed_per_employee_per_month" && (
                        <Row>
                          <Col>
                            <Label>AMOUNT PEMP</Label>
                            <StyledInput
                              placeholder="$ 0"
                              type="number"
                              onChange={(e) => {
                                setProgram({
                                  ...program,
                                  default_fee: {
                                    ...program.default_fee,
                                    amount_number: e.target.value,
                                  },
                                });
                              }}
                            />
                          </Col>
                        </Row>
                      )}
                      {field === "four_tier_fixed_per_employee_per_month" && (
                        <Row>
                          <Row>
                            <Col>
                              <Label>AMOUNT TIERS</Label>
                              {/* <Sublabel>Employee/mo</Sublabel> */}
                              <StyledInput
                                placeholder="$ 0"
                                t
                                ype="number"
                                onChange={(e) => {
                                  setProgram({
                                    ...program,
                                    default_fee: {
                                      ...program.default_fee,
                                      amount_employee: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Label>Employee + Spouce/mo</Label>
                              <StyledInput
                                placeholder="$ 0"
                                type="number"
                                onChange={(e) => {
                                  setProgram({
                                    ...program,
                                    default_fee: {
                                      ...program.default_fee,
                                      amount_spouse: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <Label>Employee + children/mo</Label>
                              <StyledInput
                                placeholder=" $ 0"
                                type="number"
                                onChange={(e) => {
                                  setProgram({
                                    ...program,
                                    default_fee: {
                                      ...program.default_fee,
                                      amount_children: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Label>Employee + Family/mo</Label>
                              <StyledInput
                                placeholder="$ 0"
                                type="number"
                                onChange={(e) => {
                                  setProgram({
                                    ...program,
                                    default_fee: {
                                      ...program.default_fee,
                                      amount_family: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </Col>
                          </Row>
                        </Row>
                      )}
                      {field === "fixed_per_script" && (
                        <Row>
                          <Col>
                            <Label>AMOUNT/SCRIPT</Label>
                            <StyledInput
                              placeholder=" $ 0"
                              type="number"
                              onChange={(e) => {
                                setProgram({
                                  ...program,
                                  default_fee: {
                                    ...program.default_fee,
                                    amount_number: e.target.value,
                                  },
                                });
                              }}
                            />
                          </Col>
                        </Row>
                      )}
                      {field === "one_time_fee" && (
                        <Row>
                          <Row>
                            <Col>
                              <Label>AMOUNT</Label>
                              <StyledInput
                                placeholder="$ 0"
                                type="number"
                                onChange={(e) => {
                                  setProgram({
                                    ...program,
                                    default_fee: {
                                      ...program.default_fee,
                                      amount_number: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </Col>
                          </Row>
                        </Row>
                      )}

                      {field === "custom_text" && (
                        <Row>
                          <Row>
                            <Col>
                              <FormGroup col>
                                <Label>AMOUNT TEXT</Label>
                                <Input
                                  type="select"
                                  name="selectMulti"
                                  id="exampleText"
                                  style={{
                                    height: "6rem",
                                  }}
                                  onChange={(e) => {
                                    setProgram({
                                      ...program,
                                      default_fee: {
                                        ...program.default_fee,
                                        amount_number: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Row>
                      )}
                    </Col>
                    <Col>
                      <StyledCol style={{ marginTop: "2rem" }}>
                        <SingleSelect
                          label="EXPENSE TYPE"
                          value={sortOptions.find(
                            (item) => item.value === field
                          )}
                          onChange={(e) => {
                            setProgram({
                              ...program,
                              default_fee: {
                                ...program.default_fee,
                                amount_type: e.value,
                              },
                            });
                            setField(e.value);
                          }}
                          options={sortOptions}
                        />
                      </StyledCol>
                    </Col>
                  </Row>
                </Row>

                {field === "Group Size PEMP" && (
                  <Row>
                    <Row>
                      <Col md={2} xs={12}>
                        <Label>GROUP SIZE</Label>
                        <StyledInput
                          type="number"
                          disabled="disabled"
                          placeholder="0"
                          onChange={(e) => setGroupSizeVAlue(e.target.value)}
                        />
                      </Col>
                      <Col md={2} xs={12}>
                        <Label>AMOUNT</Label>
                        <StyledInput
                          placeholder="$ 0"
                          onChange={(e) => e.target.value}
                        />
                      </Col>

                      {pempNewItem.map((i, index) => {
                        return (
                          <Row>
                            <Col md={2} xs={6}>
                              <p> {i.item}</p>
                            </Col>
                            <Col md={2} xs={6}>
                              <p>{i.value}</p>
                            </Col>
                            <Col md={2} xs={6}>
                              <ACircle
                                onClick={() => removevalue(index)}
                              ></ACircle>
                            </Col>
                          </Row>
                        );
                      })}
                    </Row>

                    <Col md={{ size: 8, offset: 2 }} xs={12}>
                      <BigPlus active={true} onClick={() => addingValue()}>
                        +
                      </BigPlus>
                    </Col>
                    <Row>
                      <Col></Col>
                    </Row>
                  </Row>
                )}
              </CarrierBox>
            ) : (
              <></>
            )}
            <Bottom>
              <Row>
                <Col md={6} xs={12}>
                  <FormGroup>
                    <StyledLabel>
                      Excluded States <br />
                      <span style={{ fontSize: "10px" }}>
                        {" "}
                        Default All states are selected. Please Select for
                        exclude
                      </span>
                    </StyledLabel>
                    <StyledSelect
                      options={usStates}
                      controlStyle={selectControlStyle}
                      placeholder="e.g. Optional"
                      isSearchable
                      isMulti
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Bottom>
            <Row>
              <Col md={4}>
                <Save>
                  <Button
                    size="lg"
                    color="secondary"
                    label="Save"
                    onClick={() => handleSubmit()}
                  />
                </Save>
              </Col>
            </Row>
          </Col>
          <ConfirmModal
            toggle={() => setIsOpenConfirmModal(false)}
            isOpen={isOpenConfirmModal}
            title={`Are you sure you want to remove ${program.name}`}
            acceptText="Yes, remove it"
            rejectText="No, keep it"
            acceptCallback={onDeleteConfirm}
            rejectCallback={() => setIsOpenConfirmModal(false)}
          />
          <FileUploader
            isOpen={isOpenModalUpload}
            customAllowFileTypes={customAllowFileTypes}
            onRequestClose={() => setIsOpenModalUpload(false)}
            filePath={BaseFilePath.PUBLIC}
            onUploadSuccess={(logoFile) => {
              setProgram({
                ...program,
                picture: logoFile.file,
                picture_thumbnail_128: logoFile.file,
              });
              setIsOpenModalUpload(false);
            }}
          />
        </Container>
      </Fragment>
    </PageLayout>
  );
}

export default observer(AddedTpas);
