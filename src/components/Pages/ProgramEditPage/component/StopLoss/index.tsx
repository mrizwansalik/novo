import React, { useState } from "react";
import InputCheckbox from "src/components/InputCheckbox";
import InputRadio from "src/components/InputRadio";
import SingleSelect from "src/components/SingleSelect";
import {
  StopLossContainer,
  StopLossItem,
  StopLossMenu,
  StopLossMenuItem,
  StopLossMenuRow,
  StopLossItemHeading,
  StyledInput,
} from "./style";

const Plans = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuItemHead, setMenuItemHead] = useState("rates");

  return (
    <StopLossContainer>
      <StopLossItemHeading>
        <StopLossItem md={3}>
          <StopLossMenu
            isActive={menuItemHead === "rates" ? true : false}
            onClick={() => setMenuItemHead("rates")}
          >
            <InputRadio label="Rates" value="rates" />
          </StopLossMenu>
        </StopLossItem>
        <StopLossItem md={9}>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>Name *</StopLossMenuItem>
            <StopLossMenuItem md={4}>
              <StyledInput value="$20k 12/15; 125%" />
            </StopLossMenuItem>
            <StopLossMenuItem md={4}>
              <InputCheckbox label="Generate Name From Variables" />
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>Specific Deductible *</StopLossMenuItem>
            <StopLossMenuItem md={5}>
              <SingleSelect />
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>Aggregate Attach Point *</StopLossMenuItem>
            <StopLossMenuItem md={5}>
              <SingleSelect />
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>Contract Type</StopLossMenuItem>
            <StopLossMenuItem md={5}>
              <SingleSelect />
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>Specific TLO</StopLossMenuItem>
            <StopLossMenuItem md={5}>
              <StopLossItemHeading>
                <StopLossMenuItem md={3}>
                  <InputRadio label="Yes" />
                </StopLossMenuItem>
                <StopLossMenuItem md={3}>
                  <InputRadio label="No" />
                </StopLossMenuItem>
              </StopLossItemHeading>
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>Aggregate TLO</StopLossMenuItem>
            <StopLossMenuItem md={5}>
              <StopLossItemHeading>
                <StopLossMenuItem md={3}>
                  <InputRadio label="Yes" />
                </StopLossMenuItem>
                <StopLossMenuItem md={3}>
                  <InputRadio label="No" />
                </StopLossMenuItem>
              </StopLossItemHeading>
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>Aggregating specific</StopLossMenuItem>
            <StopLossMenuItem md={5}>
              <StopLossItemHeading>
                <StopLossMenuItem md={3}>
                  <InputRadio label="Yes" />
                </StopLossMenuItem>
                <StopLossMenuItem md={3}>
                  <InputRadio label="No" />
                </StopLossMenuItem>
              </StopLossItemHeading>
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>Agg Accommodation</StopLossMenuItem>
            <StopLossMenuItem md={5}>
              <StopLossItemHeading>
                <StopLossMenuItem md={3}>
                  <InputRadio label="Yes" />
                </StopLossMenuItem>
                <StopLossMenuItem md={3}>
                  <InputRadio label="No" />
                </StopLossMenuItem>
              </StopLossItemHeading>
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>
              Aggregating Specific Deductible
            </StopLossMenuItem>
            <StopLossMenuItem md={5}>
              <StyledInput value="$ 0" />
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>
              Advanced Specific Funding
            </StopLossMenuItem>
            <StopLossMenuItem md={5}>
              <StopLossItemHeading>
                <StopLossMenuItem md={3}>
                  <InputRadio label="Yes" />
                </StopLossMenuItem>
                <StopLossMenuItem md={3}>
                  <InputRadio label="No" />
                </StopLossMenuItem>
              </StopLossItemHeading>
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>Notes</StopLossMenuItem>
            <StopLossMenuItem>
              <StyledInput placeholder="Notes" />
            </StopLossMenuItem>
          </StopLossMenuRow>
        </StopLossItem>
      </StopLossItemHeading>
    </StopLossContainer>
  );
};

export default Plans;
