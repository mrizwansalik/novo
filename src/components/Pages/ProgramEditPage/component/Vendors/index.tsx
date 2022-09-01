import React, { useState } from "react";
import VenderCartd from "./components/VenderCard";
import {
  StopLossContainer,
  StopLossItem,
  StopLossMenu,
  StopLossItemHeading,
} from "./style";

const Plans = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuItemHead, setMenuItemHead] = useState("provider");

  const subnet = {};

  return (
    <StopLossContainer>
      <StopLossItemHeading>
        <StopLossItem md={3} style={{ borderRight: "1px solid #cbcbcb" }}>
          <StopLossMenu
            isActive={menuItemHead === "provider" ? true : false}
            onClick={() => setMenuItemHead("provider")}
          >
            Provider Access
          </StopLossMenu>
          <StopLossMenu
            isActive={menuItemHead === "pharmacy" ? true : false}
            onClick={() => setMenuItemHead("pharmacy")}
          >
            Pharmacy Benefit Manager
          </StopLossMenu>
          <StopLossMenu
            isActive={menuItemHead === "solutions" ? true : false}
            onClick={() => setMenuItemHead("solutions")}
          >
            Solution Partners
          </StopLossMenu>
        </StopLossItem>
        <StopLossItem md={9}>
          <StopLossItemHeading>
            <StopLossItem md={5}>
              <VenderCartd
                subNetwork={{}}
                isChecked={false}
                onClick={() => console.log("called")}
              />
            </StopLossItem>
          </StopLossItemHeading>
        </StopLossItem>
      </StopLossItemHeading>
    </StopLossContainer>
  );
};

export default Plans;
