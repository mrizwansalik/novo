import React, { useState, Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Col, Row, Input, FormGroup } from "reactstrap";
import Button from "src/components/Button";
import ConfirmModal from "src/components/ConfirmModal";
import TpaSubHeader from "src/components/Header/components/TpaHeader";
import PageLayout from "src/components/PageLayout";
import { CarrierBox } from "src/components/Pages/CarrierListPage/components/CarrierList/styles";
import SingleSelect from "src/components/SingleSelect";
import { usStates } from "src/constants";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  selectControlStyle,
  StyledSelect,
} from "../createNewQuote/components/ProfileForm/profileForm.style";
import {
  Circle,
  Title,
} from "../ProgramIngredientsListPage/EditProgramIngredientsPage/styles";
import {
  Container,
  StyledInput,
  Label,
  StyledCol,
  CommonTextarea,
  Bottom,
  Save,
  CB,
  CBC,
} from "./style";
interface IParamsType {
  programId: any;
}

export const networkIngredientTypes = [
  {
    label: "Sub-Network",
    value: "sub_network",
  },
  {
    label: "Reference Based Pricing",
    value: "reference_based_pricing",
  },
  {
    label: "Pharmacy Benefit Manager",
    value: "pharmacy_benefit_manager",
  },
  {
    label: "Direct Primary Care",
    value: "direct_primary_care",
  },
  {
    label: "Navigation",
    value: "navigation",
  },
  {
    label: "Medical Management",
    value: "medical_management",
  },
  {
    label: "Virtual Primary Care",
    value: "virtual_primary_care",
  },
  {
    label: "Telehealth",
    value: "tele_health",
  },
  {
    label: "Rx-Solutions",
    value: "rx_solutions",
  },
  {
    label: "Bundled Services",
    value: "bundled_services",
  },
  {
    label: "Misc",
    value: "misc",
  },
  {
    label: "Pass Through Expense",
    value: "pass_through_expense",
  },
];
const assingment = [
  {
    value: "optional",
    label: "OPTIONAL",
  },
  {
    value: "default",
    label: "DEAFULT",
  },
  {
    value: "mandatory",
    label: "MANDATORY",
  },
];
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
export default function AddedTpas(props) {
  const { title, url } = props;

  const gsp = {
    value: <StyledInput placeholder="$ 0" onChange={(e) => e.target.value} />,
    item: (
      <StyledInput
        placeholder="0"
        onChange={(e) => setGroupSizeVAlue(e.target.value)}
      />
    ),
  };
  const EmptyProgram = {
    name: "",
    network_ingredient_sub_type: "",
    type: "",
    description: "",
    default_fee: null,
    minimum_group_size: 0,
    maximum_group_size: null,
    valid_states: [],
  };
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenModalUpload, setIsOpenModalUpload] = useState(false);

  const [table, setTable] = useState(false);
  const [field, setField] = useState("fixed_per_employee_per_month");
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(true);

  const [program, setProgram] = useState<any>("");

  const [groupSizeVAlue, setGroupSizeVAlue] = useState();
  const [pempNewItem, setPempNewItem] = useState([gsp]);
  const [tpaList, setTpa] = useState({});
  const [tpa, setAddTpa] = useState(EmptyProgram);
  const { programIngredientStore, tpaStore } = useStore();
  const {
    TpaProgramsDisplayList,
    TPADisplayList,
    singleTpa,
    updateTpaProgram,
    deleteTPAProgram,
  } = tpaStore;
  const { tpaId, programId } = useParams<IParamTypes>();
  const history = useHistory();
  async function onDeleteConfirm() {
    const data = await deleteTPAProgram(tpaId, programId);
    toast.success(tpa.name + " deleted.");
    setIsOpenConfirmModal(false);
    history.push(routes.dashboard.god.tpa.programingredients.getValue(tpaId));
  }
  useEffect(() => {
    setTpa(TPADisplayList.find((item) => item.id === tpaId));
    setAddTpa(TpaProgramsDisplayList.find((item) => item.id === programId));
  }, []);

  const handleSave = () => {
    const res = updateTpaProgram(tpaId, tpa);
    if (res) {
      history.push(routes.dashboard.god.tpa.programingredients.getValue(tpaId));
    }
  };
  return (
    <PageLayout title="Edit TPA Program Ingredient">
      <>
        <TpaSubHeader />
        <Container>
          <Col md={8}>
            <Row>
              <Col md={10}>
                <Title>Edit {singleTpa.name} Program Ingredient</Title>
              </Col>

              <Col md={2}>
                <Circle onClick={(e) => setIsOpenConfirmModal(true)} />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <Label>TPA NAME</Label>
                <StyledInput
                  value={tpa.name}
                  onChange={(e) => {
                    setAddTpa({ ...tpa, name: e.target.value });
                  }}
                  placeholder="e.g. Jhon Jhonson Care Co."
                />
              </Col>

              <Row>
                <Col md={6} xs={12}>
                  <SingleSelect
                    options={networkIngredientTypes}
                    value={networkIngredientTypes.find(
                      (item) => item.value === tpa.network_ingredient_sub_type
                    )}
                    onChange={(e) => {
                      setAddTpa({
                        ...tpa,
                        network_ingredient_sub_type: e.value,
                      });
                    }}
                    valueColor="#6d8491"
                    label="Type"
                  />
                </Col>
                <Col>
                  <SingleSelect
                    options={assingment}
                    value={assingment.find((item) => item.value === tpa.type)}
                    onChange={(e) => {
                      setAddTpa({ ...tpa, type: e.value });
                    }}
                    valueColor="#6d8491"
                    label="Assingment Type"
                  />
                </Col>
              </Row>
              {/* //////////////////////////////////////////////////////////////////////////// */}

              <Row>
                <Col md={6} xs={12} style={{ marginTop: "-4rem" }}>
                  <Col>
                    <CB>
                      <Input
                        type="checkbox"
                        defaultChecked={check1}
                        onChange={() => setCheck1(!check1)}
                      />{" "}
                      Use Default Fee
                    </CB>
                  </Col>
                </Col>
              </Row>
            </Row>
            {check1 ? (
              <></>
            ) : (
              <CarrierBox>
                <Row>
                  {/* <Col md={6} xs={12} style={{ marginTop: "-4rem" }}>
                    <Label>NAME</Label>
                    <StyledInput
                      placeholder="TPA Fee"
                      onChange={(e) => e.target.value}
                    />
                  </Col> */}

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
                              onChange={(e) => {
                                setAddTpa({
                                  ...tpa,
                                  default_fee: {
                                    ...tpa.default_fee,
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
                                onChange={(e) => {
                                  setAddTpa({
                                    ...tpa,
                                    default_fee: {
                                      ...tpa.default_fee,
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
                                onChange={(e) => {
                                  setAddTpa({
                                    ...tpa,
                                    default_fee: {
                                      ...tpa.default_fee,
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
                                onChange={(e) => {
                                  setAddTpa({
                                    ...tpa,
                                    default_fee: {
                                      ...tpa.default_fee,
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
                                onChange={(e) => {
                                  setAddTpa({
                                    ...tpa,
                                    default_fee: {
                                      ...tpa.default_fee,
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
                              onChange={(e) => {
                                setAddTpa({
                                  ...tpa,
                                  default_fee: {
                                    ...tpa.default_fee,
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
                                onChange={(e) => {
                                  setAddTpa({
                                    ...tpa,
                                    default_fee: {
                                      ...tpa.default_fee,
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
                                    setAddTpa({
                                      ...tpa,
                                      default_fee: {
                                        ...tpa.default_fee,
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
                            setAddTpa({
                              ...tpa,
                              default_fee: {
                                ...tpa.default_fee,
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

                {/* {field === "3PEMP" && (
                  <Row>
                    <Row>
                      <Col md={4} xs={12}>
                        <Label>GROUP SIZE</Label>
                        <StyledInput
                          placeholder="0"
                          onChange={(e) => setGroupSizeVAlue(e.target.value)}
                        />
                      </Col>
                      <Col md={4} xs={12}>
                        <Label>AMOUNT</Label>
                        <StyledInput
                          placeholder="$ 0"
                          onChange={(e) => e.target.value}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col></Col>
                    </Row>
                  </Row>
                )} */}
              </CarrierBox>
            )}

            {/* <Row>
                <Col>
                  <Label>MAXIMUM GROUP SIZE</Label>
                  <StyledInput
                    placeholder="0"
                    type="description"
                    // disabled={check1}
                    onChange={(e) => {
                      e.target.value;
                    }}
                  />
                </Col>
              </Row> */}

            <Row>
              <Col md={6} xs={12} style={{ marginTop: "20px" }}>
                <Label>MINIMUM GROUP SIZE</Label>
                <StyledInput
                  placeholder="0"
                  value={tpa.minimum_group_size}
                  onChange={(e) => {
                    setAddTpa({ ...tpa, minimum_group_size: e.target.value });
                  }}
                />
              </Col>
              <Col md={6} xs={12} style={{ marginTop: "20px" }}>
                <Label>MAXIMUM GROUP SIZE</Label>
                <StyledInput
                  placeholder="0"
                  type="number"
                  value={tpa.maximum_group_size}
                  disabled={check1}
                  onChange={(e) => {
                    setAddTpa({ ...tpa, maximum_group_size: e.target.value });
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6} xs={12}>
                {check2 ? (
                  <></>
                ) : (
                  <h6
                    style={{
                      fontSize: "10px",
                      color: "red",
                      border: "1px solid",
                      backgroundColor: "",
                    }}
                  >
                    Minimum must be less than Maximum
                  </h6>
                )}
              </Col>
              <CBC md={6} xs={12}>
                <Input
                  style={{
                    marginLeft: "auto",
                  }}
                  type="checkbox"
                  // className={check == false ? "disabled" : ""}
                  defaultChecked={check2}
                  onChange={() => setCheck2(!check2)}
                />{" "}
                No Maximum
              </CBC>
            </Row>

            <Row></Row>

            <Bottom>
              <Row>
                <Col md={6} xs={12}>
                  <FormGroup>
                    <StyledSelect
                      label="Availabe States"
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
              <Col md={12} xs={12} style={{ marginTop: "20px" }}>
                <Label>Description</Label>
                <CommonTextarea
                  value={tpa.description}
                  onChange={(e) => {
                    setAddTpa({ ...tpa, description: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Save>
                  <Button
                    size="lg"
                    color="primary"
                    label="Save"
                    onClick={() => handleSave()}
                  />
                </Save>
              </Col>
            </Row>
          </Col>
        </Container>
        <ConfirmModal
          toggle={() => setIsOpenConfirmModal(false)}
          isOpen={isOpenConfirmModal}
          title={`Are you sure you want to remove ${tpa.name}`}
          acceptText="Yes, remove it"
          rejectText="No, keep it"
          acceptCallback={onDeleteConfirm}
          rejectCallback={() => setIsOpenConfirmModal(false)}
        />
      </>
    </PageLayout>
  );
}
