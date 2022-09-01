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
  BrokerageCount,
} from "./styles";
const ActionSheet = () => {
  const { carrierListStore, orgStore } = useStore();
  const history = useHistory();
  const numberOfcarriers = orgStore.orgDisplayList.length;

  return (
    <ActionSheetContainer>
      <ActionSheetLayout md={12}>
        <BrokerageCount>
          <b>{numberOfcarriers}</b>{" "}
          {numberOfcarriers > 1 ? `Organizations` : `Organization`}
        </BrokerageCount>
        <AddButton
        // onClick={() =>
        //   history.push(routes.dashboard.god.brokerages.add.value)
        // }
        >
          <AddIcon iconName="plus64px-blue.png" />
          <AddLabel>Add</AddLabel>
        </AddButton>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(ActionSheet);
