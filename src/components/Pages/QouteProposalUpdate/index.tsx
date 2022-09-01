import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router-dom";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import Headers from "./components/Headers";
import Laser from "./components/Tabs/Laser";
import Proposal from "./components/Tabs/Proposals";
import { DownloadButton } from "./components/Tabs/Proposals/style";
import Rates from "./components/Tabs/Rates";
import Update from "./components/Tabs/Update";
import { TabsContainer, TabItem, MainContainer } from "./style";
const QouteRFPsList = () => {
  const { brokerageId, prospectId, rfpId } = useParams<IParamTypes>();
  const history = useHistory();
  const { qouteRFPsStore } = useStore();
  const {
    getQouteLasers,
    getQouteMessages,
    getQouteProposals,
    getQouteRates,
    deleteQouteRfp,
    getBroker,
    qouteRFPList,
  } = qouteRFPsStore;
  const [tabItem, setTabItem] = useState("update");
  useEffect(() => {
    qouteRFPList(prospectId);
    getQouteLasers(prospectId, rfpId);
    getQouteMessages(prospectId, rfpId);
    getQouteProposals(prospectId, rfpId);
    getQouteRates(prospectId, rfpId);
    getBroker(brokerageId);
  }, []);
  const handleDelete = () => {
    deleteQouteRfp(prospectId, rfpId);
    history.push(
      routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps.rfpList.getValue(
        brokerageId,
        prospectId
      )
    );
  };
  return (
    <>
      <Headers />
      <MainContainer>
        <TabsContainer>
          <TabItem
            isActive={tabItem === "update" ? true : false}
            onClick={() => setTabItem("update")}
          >
            Updates
          </TabItem>
          <TabItem
            isActive={tabItem === "proposal" ? true : false}
            onClick={() => setTabItem("proposal")}
          >
            Proposal
          </TabItem>
          <TabItem
            isActive={tabItem === "rate" ? true : false}
            onClick={() => setTabItem("rate")}
          >
            Rates
          </TabItem>
          <TabItem
            isActive={tabItem === "laser" ? true : false}
            onClick={() => setTabItem("laser")}
          >
            Lasers
          </TabItem>
        </TabsContainer>
        <DownloadButton
          css={"margin-top:1%"}
          iconName="trash-grey.png"
          size={24}
          onClick={() => handleDelete()}
        />
      </MainContainer>

      {tabItem === "update" && <Update />}
      {tabItem === "laser" && <Laser />}
      {tabItem === "proposal" && <Proposal />}
      {tabItem === "rate" && <Rates />}
    </>
  );
};

export default observer(QouteRFPsList);
