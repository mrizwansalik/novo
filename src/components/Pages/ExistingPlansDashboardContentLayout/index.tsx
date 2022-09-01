import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { IParamTypes } from "src/types";
import {
  ContentContainer,
  TabItem,
  TabsContainer,
  Title,
} from "./dashboardContentLayout.style";
import { getTabs } from "./utils";

interface IDashboardContentLayoutProps {
  children?: React.ReactChild;
  isSelfFunded?: boolean;
}

const DashboardContentLayout = (props: IDashboardContentLayoutProps) => {
  const { children } = props;

  const history = useHistory();
  const { pathname } = useLocation();
  const { brokerageId, prospectId, planId = "" } = useParams<IParamTypes>();

  const isSelfFunded = pathname.includes("self-funded");

  const tabs = getTabs(isSelfFunded, brokerageId, prospectId, planId);

  function getActiveStatus(keyword: string): boolean {
    if (pathname.includes(keyword)) {
      return true;
    }
    return false;
  }

  function onChangePlanType() {
    if (pathname.includes("fully-insured")) {
      const newPath = pathname.replace("fully-insured", "self-funded");
      history.push(newPath);
    }
    // TODO: confirm this logic later
    if (pathname.includes("self-funded")) {
      const newPath = pathname.replace("self-funded", "fully-insured");
      history.push(newPath);
    }
  }

  return (
    <div>
      <Title>
        <h1>{isSelfFunded ? "Self Funded" : "Fully Insured"}</h1>
        <a onClick={onChangePlanType}>
          {isSelfFunded ? "(Fully Insured instead)" : "(Self Funded instead)"}
        </a>
      </Title>
      <TabsContainer>
        {tabs.map((tab) => {
          return (
            <TabItem
              to={tab.route}
              key={tab.route}
              isActive={getActiveStatus(tab.keyword)}
            >
              {tab.label}
            </TabItem>
          );
        })}
      </TabsContainer>
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
};
export default DashboardContentLayout;
