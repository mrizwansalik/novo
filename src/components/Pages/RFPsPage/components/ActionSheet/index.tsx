import React from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import routes from "../../../../../routes/index";
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
  const { brokerageListStore } = useStore();
  const history = useHistory();
  const numberOfBrokerage = brokerageListStore.brokerageDisplayList.length;

  return (
    <ActionSheetContainer>
      <ActionSheetLayout md={12}>
        <BrokerageCount>
          <b>{numberOfBrokerage}</b>{" "}
          {numberOfBrokerage > 1 ? `brokerages` : `brokerage`}
        </BrokerageCount>
        <AddButton
          onClick={() =>
            history.push(routes.dashboard.god.brokerages.add.value)
          }
        >
          <AddIcon iconName="plus64px-blue.png" />
          <AddLabel>Add</AddLabel>
        </AddButton>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(ActionSheet);
