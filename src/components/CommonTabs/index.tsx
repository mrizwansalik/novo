import React, { useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import { Container, NavItem, NavLink, Nav } from "./commonTabs.styles";

export interface ICommonTabsProps {
  headers: string[];
  contents: React.ReactNode[];
}

const CommonTabs = (props: ICommonTabsProps) => {
  const { headers, contents } = props;
  const [activeTab, setActiveTab] = useState<number>(0);

  function toggle(tab: number): void {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  return (
    <Container>
      <Nav tabs>
        {Array.isArray(headers) &&
          headers.map((header: string, index: number) => (
            <NavItem active={activeTab === index} key={index}>
              <NavLink
                onClick={() => {
                  toggle(index);
                }}
              >
                {header}
              </NavLink>
            </NavItem>
          ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {Array.isArray(contents) &&
          contents.map((content: React.ReactNode, index: number) => (
            <TabPane key={index} tabId={index}>
              {content}
            </TabPane>
          ))}
      </TabContent>
    </Container>
  );
};

export default CommonTabs;
