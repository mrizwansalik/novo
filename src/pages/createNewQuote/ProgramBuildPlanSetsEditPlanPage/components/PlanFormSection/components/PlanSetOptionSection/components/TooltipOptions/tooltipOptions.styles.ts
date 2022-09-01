import { Tooltip } from "reactstrap";
import Icon from "src/components/Icon";
import styled from "styled-components";

export const Container = styled.div``;

export const TooltipContainer = styled(Tooltip)`
  [class*="show bs-tooltip-auto"] {
    top: 8px !important;
    left: -20px !important;
    background-color: #ffffff;
    opacity: 1;
    min-width: 300px;

    &::after {
      content: " ";
      width: 12px;
      height: 12px;
      border: 1px solid #ffffff;
      border-bottom: transparent;
      border-left: transparent;
      position: absolute;
      right: 45%;
      top: -6px;
      transform: rotate(315deg);
      background-color: #ffffff;
    }
  }

  [class*="tooltip-inner"] {
    padding: 0px;
    max-width: initial;

    color: #212135;
    font-size: 14px;
    line-height: 16px;

    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 30%);
  }
`;

export const TooltipContent = styled.div`
  padding: 10px 15px;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const OptionTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const OptionLabel = styled.div`
  cursor: pointer;

  font-size: 18px;
  line-height: 27px;
  color: #212135;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const OptionValue = styled.div`
  cursor: pointer;

  font-size: 14px;
  line-height: 16px;
  margin-bottom: 10px;
`;

export const OptionIcon = styled(Icon)`
  opacity: 0.4;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;
