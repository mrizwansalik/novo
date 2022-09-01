import React from "react";
import { observer } from "mobx-react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { getTabs } from "src/components/Pages/ProspectDashboard/components/Header/utils";
import { IParamTypes } from "src/types";
import {
  ActionSheetContainer,
  ActionSheetLayout,
  BrokerageCount,
  Header,
} from "./style";
const Headers = () => {
  const { brokerageId, prospectId } = useParams<IParamTypes>();
  const { pathname } = useLocation();
  const history = useHistory();
  const tabs = getTabs(true, brokerageId, prospectId);
  function getActiveStatus(keyword: string): boolean {
    if (pathname.includes(keyword)) {
      return true;
    }
    return false;
  }
  return (
    <ActionSheetContainer>
      <ActionSheetLayout md={12}>
        <BrokerageCount>
          <Header>RFP Template</Header>
        </BrokerageCount>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(Headers);
