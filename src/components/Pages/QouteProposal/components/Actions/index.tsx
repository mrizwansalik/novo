import React from "react";
import { observer } from "mobx-react";
import {
  ActionSheetContainer,
  ActionSheetLayout,
  BrokerageCount,
  Header,
} from "./style";
const ActionSheet = () => {
  return (
    <ActionSheetContainer>
      <ActionSheetLayout md={12}>
        <BrokerageCount>
          <Header>Request for Proposal</Header>
        </BrokerageCount>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(ActionSheet);
