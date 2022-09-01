import React, { useState } from "react";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

export interface ITabsProps {
  headers: string[];
  contents: React.ReactNode[];
}

const Tabs = (props: ITabsProps) => {
  const { headers, contents } = props;
  const [activeTab, setActiveTab] = useState<number>(1);

  function toggle(tab: number): void {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  return (
    <div>
      <Nav tabs>
        {Array.isArray(headers) &&
          headers.map((header: string, index: number) => (
            <NavItem key={index}>
              <NavLink
                className={classnames({ active: activeTab === index })}
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
    </div>
  );
};

export default Tabs;
