import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { TabPane } from "reactstrap";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import EmployeesTab from "./components/EmployeesTab";
import InfoContainer from "./components/InfoContainer";
import PHQsTab from "./components/PHQsTab";
import {
  StyledContainer,
  TabletDesktopTabContainer,
  TabItem,
  TabTitle,
  ContentContainer,
  PHQsContainer,
  StyledCol,
  MobileTabContainer,
} from "./styles";
const tabHeaders = ["Employees", "PHQs"];
const tabContent = [<EmployeesTab />, <PHQsTab />];
const PHQsPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { prospectId } = useParams<IParamTypes>();
  const history = useHistory();
  const { healthHistoryStore } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await healthHistoryStore.fetchWorkerData(prospectId);
      setIsLoading(false);
    })();
  }, [prospectId]);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <StyledContainer>
      {!isLoading && <InfoContainer />}
      {!isLoading && (
        <PHQsContainer>
          <TabletDesktopTabContainer tabs>
            {tabHeaders.map((item, index) => (
              <TabItem key={index}>
                <TabTitle
                  active={activeTab === index}
                  onClick={() => toggle(index)}
                >
                  {item}
                </TabTitle>
              </TabItem>
            ))}
          </TabletDesktopTabContainer>
          <MobileTabContainer tabs>
            {tabHeaders.map((item, index) => (
              <StyledCol>
                <TabItem key={index}>
                  <TabTitle
                    active={activeTab === index}
                    onClick={() => toggle(index)}
                  >
                    {item}
                  </TabTitle>
                </TabItem>
              </StyledCol>
            ))}
          </MobileTabContainer>
          <ContentContainer activeTab={activeTab}>
            {tabContent.map((item, index) => (
              <TabPane tabId={index} key={index}>
                {item}
              </TabPane>
            ))}
          </ContentContainer>
        </PHQsContainer>
      )}
    </StyledContainer>
  );
};

export default observer(PHQsPage);
