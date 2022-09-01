import { Tooltip } from "reactstrap";
import styled from "styled-components";

export const Container = styled.div``;

export const TooltipContainer = styled(Tooltip)`
  [class*="show bs-tooltip-auto"] {
    top: -10px !important;
    left: 0px !important;
    background-color: #ffffff;
    opacity: 1;
    min-width: 100px;

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

export const TooltipContent = styled.div``;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const OptionLabel = styled.div`
  cursor: pointer;
  color: #212135;
  font-size: 14px;
  line-height: 16px;
  padding: 10px 15px 10px 15px;
  margin: 0;
  font-weight: 500;
  z-index: 1;
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px dotted #c8c8c8;
  }

  &:hover {
    background-color: #def5fc;
  }
`;
