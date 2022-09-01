import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Col, Container, Row, Input, FormGroup } from "reactstrap";
import Button from "src/components/Button";
import ConfirmModal from "src/components/ConfirmModal";
import FileUploader from "src/components/FileUploader";
import Modal from "src/components/Modal";
import NumberInput from "src/components/NumberInput";
import PageLayout from "src/components/PageLayout";
import {
  CarrierBox,
  CarrierLogo128,
  Dotted,
  CarrierLogoNo,
} from "src/components/Pages/CarrierListPage/components/CarrierList/styles";
import SingleSelect from "src/components/SingleSelect";
import { BaseFilePath, tpaIngredientTypes, usStates } from "src/constants";
import { Label, StyledCol } from "src/pages/CreateTpa/styles";
import routes from "src/routes";
import useStore from "src/utils/useStore";
import * as yup from "yup";
import { BigPlus } from "../../../components/Pages/TeamMemberPage/components/MemberForm/styles";
import {
  selectControlStyle,
  StyledSelect,
} from "../../../pages/createNewQuote/components/ProfileForm/profileForm.style";
import { TypeFilterOptions } from "./constant";

import {
  Title,
  StyledInput,
  StyledCheckbox,
  Circle,
  EditCarrierPageContainer,
  StyledLabel,
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

const customAllowFileTypes = ["image/*"];

const EmptyProgram = {
  client_org: "",
  default_fee: { name: "" },
  description: "",
  estimated_savings: false,
  excluded_ingredients: [],
  id: "",
  is_standard: false,
  name: "",
  org: {},
  recommendations: [],
  sub_type: "",
  tpas: [],
  type: "",
};
const EmptyTPAProgram = {
  default_fee: null,
  maximum_group_size: null,
  minimum_group_size: 0,
  network_ingredient_id: "",
  type: "",
  valid_states: [],
};

const schema = yup.object().shape({
  name: yup.string().required(),
});

const EditProgramIngredientsPage = () => {
  const history = useHistory();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenModalUpload, setIsOpenModalUpload] = useState(false);
  const [feeType, setFeeType] = useState(false);
  const [tpaProgram, setTpaProgram] = useState(false);
  const [program, setProgram] = useState<any>("");
  const [field, setField] = useState("fixed_per_employee_per_month");
  const [showMember, setShowMember] = useState(false);
  const [defaultFee, setDefaultFee] = useState(true);
  const [tpaWithProgram, setTpaWithProgram] = useState<any>(EmptyTPAProgram);
  const { programIngredientStore, tpaStore } = useStore();
  const {
    programIngredientsList,
    programIngredientsDisplayList,
  } = programIngredientStore;
  const { getTPAList, TPADisplayList } = tpaStore;
  const { programId } = useParams<IParamsType>();
  const orgId = localStorage.getItem("orgId");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onDeleteLogo() {
    setProgram({ ...program, picture: "", picture_thumbnail_128: "" });
  }
  async function onSaveProgram() {
    if (programId) {
      const data = await programIngredientStore.updateProgramIngredient(
        orgId,
        program
      );
      if (data.id) {
        toast.success(data.name + " updated.");
      } else {
        toast.error("There was an error updating " + program?.name);
      }
    } else {
      const data = await programIngredientStore.createProgramIngredient(
        orgId,
        program
      );
      if (data.id) {
        toast.success(data.name + " created.");
      } else {
        toast.error("There was an error creating " + program?.name);
      }
    }
    history.push(routes.dashboard.god.programIngredients.list.value);
  }
  async function onDeleteConfirm() {
    const data = await programIngredientStore.deleteProgramIngredient(
      orgId,
      program.id
    );
    toast.success(program?.name + " deleted.");
    setIsOpenConfirmModal(false);
    history.push(routes.dashboard.god.programIngredients.list.value);
  }
  useEffect(() => {
    programIngredientStore.getProgramIngredientsList(
      localStorage.getItem("orgId")
    );
    getTPAList();
  }, []);

  useEffect(() => {
    if (programIngredientsDisplayList.length) {
      setProgram(
        programIngredientsDisplayList.find((i) => i.id === programId) ||
          EmptyProgram
      );
    }
  }, [programIngredientsDisplayList.length]);

  const defaultValueAssignmentType = tpaIngredientTypes.find(
    (item) => item.key === "optional"
  );

  const handleChangeState = (value) => {
    setTpaWithProgram({
      ...tpaWithProgram,
      valid_states: tpaWithProgram.valid_states.push(value.geoname_code),
    });
  };

  const body = (
    <>
      <Row>
        <Col>
          <StyledSelect
            label="TPA"
            // options={regionOptions}
            controlStyle={selectControlStyle}
            placeholder="e.g. California"
            // onChange={onChange}
            isSearchable
          />
        </Col>
        <Col>
          <StyledSelect
            label="Assignment Type"
            options={tpaIngredientTypes}
            controlStyle={selectControlStyle}
            defaultValue={defaultValueAssignmentType}
            placeholder="e.g. Optional"
            onChange={(e) =>
              setTpaWithProgram({
                ...tpaWithProgram,
                type: e.target.select,
              })
            }
            isSearchable
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledCheckbox
            checked={program.is_standard}
            onChange={(e) => setDefaultFee(!defaultFee)}
          />
          <label style={{ fontWeight: 300 }}>Use Default Fee</label>
        </Col>{" "}
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <NumberInput
            customInput={StyledInput}
            // format="#####"
            // mask="_"
            onChange={(e) =>
              setTpaWithProgram({
                ...tpaWithProgram,
                minimum_group_size: e.target.valueAsNumber,
              })
            }
            allowEmptyFormatting
            label="MINIMUM GROUP SIZE"
          />
        </Col>
        <Col>
          <NumberInput
            customInput={StyledInput}
            // format="#####"
            // mask="_"
            onChange={(e) =>
              setTpaWithProgram({
                ...tpaWithProgram,
                maximum_group_size: e.target.valueAsNumber,
              })
            }
            allowEmptyFormatting
            label="MAXIMUM GROUP SIZE"
          />
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <StyledCheckbox
            checked={program.is_standard}
            onChange={(e) =>
              setProgram({ ...program, is_standard: e.target.checked })
            }
          />
          <label style={{ fontWeight: 300 }}>No Maximum</label>
        </Col>{" "}
      </Row>
      <Row>
        <Col>
          <StyledLabel>
            Excluded States <br />
            <span style={{ fontSize: "10px" }}>
              {" "}
              Default All states are selected. Please Select for exclude
            </span>
          </StyledLabel>
          <StyledSelect
            options={usStates}
            controlStyle={selectControlStyle}
            placeholder="e.g. California"
            // onChange={handleChangeState}
            closeMenuOnSelect={false}
            isSearchable
            isMulti
          />
        </Col>
      </Row>
    </>
  );
  const footer = (
    <>
      <Row>
        <Col>
          <Button
            size="lg"
            color="primary"
            label="Save"
            onClick={onSaveProgram}
          />
          <Button
            style={{ marginLeft: 5 }}
            size="lg"
            label="Remove"
            onClick={(e) =>
              history.push(routes.dashboard.god.programIngredients.list.value)
            }
          />
        </Col>
      </Row>
    </>
  );
  const handlChangeValueOfOptins = (value) => {
    setProgram({
      ...program,
      type: value.value,
    });
  };

  const commpnyname = ` ${
    programIngredientsDisplayList.find((i) => i.id === programId)?.name
  }`;
  // console.log(commpnyname);

  return (
    <PageLayout
      title={`${
        programId ? "Edit Program Ingredient" : "Add Program Ingredient"
      } | Novo Connection`}
    >
      <EditCarrierPageContainer>
        <Container>
          <Row>
            <Col md={{ size: 6, offset: 2 }}>
              <Title>
                {programId
                  ? `Edit ${
                      programIngredientsDisplayList.find(
                        (i) => i.id === programId
                      )?.name
                    }`
                  : "Create Program Ingredient"}{" "}
              </Title>
            </Col>
            {programId && (
              <Col md={2}>
                <Circle onClick={(e) => setIsOpenConfirmModal(true)} />
              </Col>
            )}
          </Row>
          <>
            <form onSubmit={handleSubmit(handleChangeState)}>
              <Row>
                <Col md={{ size: 4, offset: 2 }} xs={12}>
                  <StyledLabel>Name</StyledLabel>
                  <StyledInput
                    {...register("name", { required: true })}
                    value={commpnyname}
                    // onChange={(e) =>
                    //   setProgram({ ...program, name: e.target.value })
                    // }
                  />
                  <p style={{ color: "red" }}>{errors.name?.message}</p>
                </Col>
                <Col md={4} xs={12}>
                  <StyledLabel>Logo</StyledLabel>
                  <CarrierBox>
                    {program?.org?.picture_thumbnail_128 ? (
                      <CarrierLogo128
                        src={program?.org?.picture_thumbnail_128}
                      />
                    ) : (
                      <CarrierLogoNo />
                    )}

                    <Dotted />
                    <Button
                      label="Upload Logo"
                      onClick={(e) => setIsOpenModalUpload(true)}
                    />
                    <Button
                      className="float-end"
                      color="danger"
                      label="Delete"
                    />
                  </CarrierBox>
                </Col>
                <Row>
                  <Col md={{ size: 4, offset: 2 }} xs={12}>
                    <StyledCheckbox
                      checked={program.is_standard}

                      // onChange={(e) =>
                      //   setProgram({
                      //     ...program,
                      //     is_standard: e.target.checked,
                      //   })
                      // }
                    />
                    <label style={{ fontWeight: 300 }}>Is Standard</label>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 4, offset: 2 }} xs={12}>
                    <StyledLabel>Type</StyledLabel>
                    <SingleSelect
                      options={TypeFilterOptions}
                      onChange={handlChangeValueOfOptins}
                    />
                  </Col>
                  <Col md={2} xs={12}>
                    <StyledLabel>
                      {" "}
                      <StyledCheckbox
                        onChange={(e) => setFeeType(!feeType)}
                        checked={program.estimated_savings}

                        // onChange={(e) =>
                        //   setProgram({
                        //     ...program,
                        //     estimated_savings: e.target.checked,
                        //   })
                        // }
                      />
                      <label style={{ fontWeight: 300 }}>
                        ESTIMATED SAVINGS
                      </label>
                    </StyledLabel>
                    <StyledInput
                      type="number"
                      value={program?.estimated_savings}
                      disabled={!feeType}
                      {...register("estimated_savings")}

                      // onChange={(e) =>
                      //   setProgram({
                      //     ...program,
                      //     default_fee: { name: e.target.value },
                      //   })
                      // }
                    />
                    <p style={{ color: "red" }}>{errors.name?.message}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 2, offset: 2 }} xs={6}>
                    <StyledCheckbox
                      checked={showMember}
                      onChange={(e) => setShowMember(!showMember)}
                    />
                    <label style={{ fontWeight: 300 }}>No Fee</label>
                  </Col>
                </Row>
                {!showMember && (
                  <Row>
                    <Col md={{ size: 4, offset: 2 }} xs={6}>
                      {field === "fixed_per_employee_per_month" && (
                        <Row>
                          <Col>
                            <Label>AMOUNT PEMP</Label>
                            <StyledInput
                              type="number"
                              placeholder="$ 0"
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
                                type="number"
                                placeholder="$ 0"
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
                                type="number"
                                placeholder="$ 0"
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
                                type="number"
                                placeholder="$ 0"
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
                              type="number"
                              placeholder=" $ 0"
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
                    <Col md={{ size: 4 }} xs={6}>
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
                )}
                <Row>
                  <Col md={{ size: 8, offset: 2 }} xs={12}>
                    <StyledLabel>Description</StyledLabel>
                    <Input
                      type="textarea"
                      value={program?.description}
                      onChange={(e) =>
                        setProgram({
                          ...program,
                          description: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 8, offset: 2 }} xs={12}>
                    <StyledLabel>TPAs</StyledLabel>
                  </Col>
                  <Col md={{ size: 8, offset: 2 }} xs={12}>
                    {programId && (
                      <BigPlus
                        active={true}
                        onClick={() => setTpaProgram(!tpaProgram)}
                        style={{ float: "right" }}
                      >
                        +
                      </BigPlus>
                    )}
                  </Col>
                  <Col md={{ size: 8, offset: 2 }} xs={12}>
                    {!programId && "No TPAs use this program ingredient."}
                  </Col>
                </Row>
              </Row>
              <br />
              <Row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button
                    size="lg"
                    color="primary"
                    label="Save"
                    onClick={onSaveProgram}
                  />
                  <Button
                    style={{ marginLeft: 5 }}
                    size="lg"
                    label="Cancel"
                    onClick={(e) =>
                      history.push(
                        routes.dashboard.god.programIngredients.list.value
                      )
                    }
                  />
                </Col>
              </Row>
            </form>
          </>
          <ConfirmModal
            toggle={() => setIsOpenConfirmModal(false)}
            isOpen={isOpenConfirmModal}
            title={`Are you sure you want to remove ${program?.name}`}
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
                org: {
                  ...program.org,
                  picture: logoFile.file,
                  picture_thumbnail_128: logoFile.file,
                },
              });
              setIsOpenModalUpload(false);
            }}
          />
          <Modal
            toggle={() => setTpaProgram(false)}
            isOpen={tpaProgram}
            header="Link TPA and Program Ingredient"
            body={body}
            footer={footer}
          ></Modal>
        </Container>
      </EditCarrierPageContainer>
    </PageLayout>
  );
};

export default EditProgramIngredientsPage;
