import React, { useState, useEffect } from "react";
import useStore from "src/utils/useStore";
import { observer } from "mobx-react";
import Actions from "./component/ActionSheet";
import Expense from "./component/Expenses";
import Participant from "./component/Participants";
import PlanDesign from "./component/PlanDesign";
import StopLoss from "./component/StopLoss";
import Vendor from "./component/Vendors";
import { EmptyAdvisor, EmptyStopLoss } from "./component/EmptyStates";
import {
  ProgramDetailContainer,
  SubHeaderContainer,
  MainContainer,
  TabItem,
  TabsContainer,
} from "./style";

const ProgramDetail = () => {
  const { illustrativeStore } = useStore();
  const { illustrative } = illustrativeStore;
  const [tabItem, setTabItem] = useState("stoploss");
  const [stopLoss, setStopLoss] = useState(EmptyStopLoss);
  const [advisor, setAdvisor] = useState(EmptyAdvisor);
  useEffect(() => {
    setAdvisor(
      illustrative?.versions &&
        illustrative?.versions[0]?.fees?.find(
          (item) => item?.name === "Advisor Fee"
        )
    );
  }, []);
  console.log("advisor", advisor);
  return (
    <ProgramDetailContainer>
      <Actions />
      <TabsContainer>
        <TabItem
          isActive={tabItem === "stoploss" ? true : false}
          onClick={() => setTabItem("stoploss")}
        >
          Stop Loss
        </TabItem>
        <TabItem
          isActive={tabItem === "plan" ? true : false}
          onClick={() => setTabItem("plan")}
        >
          Plan Desing
        </TabItem>
        <TabItem
          isActive={tabItem === "expense" ? true : false}
          onClick={() => setTabItem("expense")}
        >
          Expenses
        </TabItem>
        <TabItem
          isActive={tabItem === "participant" ? true : false}
          onClick={() => setTabItem("participant")}
        >
          Participats
        </TabItem>
        <TabItem
          isActive={tabItem === "vendor" ? true : false}
          onClick={() => setTabItem("vendor")}
        >
          Vendors
        </TabItem>
        <TabItem isActive={false} onClick={() => setTabItem("vendor")}>
          {/* <Icon iconName={"trash-grey.png"} /> */}
          add new Item
        </TabItem>
      </TabsContainer>
      {/* <Headers /> */}
      <MainContainer>
        {tabItem === "stoploss" && (
          <SubHeaderContainer>
            <StopLoss />
          </SubHeaderContainer>
        )}
        {tabItem === "plan" && (
          <SubHeaderContainer>
            <PlanDesign />
          </SubHeaderContainer>
        )}
        {tabItem === "expense" && (
          <SubHeaderContainer>
            <Expense advisor={advisor} setAdvisor={setAdvisor} />
          </SubHeaderContainer>
        )}
        {tabItem === "participant" && (
          <SubHeaderContainer>
            <Participant />
          </SubHeaderContainer>
        )}
        {tabItem === "vendor" && (
          <SubHeaderContainer>
            <Vendor />
          </SubHeaderContainer>
        )}
      </MainContainer>
    </ProgramDetailContainer>
  );
};

export default observer(ProgramDetail);
