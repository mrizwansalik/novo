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
  const { programId, prospectId } = useParams<IParamTypes>();
  const { illustrativeStore } = useStore();
  const { illustrative } = illustrativeStore;
  return (
    <ActionSheetContainer>
      <ActionSheetLayout>
        <CarrierCount>{illustrative?.name}</CarrierCount>
        <AddButton>
          <AddLabel
            onClick={() => {
              history.push(
                routes.dashboard.brokerage.prospects.prospectId.programDetail.getValue(
                  prospectId,
                  programId
                )
              );
            }}
          >
            Cancel
          </AddLabel>
        </AddButton>
        <AddButton>
          <AddLabel>Save</AddLabel>
        </AddButton>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default Headers;
