import { Input, Tooltip } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  padding-top: 12px;
  padding-bottom: 12px;
  min-height: 65px;
`;

export const TitleContainer = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-top: 0px;
  }
`;

export const Checkbox = styled(Input)<{ disabled: boolean }>`
  width: 24px;
  height: 24px;

  &::checked {
    border-color: #0097f5 !important;
    background: #0097f5 url(/images/icons/tick64px-thick-white.png) no-repeat
      center center;
    background-size: 100%;
  }

  ${(props) =>
    props?.disabled &&
    `
    pointer-events: all;
    color: #a6a6a6 !important;
    border-color: #e3e9ec !important;
    background-color: #cbcbcb !important;
    cursor: not-allowed !important;
    `}
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 5px;
`;

export const TitleText = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
`;

export const WarningText = styled.div`
  font-size: 11px;
  color: grey;
`;

export const RequestSection = styled(ColNoSpacing)`
  padding-left: 20px;
`;

export const LabelWrapper = styled(RowNoSpacing)`
  display: flex;
  align-items: center;
  height: 100%;

  ${breakpoints("flex-direction", [
    {
      xl: "row",
    },
    {
      lg: "column",
    },
    {
      md: "column",
    },
    {
      sm: "column",
    },
    {
      xs: "column",
    },
  ])}

  & > div {
    ${breakpoints("margin-top", [
      {
        xl: "0px",
      },
      {
        lg: "8px",
      },
      {
        md: "8px",
      },
      {
        sm: "8px",
      },
      {
        xs: "8px",
      },
    ])}
  }
`;

export const ArrowSection = styled(ColNoSpacing)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const RequestLabel = styled(ColNoSpacing)`
  font-size: 18px;
  color: #4b565e;
  line-height: normal;
`;

export const TooltipContainer = styled(Tooltip)`
  [class*="show bs-tooltip-auto"] {
    top: 0 !important;
    left: -20px !important;
    background-color: #fef4f3;
    opacity: 1;

    &::after {
      content: " ";
      width: 12px;
      height: 12px;
      border: 1px solid #e84c3d;
      border-bottom: transparent;
      border-left: transparent;
      position: absolute;
      right: -6px;
      transform: rotate(45deg);
      top: 30px;
      background-color: #fef4f3;
    }
  }

  [class*="tooltip-inner"] {
    padding: 0px;

    border: 1px solid #e84c3d;
    background-color: #fef4f3;
    color: #e84c3d;
  }
`;

export const TooltipContent = styled.div`
  padding: 15px;
`;
