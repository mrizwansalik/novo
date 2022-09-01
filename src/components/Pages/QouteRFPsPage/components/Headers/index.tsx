import { observer } from "mobx-react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { getTabs } from "src/components/Pages/ProspectDashboard/components/Header/utils";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import {
  AddButton,
  ActionSheetContainer,
  AddLabel,
  ActionSheetLayout,
  BrokerageCount,
  TabItem,
  AddIcon,
} from "./style";
const Headers = ({ display, setDisplay }) => {
  const { brokerageId, prospectId } = useParams<IParamTypes>();
  const { pathname } = useLocation();
  const history = useHistory();
  const tabs = getTabs(true, brokerageId, prospectId);

  return (
    <ActionSheetContainer>
      <ActionSheetLayout md={12}>
        <BrokerageCount>
          {tabs.map((tab) => {
            return (
              <TabItem
                to={tab.route}
                key={tab.keyword}
                isActive={tab.keyword === "rfps" ? true : false}
              >
                {tab.label}
              </TabItem>
            );
          })}
        </BrokerageCount>
        {
          <AddIcon
            onClick={() => setDisplay(!display)}
            iconName={display ? "rfp-documents-blue.png" : "rfp-documents.png"}
            size={24}
          />
        }
        <AddButton>
          <AddLabel
            onClick={() =>
              history.push(
                routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps.proposalRequest.getValue(
                  brokerageId,
                  prospectId
                )
              )
            }
          >
            Create Request
          </AddLabel>
        </AddButton>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(Headers);
