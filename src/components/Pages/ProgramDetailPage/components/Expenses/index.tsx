import { useState } from "react";
import Icon from "src/components/Icon";
import useStore from "src/utils/useStore";
import { StyledLabel } from "../SubHeader/styles";
import {
  StopLossContainer,
  StopLossItem,
  StopLossMenu,
  StopLossMenuItem,
  StopLossMenuRow,
  StopLossItemHeading,
  ArrowSection,
} from "./style";

const Plans = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { illustrativeStore } = useStore();
  const [menuItemHead, setMenuItemHead] = useState("administrative");

  const { illustrative, expenses } = illustrativeStore;

  // let filters = [];
  // let obj = { label: "", value: "", sub_type: "" };
  // for (let i = 0; i <= item.length; i++) {
  //   obj.label = items[i]?.name;
  //   obj.value = items[i]?.id;
  //   obj.sub_type = items?.sub_type;

  //   filters.push(obj);
  //   obj = { label: "", value: "", sub_type: "" };
  // }
  let total = 0;
  let res = expenses.map((item) => {
    total += item.amount_number;
  });

  return (
    <StopLossContainer>
      <StopLossMenuRow style={{ borderLeft: "4px solid orange" }}>
        <StopLossMenuItem md={3}>
          <StyledLabel>Monthly Totals</StyledLabel>
        </StopLossMenuItem>
        <StopLossMenuItem md={2}>${total} EE(0)</StopLossMenuItem>
        <StopLossMenuItem md={2}>${total} ES(0)</StopLossMenuItem>
        <StopLossMenuItem md={2}>${total} EC(0)</StopLossMenuItem>
        <StopLossMenuItem md={2}>${total} EF(0)</StopLossMenuItem>
        <StopLossMenuItem md={1}>
          {" "}
          <ArrowSection
            xl="1"
            lg="12"
            md="12"
            sm="12"
            xs="12"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            <Icon
              iconName={
                isExpanded ? "upArrow32px-blue.png" : "downArrow32px-blue.png"
              }
            />
          </ArrowSection>
        </StopLossMenuItem>
      </StopLossMenuRow>
      {isExpanded && (
        <StopLossItemHeading>
          <StopLossItem md={3}>
            <StopLossMenu
              isActive={menuItemHead === "administrative" ? true : false}
              onClick={() => setMenuItemHead("administrative")}
            >
              Fees
            </StopLossMenu>
            {/* <StopLossMenu
              isActive={menuItemHead === "solution" ? true : false}
              onClick={() => setMenuItemHead("solution")}
            >
              Solution Partner Fees
            </StopLossMenu> */}
          </StopLossItem>
          <StopLossItem md={9}>
            <StopLossMenuRow>
              <StopLossMenuItem md={4}>
                <StyledLabel>
                  All fee amounts are PEPM (unless otherwise noted) and have
                  been included in the plan premiums.
                </StyledLabel>
              </StopLossMenuItem>
              <StopLossMenuItem md={2}>EE</StopLossMenuItem>
              <StopLossMenuItem md={2}>ES</StopLossMenuItem>
              <StopLossMenuItem md={2}>EC</StopLossMenuItem>
              <StopLossMenuItem md={2}>EF</StopLossMenuItem>
            </StopLossMenuRow>
            {menuItemHead === "administrative" && (
              <>
                {expenses.map((item) => (
                  <StopLossMenuRow>
                    <StopLossMenuItem md={4}>
                      <StyledLabel>{item?.name}</StyledLabel>
                    </StopLossMenuItem>
                    <StopLossMenuItem md={2}>
                      ${item?.amount_number}
                    </StopLossMenuItem>
                    <StopLossMenuItem md={2}>
                      ${item?.amount_number}
                    </StopLossMenuItem>
                    <StopLossMenuItem md={2}>
                      ${item?.amount_number}
                    </StopLossMenuItem>
                    <StopLossMenuItem md={2}>
                      ${item?.amount_number}
                    </StopLossMenuItem>
                  </StopLossMenuRow>
                ))}
              </>
            )}
            {/* {menuItemHead === "solution" && (
              <StopLossMenuRow>
                <StopLossMenuItem md={4}>
                  <StyledLabel>ScriptSourcing (Custom)</StyledLabel>
                </StopLossMenuItem>
                <StopLossMenuItem md={2}>$0</StopLossMenuItem>
                <StopLossMenuItem md={2}>$0</StopLossMenuItem>
                <StopLossMenuItem md={2}>$0</StopLossMenuItem>
                <StopLossMenuItem md={2}>$0</StopLossMenuItem>
              </StopLossMenuRow>
            )} */}
          </StopLossItem>
        </StopLossItemHeading>
      )}
      <StopLossMenuRow>
        * Totals may not include the addition of one-time or custom fees.
      </StopLossMenuRow>
    </StopLossContainer>
  );
};

export default Plans;
