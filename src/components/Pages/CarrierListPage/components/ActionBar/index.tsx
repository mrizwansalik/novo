import React from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import useStore from "../../../../../utils/useStore";
import {
  AddButton,
  ActionSheetContainer,
  AddIcon,
  AddLabel,
  ActionSheetLayout,
  CarrierCount,
  CarrierSearch,
  InputSearch,
} from "./style";
const ActionBar = ({ setOpenModal }) => {
  const { carrierListStore } = useStore();
  const history = useHistory();
  const numberOfCarrier = carrierListStore.carrierDisplayList.length;

  return (
    <ActionSheetContainer>
      <ActionSheetLayout md={12}>
        <CarrierCount>
          <b>{numberOfCarrier}</b>{" "}
          {numberOfCarrier > 1 ? `carriers` : `carrier`}
        </CarrierCount>
        <CarrierSearch>
          <InputSearch
            placeholder="Find Carriers..."
            onChange={(e) => carrierListStore.filterDisplayList(e.target.value)}
          />
        </CarrierSearch>
        <AddButton onClick={() => setOpenModal(true)}>
          <AddIcon iconName="plus64px-blue.png" />
          <AddLabel>Add New</AddLabel>
        </AddButton>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(ActionBar);
