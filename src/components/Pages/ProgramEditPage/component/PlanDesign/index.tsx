import React, { useState } from "react";
import InputCheckbox from "src/components/InputCheckbox";
import InputRadio from "src/components/InputRadio";
import SingleSelect from "src/components/SingleSelect";
import {
  StopLossContainer,
  StopLossItem,
  StopLossMenu,
  StopLossMenuItem,
  StopLossMenuHeading,
  StopLossMenuRow,
  StopLossItemHeading,
  StyledLabel,
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
          <StopLossMenuHeading>
            Sections labelled with an * are classified as in-network
          </StopLossMenuHeading>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>
              <StyledLabel>Plan Name 2</StyledLabel>
            </StopLossMenuItem>
            <StopLossMenuItem md={4}>
              <StyledInput value="PPO 2000/80" />
            </StopLossMenuItem>
            <StopLossMenuItem md={4}>
              <InputCheckbox label="HSA Qualified" />
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>
              <StyledLabel>Co-insurance(in/out)</StyledLabel>
            </StopLossMenuItem>
            <StopLossMenuItem md={2}>
              <StyledInput value="80 %" />
            </StopLossMenuItem>
            <StopLossMenuItem md={1}></StopLossMenuItem>
            <StopLossMenuItem md={2}>
              <StyledInput value="60 %" />
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>
              <StyledLabel>Deductibles*</StyledLabel>
            </StopLossMenuItem>
            <StopLossMenuItem md={2}>
              <StyledInput value="$ 2000" />
              (individual)
            </StopLossMenuItem>
            <StopLossMenuItem md={1}></StopLossMenuItem>
            <StopLossMenuItem md={2}>
              <StyledInput value="$ 4000" />
              (family)
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>
              <StyledLabel>Out-of-Pocket*</StyledLabel>
            </StopLossMenuItem>
            <StopLossMenuItem md={2}>
              <StyledInput value="$ 4000" />
              (individual)
            </StopLossMenuItem>
            <StopLossMenuItem md={1}></StopLossMenuItem>
            <StopLossMenuItem md={2}>
              <StyledInput value="$ 8000" />
              (family)
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>
              <StyledLabel>Co-insurance/Co-pay*</StyledLabel>
            </StopLossMenuItem>
            <StopLossMenuItem md={3}>
              Primary Care Office Visit
              <InputRadio label="Co-insurance" />
              <StopLossItemHeading>
                <StopLossMenuItem>
                  <InputRadio label="Co-pay" />
                </StopLossMenuItem>
                <StopLossMenuItem>
                  <StyledInput value={"$ 25"} />
                </StopLossMenuItem>
              </StopLossItemHeading>
              Urgent Care Facility
              <InputRadio label="Co-insurance" />
              <StopLossItemHeading>
                <StopLossMenuItem>
                  <InputRadio label="Co-pay" />
                </StopLossMenuItem>
                <StopLossMenuItem>
                  <StyledInput value={"$ 25"} />
                </StopLossMenuItem>
              </StopLossItemHeading>
              Ambulatory Surgery Center
              <InputRadio label="Co-insurance" />
              <StopLossItemHeading>
                <StopLossMenuItem>
                  <InputRadio label="Co-pay" />
                </StopLossMenuItem>
              </StopLossItemHeading>
            </StopLossMenuItem>
            <StopLossMenuItem md={1}></StopLossMenuItem>
            <StopLossMenuItem md={3}>
              Specialist Office Visit
              <InputRadio label="Co-insurance" />
              <StopLossItemHeading>
                <StopLossMenuItem>
                  <InputRadio label="Co-pay" />
                </StopLossMenuItem>
                <StopLossMenuItem>
                  <StyledInput value={"$ 25"} />
                </StopLossMenuItem>
              </StopLossItemHeading>
              Emergency Room
              <InputRadio label="Co-insurance" />
              <StopLossItemHeading>
                <StopLossMenuItem>
                  <InputRadio label="Co-pay" />
                </StopLossMenuItem>
                <StopLossMenuItem>
                  <StyledInput value={"$ 25"} />
                </StopLossMenuItem>
              </StopLossItemHeading>
              Hospital
              <InputRadio label="Co-insurance" />
              <StopLossItemHeading>
                <StopLossMenuItem>
                  <InputRadio label="Co-pay" />
                </StopLossMenuItem>
              </StopLossItemHeading>
            </StopLossMenuItem>
          </StopLossMenuRow>
          <StopLossMenuRow>
            <StopLossMenuItem md={4}>
              <StyledLabel>Rx Co-pay (in network)</StyledLabel>
            </StopLossMenuItem>
            <StopLossMenuItem>
              <StopLossItemHeading>
                <SingleSelect />
              </StopLossItemHeading>
              <StopLossItemHeading>
                <StopLossMenuItem md={3}>
                  <StyledInput />
                </StopLossMenuItem>
                <StopLossMenuItem md={1}></StopLossMenuItem>
                <StopLossMenuItem md={3}>
                  <StyledInput />
                </StopLossMenuItem>
                <StopLossMenuItem md={1}></StopLossMenuItem>
                <StopLossMenuItem md={3}>
                  <StyledInput />
                </StopLossMenuItem>
              </StopLossItemHeading>
              <StopLossItemHeading>
                <StopLossMenuItem md={3}>
                  <StyledLabel>Generic</StyledLabel>
                </StopLossMenuItem>
                <StopLossMenuItem md={1}></StopLossMenuItem>
                <StopLossMenuItem md={3}>
                  <StyledLabel>Preferred</StyledLabel>
                </StopLossMenuItem>
                <StopLossMenuItem md={1}></StopLossMenuItem>
                <StopLossMenuItem md={3}>
                  <StyledLabel>Non-Preferred</StyledLabel>
                </StopLossMenuItem>
              </StopLossItemHeading>
              <StopLossItemHeading>
                <StopLossMenuItem>
                  <InputCheckbox label="Use separate Rx deductible" />
                </StopLossMenuItem>
              </StopLossItemHeading>
            </StopLossMenuItem>
          </StopLossMenuRow>
        </StopLossItem>
      </StopLossItemHeading>
    </StopLossContainer>
  );
};

export default Plans;
