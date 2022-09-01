import React, { useState } from "react";
import { Tooltip as BootstrapTooltip } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";
import Icon from "../Icon";

export type Placement =
  | "auto-start"
  | "auto"
  | "auto-end"
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "right"
  | "right-end"
  | "bottom-end"
  | "bottom"
  | "bottom-start"
  | "left-end"
  | "left"
  | "left-start";

export interface ITooltipProps {
  id: string;
  placement?: Placement;
  content?: string;
  children?: React.ReactElement;
  iconName?: string;
  iconSize?: number;
  trigger?: string | string[];
}

const StyledWrapper = styled.div`
  cursor: pointer;

  .tooltip-inner {
    background-color: transparent;
  }
`;

const StyledToolTip = styled(BootstrapTooltip)`
  .tooltip-inner {
    position: absolute;
    z-index: 3;
    left: -24px;
    top: 10px;
    padding: 24px;
    width: 275px;
    max-width: 275px !important;
    background: #ffffff;
    color: ${ThemeColor.STEEL_GRAY};
    text-align: left;
    border-radius: 2px;
    box-shadow: 0 0 8px 0 rgb(0 0 0 / 10%);
  }

  .show {
    opacity: 1;
  }
`;

const Tooltip = (props: ITooltipProps) => {
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  const {
    id,
    placement = "bottom-end",
    content = "",
    iconName = "info_bubble.png",
    iconSize = 24,
    trigger = "hover",
    children,
  } = props;

  return (
    <StyledWrapper>
      <Icon tooltipId={id} iconName={iconName} size={iconSize} />
      <StyledToolTip
        placement={placement}
        isOpen={isTooltipOpen}
        target={id}
        trigger={trigger}
        toggle={() => setTooltipOpen(!isTooltipOpen)}
        onClick={(e) => e.target.focus()}
        hideArrow
      >
        {content}
        {children}
      </StyledToolTip>
    </StyledWrapper>
  );
};
export default Tooltip;
