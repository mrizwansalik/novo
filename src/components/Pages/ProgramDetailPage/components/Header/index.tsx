import React from "react";
import { useHistory, useParams } from "react-router";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  ActionSheetContainer,
  ActionSheetLayout,
  AddButton,
  AddLabel,
  CarrierCount,
  Header,
} from "./style";

const Headers = () => {
  const history = useHistory();
  const { illustrativeStore } = useStore();
  const { illustrative } = illustrativeStore;
  const { prospectId, programId } = useParams<IParamTypes>();
  return (
    <ActionSheetContainer>
      <ActionSheetLayout>
        <CarrierCount>
          <Header>{illustrative.name}</Header>
        </CarrierCount>
        <AddButton
          onClick={() =>
            history.push(
              routes.dashboard.brokerage.prospects.prospectId.programEdit.getValue(
                prospectId,
                programId
              )
            )
          }
        >
          <AddLabel>Edit</AddLabel>
        </AddButton>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default Headers;
