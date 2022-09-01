import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { Col, Row, Input } from "reactstrap";
import ConfirmModal from "src/components/ConfirmModal";
import {
  AggregateAttachPoint,
  SpecificDeductable,
  ContractType,
} from "src/constants";
import { StyledLabel as LabelStyle } from "src/pages/ProgramIngredientsListPage/EditProgramIngredientsPage/styles";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { IconWraper } from "../Laser/style";
import RatesTable from "./ratsesTbale";
import Sidecard from "./sidecard";
import {
  Container,
  OptionContainer,
  PlusIcon,
  OptionItemLabel,
  OptionContent,
  StyledModal,
  CloseIcon,
  StyledModalHeader,
  ModalTitle,
  SaveButton,
  StyledTextInput,
  StyledDropdownInput,
  StyledLabel,
  Template,
  TableTemplate,
  TableTitle,
  Data,
  ActionButton,
} from "./style";

const Rates = () => {
  const { prospectId, rfpId } = useParams<IParamTypes>();
  const { qouteRFPsStore } = useStore();
  const {
    getQouteRates,
    addQouteRates,
    deleteQouteRates,
    updateQouteRates,
    qouteRates,
  } = qouteRFPsStore;
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [rateId, setRateId] = useState("");
  const [rates, setRates] = useState(EmptyRate);
  const [editRate, setEditRate] = useState(EmptyRate);
  const [agg_spec, setAggSpec] = useState(true);

  const toggle = () => {
    setOpenModal(!openModal);
  };

  const handleSave = async () => {
    if (rates?.id) {
      const res = await updateQouteRates(prospectId, rfpId, rates.id, rates);
      if (res) {
        setOpenModal(false);
        setRates(EmptyRate);
        getQouteRates(prospectId, rfpId);
        return;
      }
    }
    const res = await addQouteRates(prospectId, rfpId, rates);
    if (res) {
      setOpenModal(false);
      getQouteRates(prospectId, rfpId);
    }
  };
  const handleDelete = async () => {
    await deleteQouteRates(prospectId, rfpId, rateId);
    setIsConfirmModal(false);
    await getQouteRates(prospectId, rfpId);
  };

  useEffect(() => {
    if (qouteRates.length > 0) {
      setEditRate(qouteRates[0] || EmptyRate);
    }
  }, [qouteRates]);
  return (
    <>
      <Container>
        <h6>Stop Loss Options</h6>
        <OptionContainer>
          {Array.isArray(qouteRates) && qouteRates.length < 1 && (
            <OptionContent onClick={() => setOpenModal(true)}>
              <PlusIcon iconName="plusCircleBlue.png" size={48} />
              <OptionItemLabel>Add New Option</OptionItemLabel>
            </OptionContent>
          )}
          {Array.isArray(qouteRates) &&
            qouteRates.length > 0 &&
            qouteRates.map((item) => {
              return (
                <OptionContent>
                  <PlusIcon iconName="stop_loss_option_active.png" size={36} />
                  <OptionItemLabel>{item.name}</OptionItemLabel>
                  <LabelStyle>${item.specific_deductible}</LabelStyle>
                  <LabelStyle>{`${Math.round(
                    item?.aggregate_attachment_percent * 100
                  ).toFixed(0)}% ${item.contract_length_agg}`}</LabelStyle>
                  <ActionButton>
                    <IconWraper
                      iconName="trash-grey.png"
                      size={24}
                      onClick={() => {
                        setIsConfirmModal(true);
                        setRateId(item.id);
                      }}
                    ></IconWraper>
                    <IconWraper
                      iconName="black_pencil.png"
                      size={24}
                      onClick={() => {
                        setRates(item);
                        setOpenModal(true);
                      }}
                    ></IconWraper>
                  </ActionButton>
                </OptionContent>
              );
            })}
        </OptionContainer>
      </Container>

      {Array.isArray(qouteRates) && qouteRates.length > 0 && (
        <Template>
          <Sidecard rate={editRate} />

          <div>
            <TableTemplate>
              <TableTitle>Choose Program</TableTitle>
            </TableTemplate>

            <div>
              <TableTitle>Input Rates</TableTitle>
            </div>
            <RatesTable rate={editRate} setEditRate={setEditRate} />
          </div>
        </Template>
      )}

      <StyledModal isOpen={openModal} toggle={toggle}>
        <CloseIcon iconName="cross-blue.png" size={10} onClick={toggle} />
        <StyledModalHeader>
          <ModalTitle>Add Option</ModalTitle>
          <SaveButton size={"lg"} label={"Save"} onClick={() => handleSave()} />
        </StyledModalHeader>
        <StyledTextInput
          label={"Name"}
          value={rates.name}
          onChange={(e) => {
            setRates({
              ...rates,
              name: e.target.value,
            });
          }}
        />
        <StyledLabel>Spec Dedutible</StyledLabel>
        <StyledDropdownInput
          options={SpecificDeductable}
          value={SpecificDeductable.find(
            (item) => item.value === rates.specific_deductible
          )}
          onChange={(e) => {
            setRates({
              ...rates,
              specific_deductible: e.value,
            });
          }}
          placeholder=""
        />
        <StyledLabel>Agg Attach Point</StyledLabel>
        <StyledDropdownInput
          options={AggregateAttachPoint}
          value={AggregateAttachPoint.find(
            (item) => item.value === rates.aggregate_attachment_percent
          )}
          onChange={(e) => {
            setRates({
              ...rates,
              aggregate_attachment_percent: e.value,
            });
          }}
          placeholder=""
        />
        <Row>
          <Col sm={12} md={6}>
            <StyledLabel>Spec Contarct Lenght</StyledLabel>
            <StyledDropdownInput
              options={ContractType}
              value={ContractType.find(
                (item) => item.value === rates.contract_length_spec
              )}
              onChange={(e) => {
                setRates({
                  ...rates,
                  contract_length_spec: e.value,
                });
              }}
              placeholder=""
            />
          </Col>
          <Col sm={12} md={6}>
            <StyledLabel>Agg Contarct Lenght</StyledLabel>
            <StyledDropdownInput
              options={ContractType}
              value={ContractType.find(
                (item) => item.value === rates.contract_length_agg
              )}
              onChange={(e) => {
                setRates({
                  ...rates,
                  contract_length_agg: e.value,
                });
              }}
              placeholder=""
            />
          </Col>
        </Row>
        <StyledLabel>TLO</StyledLabel>
        <Row>
          <Col>
            <StyledLabel> Agg TLO</StyledLabel>

            <Data>
              <Input
                type="radio"
                onClick={() => {
                  setRates({
                    ...rates,
                    aggregate_tlo: true,
                  });
                }}
                checked={rates.aggregate_tlo === true ? true : false}
              />
              Yes
              <Input
                type="radio"
                onClick={() => {
                  setRates({
                    ...rates,
                    aggregate_tlo: false,
                  });
                }}
                checked={rates.aggregate_tlo === false ? true : false}
              />
              No
            </Data>
          </Col>
          <Col>
            <StyledLabel>Spec TLO</StyledLabel>

            <Data>
              <Input
                type="radio"
                onClick={() => {
                  setRates({
                    ...rates,
                    specific_tlo: true,
                  });
                }}
                checked={rates.specific_tlo === true ? true : false}
              />
              Yes
              <Input
                type="radio"
                onClick={() => {
                  setRates({
                    ...rates,
                    specific_tlo: false,
                  });
                }}
                checked={rates.specific_tlo === false ? true : false}
              />
              No
            </Data>
          </Col>
        </Row>
        <StyledLabel>Funding Options</StyledLabel>
        <Row>
          <Col>
            <StyledLabel>Aggregating Specific </StyledLabel>

            <Data style={{ marginLeft: "6px" }}>
              <Input
                type="radio"
                onClick={() => {
                  setAggSpec(false);
                }}
                checked={agg_spec === false ? true : false}
              />
              Yes
              <Input
                type="radio"
                onClick={() => {
                  setAggSpec(true);
                }}
                checked={agg_spec === true ? true : false}
              />
              No
            </Data>
          </Col>
          <Col>
            <StyledLabel>Aggregate Accomodation</StyledLabel>

            <Data>
              <Input
                type="radio"
                onClick={() => {
                  setRates({
                    ...rates,
                    has_agg_accommodation: true,
                  });
                }}
                checked={rates.has_agg_accommodation === true ? true : false}
              />
              Yes
              <Input
                type="radio"
                onClick={() => {
                  setRates({
                    ...rates,
                    has_agg_accommodation: false,
                  });
                }}
                checked={rates.has_agg_accommodation === false ? true : false}
              />
              No
            </Data>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={6}>
            <StyledTextInput
              disabled={agg_spec}
              value={rates.aggregating_specific_deductible}
              type="number"
              onChange={(e) => {
                setRates({
                  ...rates,
                  aggregating_specific_deductible: e.target.value,
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <StyledLabel>Specific Advance</StyledLabel>

            <Data>
              <Input
                type="radio"
                onClick={() => {
                  setRates({
                    ...rates,
                    has_advanced_specific_funding: true,
                  });
                }}
                checked={
                  rates.has_advanced_specific_funding === true ? true : false
                }
              />
              Yes
              <Input
                type="radio"
                onClick={() => {
                  setRates({
                    ...rates,
                    has_advanced_specific_funding: false,
                  });
                }}
                checked={
                  rates.has_advanced_specific_funding === false ? true : false
                }
              />
              No
            </Data>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={10}>
            <StyledLabel>Notes</StyledLabel>

            <Input
              type="textarea"
              name="text"
              id="exampleText"
              value={rates.notes}
              onChange={(e) => {
                setRates({
                  ...rates,
                  notes: e.target.value,
                });
              }}
            />
          </Col>
        </Row>
      </StyledModal>
      <ConfirmModal
        toggle={() => setIsConfirmModal(!isConfirmModal)}
        isOpen={isConfirmModal}
        title="Are you sure you want to remove this Rate ?"
        acceptText="Yes, remove it"
        rejectText="No, keep it"
        acceptCallback={handleDelete}
        rejectCallback={() => setIsConfirmModal(false)}
      />
    </>
  );
};

const EmptyRate = {
  id: "",
  spec_premium: [0, 0, 0, 0],
  agg_premium: [0, 0, 0, 0],
  spec_tlo: [0, 0, 0, 0],
  agg_tlo: [0, 0, 0, 0],
  agg_accommodation: [0, 0, 0, 0],
  max_claims: [0, 0, 0, 0],
  contract_length_spec: "",
  contract_length_agg: "",
  specific_deductible: 0,
  aggregate_attachment_percent: 0,
  aggregating_specific_deductible: 0,
  specific_tlo: false,
  aggregate_tlo: false,
  has_agg_accommodation: false,
  has_advanced_specific_funding: false,
  notes: "",
  org_plans: [],
  name: "Option 1",
};

export default observer(Rates);
