import { Fragment, useState } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router";
import { IStopLossClaims } from "src/interfaces/benefit";
import { ClaimsHistoryFormValues } from "src/pages/createNewQuote/HealthClaimsHistoryPage/constant";
import { validateNumber } from "src/utils/form";
import useStore from "src/utils/useStore";
import { OutlineButton } from "./claimForm.styles";
import ClaimInput from "./components/ClaimInput";
import {
  ClaimLabel,
  ClaimLimit,
  Container,
  Label,
  AddButton,
  Divider,
  SaveButton,
  InputGroup,
  CancelButton,
  CommonInput,
} from "./extraClaim.styles";
import {
  handleCancel,
  handleAdd,
  handleUpdate,
  handleCreateStopLossClaims,
  handleUpdateStopLossClaims,
  handleDeleteStopLossClaims,
} from "./utils";

const LIMIT_AMOUNT: number = 10000;

const ExtraClaim = () => {
  const [claimAmount, setClaimAmount] = useState<number>(0);
  const { control, setValue } = useFormContext();
  const [editMode, setEditMode] = useState<boolean>(false);
  const { createQuoteStore, benefitStore } = useStore();
  const { selectedYear } = createQuoteStore;
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");

  const { fields, append, remove } = useFieldArray({
    control,
    name: ClaimsHistoryFormValues.LARGE_CLAIM_AMOUNT,
  });

  return (
    <Container>
      <ClaimLabel md={{ size: 12 }}>Large Claims</ClaimLabel>
      <ClaimLimit md={{ size: 12 }}>Claims that exceed $10,000.</ClaimLimit>
      <OutlineButton label="Add New Claim" onClick={() => setEditMode(true)} />
      {editMode && (
        <Fragment>
          <Label md={{ size: 12 }}>Amount</Label>
          <InputGroup md={{ size: 4 }}>
            <CommonInput
              type="number"
              onChange={(event) => setClaimAmount(event.target.value)}
              onInput={validateNumber}
            />
            <AddButton
              disabled={Number(claimAmount) < LIMIT_AMOUNT}
              onClick={() => {
                handleCreateStopLossClaims(
                  benefitStore,
                  createQuoteStore,
                  prospectId,
                  claimAmount
                ).then((stopLossClaims) => {
                  handleAdd(
                    editMode,
                    setEditMode,
                    claimAmount,
                    stopLossClaims?.id,
                    append
                  );
                  setClaimAmount(0);
                });
              }}
              label="Add"
            />
            <CancelButton
              onClick={() => handleCancel(editMode, setEditMode)}
              label="Cancel"
            />
          </InputGroup>
        </Fragment>
      )}
      {Array.isArray(fields) &&
        fields.map((field: IStopLossClaims, index: number) => {
          return (
            <ClaimInput
              handleUpdate={(order: number, updateValue: number) => {
                handleUpdateStopLossClaims(
                  benefitStore,
                  createQuoteStore,
                  field.id,
                  prospectId,
                  updateValue
                );
                handleUpdate(
                  setValue,
                  fields as IStopLossClaims[],
                  order,
                  updateValue
                );
              }}
              value={get(field, "amount", 0)}
              stopLossClaimId={get(field, "id", "")}
              order={index}
              remove={async (order: number) => {
                await handleDeleteStopLossClaims(
                  benefitStore,
                  createQuoteStore,
                  field.id,
                  prospectId
                );
                remove(order);
              }}
              key={index}
            />
          );
        })}
      <Divider />
      <SaveButton type="submit" label={`Save ${selectedYear}'s Claims Data`} />
    </Container>
  );
};

export default observer(ExtraClaim);
