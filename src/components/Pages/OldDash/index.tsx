import React from "react";
import { observer } from "mobx-react";
import { TabItem } from "../ProgramEditPage/style";
import { StyledContainer, TabAction, TabsContainer, Search } from "./styles";

const OldDashboard = () => {
  return (
    <StyledContainer>
      <TabAction>
        <TabsContainer>
          <>
            <TabItem>Illustrative Qoutes</TabItem>
            <TabItem>Underwriten Qoutes</TabItem>
          </>
          <TabItem>
            <Search />
          </TabItem>
        </TabsContainer>
      </TabAction>
    </StyledContainer>
  );
};

export default observer(OldDashboard);
