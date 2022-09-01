import React, { useState, Fragment } from "react";

import { useHistory, useParams } from "react-router";
import { Col, Row, Input, FormGroup } from "reactstrap";

import { CarrierBox } from "src/components/Pages/CarrierListPage/components/CarrierList/styles";
import SingleSelect from "src/components/SingleSelect";

import { usStates } from "src/constants";
import useStore from "src/utils/useStore";
import {
  selectControlStyle,
  StyledSelect,
} from "../createNewQuote/components/ProfileForm/profileForm.style";
import {
  Container,
  StyledInput,
  Label,
  StyledCol,
  Bottom,
  StyledLabel,
  CB,
  CBC,
} from "./styles";
interface IParamsType {
  programId: any;
}

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

const EmptyProgram = {
  name: "",
  network_ingredient_sub_type: "",
  type: "",
  description: "",
  default_fee: {
    amount_type: "fixed_per_employee_per_month",
    amount_number: "",
    fee_type: "",
    amount_employee: 0,
    amount_spouse: 0,
    amount_children: 0,
    amount_family: 0,
  },
  minimum_group_size: 0,
  maximum_group_size: null,
  valid_states: [],
};

export default function AddedTpas(props) {
  const { title, url, tpa, setAddTpa, fee, setFee } = props;

  const gsp = {
    value: <StyledInput placeholder="$ 0" onChange={(e) => e.target.value} />,
    item: (
      <StyledInput
        placeholder="0"
        onChange={(e) => setGroupSizeVAlue(e.target.value)}
      />
    ),
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
  const { programIngredientStore, tpaStore } = useStore();
  // const [tpa, setAddTpa] = useState(EmptyProgram);
  const { getTPAList, TPADisplayList } = tpaStore;
  const { programId } = useParams<IParamsType>();
  // const orgId = localStorage.getItem("orgId");
  const history = useHistory();

  // const addingValue = () => {
  //   setPempNewItem((pre) => [...pre, gsp]);
  // };
  // const removevalue = (index) => {
  //   // var array = [...pempNewItem];
  //   // var indexx = array.indexOf()

  //   pempNewItem.splice(index, 1);
  //   setPempNewItem((e) => [...e, gsp]);
  // };

  const checkinput = () => {
    if (check1 === true) {
      setCheck1(false);
    } else {
      setCheck1(true);
    }
  };

  const checkinput2 = () => {
    if (check2 === true) {
      setCheck2(false);
    } else {
      setCheck2(true);
    }
  };

  let filters = [];
  let obj = { label: "", value: "", sub_type: "" };
  for (
    let i = 0;
    i <= programIngredientStore.programIngredientsList.length;
    i++
  ) {
    obj.label = programIngredientStore?.programIngredientsList[i]?.name;
    obj.value = programIngredientStore?.programIngredientsList[i]?.id;
    obj.sub_type = programIngredientStore?.programIngredientsList[i]?.sub_type;

    filters.push(obj);
    obj = { label: "", value: "", sub_type: "" };
  }
  return (
    <>
      <Fragment>
        {/* <TpasubHeader title="TPA Name" /> */}
        <Container style={{}}>
          <Col md={8}>
            <Row>
              <Row>
                <Col md={6} xs={12}>
                  <SingleSelect
                    options={filters}
                    defaultValue={filters[0]}
                    onChange={(e) => {
                      setAddTpa({
                        ...tpa,
                        network_ingredient_id: e.value,
                        default_fee: {
                          ...tpa.default_fee,
                          fee_type: e.sub_type,
                        },
                      });
                    }}
                    valueColor="#6d8491"
                    label="PROGRAM INGREDIENT"
                  />
                </Col>
                <Col>
                  <SingleSelect
                    options={assingment}
                    defaultValue={assingment[0]}
                    onChange={(e) => {
                      setAddTpa({
                        ...tpa,
                        type: e.value,
                      });
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
                        defaultChecked={fee}
                        onChange={() => setFee(!fee)}
                      />{" "}
                      Use Default Fee
                    </CB>
                  </Col>
                </Col>
              </Row>
            </Row>
            {fee ? (
              <></>
            ) : (
              <CarrierBox>
                <Row>
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
              </CarrierBox>
            )}

            <Row>
              <Col md={6} xs={12} style={{ marginTop: "20px" }}>
                <Label>MINIMUM GROUP SIZE</Label>
                <StyledInput
                  placeholder="0"
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
                  disabled={check2}
                  onChange={(e) => {
                    setAddTpa({ ...tpa, maximum_group_size: e.target.value });
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6} xs={12}>
                {check2 || tpa.maximum_group_size > tpa.minimum_group_size ? (
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
                    // display: "flex",
                    // justifyContent: "end",
                  }}
                  type="checkbox"
                  defaultChecked={check2}
                  onChange={() => setCheck2(!check2)}
                />{" "}
                No Maximum
              </CBC>
            </Row>

            <Row></Row>

            <Bottom>
              <Row>
                <Col md={12} xs={12}>
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
                      // defaultValue={usStates.forEach(item=> item)}
                      placeholder="e.g. Optional"
                      isSearchable
                      isMulti
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Bottom>
          </Col>
        </Container>
      </Fragment>
    </>
  );
}
