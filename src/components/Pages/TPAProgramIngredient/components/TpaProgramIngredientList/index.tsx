import React, { Fragment, useState } from "react";
import { observer } from "mobx-react";
import { useParams, useHistory } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Addnewprogramingredients from "src/pages/Addnewprogramingredients";
import LinkprogrammingredientsTPA from "src/pages/LinkprogrammingredientsTPA";
import {
  Head,
  MainContent,
  LButton,
  EditButton,
  AddLabel,
  ListSheetLayout,
  SubHead,
  ButtonSheetLayout,
  EditButton2,
} from "src/pages/Tpaprogramingridients/style";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import { titleCase } from "src/utils/stringHelper";
import useStore from "src/utils/useStore";
import Action from "../Actions";

const sortOptions = [
  {
    value: "PEMP",
    label: "PEPM",
  },
  {
    value: "Tiered",
    label: "Tiered",
  },
  {
    value: "Perscript",
    label: "Perscript",
  },
  {
    value: "one-time Fee",
    label: "one-time Fee",
  },
  {
    value: "Custom",
    label: "Custom",
  },

  {
    value: "Group Size PEMP",
    label: "Group Size PEMP",
  },
];
const EmptyProgram = {
  name: "",
  network_ingredient_sub_type: "",
  type: "optional",
  description: "",
  default_fee: {
    amount_type: "",
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

const EmptyProgramForExistingAdd = {
  default_fee: {
    amount_type: "",
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
  network_ingredient_id: "",
  type: "optional",
};
const MyModal = ({ show, onHide, tpa, setAddTpa, onSave, fee, setFee }) => {
  return (
    <Modal
      size="lg"
      toggle={() => onHide(!show)}
      isOpen={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader>
        <Head>Add New Programm Ingredient</Head>
      </ModalHeader>
      <ModalBody>
        <Addnewprogramingredients
          tpa={tpa}
          setAddTpa={setAddTpa}
          fee={fee}
          setFee={setFee}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => onSave()}>
          Save
        </Button>
        <Button onClick={() => onHide(!show)}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

const MyEModal = ({
  show,
  onHide,
  addTpa,
  setAddExisting,
  onSave,
  fee,
  setFee,
}) => {
  return (
    <Modal
      toggle={() => onHide(!show)}
      size="lg"
      isOpen={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader closeButton>
        <Head>link Programm Ingredient and TPA</Head>
      </ModalHeader>
      <ModalBody>
        <LinkprogrammingredientsTPA
          tpa={addTpa}
          setAddTpa={setAddExisting}
          fee={fee}
          setFee={setFee}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => onSave()}>
          Save
        </Button>
        <Button onClick={() => onHide(!show)}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

const Tpaprogramingridients = () => {
  const { tpaId } = useParams<IParamTypes>();
  const history = useHistory();
  const { tpaStore, programIngredientStore } = useStore();
  const { programIngredientsList } = programIngredientStore;
  const { TpaProgramsDisplayList, createTpaProgram, singleTpa } = tpaStore;
  const [modalShow, setModalShow] = useState(false);
  const [emodalShow, setEModalShow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [useDefaultFee, setUseDefaultFee] = useState(true);
  const [tpa, setTpa] = useState({ name: "" });
  const [addTpa, setAddTpa] = useState(EmptyProgram);
  const [addExistingTpa, setAddExistingTpa] = useState(
    EmptyProgramForExistingAdd
  );

  const [field, setField] = useState("ALL");

  const [Active, setActive] = useState(false);

  const saveNewTpaProgram = async () => {
    let data = {
      ...addTpa,
      default_fee: useDefaultFee ? null : addTpa.default_fee,
    };
    const res = await createTpaProgram(tpaId, data);
    if (res) setModalShow(false);
  };
  const saveExistingTpaProgram = async () => {
    let data = {
      ...addExistingTpa,
      default_fee: useDefaultFee ? null : addExistingTpa.default_fee,
    };
    const res = await createTpaProgram(tpaId, data);
    if (res) setEModalShow(false);
  };

  return (
    <Fragment>
      <Container>
        <MainContent>
          <Row>
            <Col md={6} xs={12}>
              <Head>{singleTpa?.name} Program Ingredient</Head>
            </Col>
          </Row>
          <Action />
        </MainContent>
        <ButtonSheetLayout>
          <Dropdown
            direction="down"
            isOpen={openDropdown}
            toggle={() => {
              setOpenDropdown(!openDropdown);
            }}
          >
            <EditButton2
              onClick={() => {
                setActive(!Active);
              }}
            >
              +
            </EditButton2>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Add New
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  setEModalShow(true);
                }}
              >
                Add Existing
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <MyModal
            show={modalShow}
            tpa={addTpa}
            onSave={saveNewTpaProgram}
            setAddTpa={setAddTpa}
            onHide={setModalShow}
            fee={useDefaultFee}
            setFee={setUseDefaultFee}
          />
          <MyEModal
            show={emodalShow}
            onHide={setEModalShow}
            onSave={saveExistingTpaProgram}
            addTpa={addExistingTpa}
            setAddExisting={setAddExistingTpa}
            fee={useDefaultFee}
            setFee={setUseDefaultFee}
          />
        </ButtonSheetLayout>
        {Array.isArray(TpaProgramsDisplayList) &&
          TpaProgramsDisplayList.map((item) => {
            return (
              <ListSheetLayout
                style={{
                  marginBottom: "5rem",
                  width: "inherit",
                }}
              >
                <Row
                  style={{
                    marginBottom: "-14px",
                  }}
                >
                  <Col md={6} xs={6}>
                    <SubHead
                      style={{
                        marginTop: "10px",
                        fontSize: "18px",
                        lineHeight: "18px",
                        color: "#9797a7",
                      }}
                    >
                      {item.name}
                    </SubHead>
                  </Col>
                  <Col md={2} xs={6}>
                    <LButton>
                      <AddLabel>Uses Default Fee</AddLabel>
                    </LButton>
                  </Col>

                  <Col md={4} xs={2}>
                    <EditButton
                      iconName="black_pencil.png"
                      size={24}
                      onClick={() =>
                        history.push(
                          routes.dashboard.god.tpa.editTpaProgramIngredients.getValue(
                            tpaId,
                            item.id
                          )
                        )
                      }
                    />
                  </Col>
                </Row>

                <Row style={{ borderBottom: "1px solid #e0e0e0" }}>
                  <Col md={6} xs={6}>
                    <SubHead>
                      {`${titleCase(item?.type)} - ${titleCase(
                        item?.network_ingredient_sub_type
                      )}`}{" "}
                    </SubHead>
                  </Col>
                  <Col md={2} xs={6}>
                    <SubHead>
                      ${" "}
                      {`${
                        programIngredientsList?.find(
                          (val) => val?.id === item?.network_ingredient_id
                        )?.default_fee
                          ? programIngredientsList?.find(
                              (val) => val?.id === item?.network_ingredient_id
                            ).default_fee?.amount
                          : item?.default_fee?.amount
                      }`}
                    </SubHead>
                  </Col>
                </Row>
                {item?.description && (
                  <Row>
                    <Col md={10} xs={12}>
                      <p style={{ fontSize: "12px", padding: "2% 0px" }}>
                        {item.description}
                      </p>
                    </Col>
                  </Row>
                )}
              </ListSheetLayout>
            );
          })}
      </Container>
    </Fragment>
  );
};

export default observer(Tpaprogramingridients);
