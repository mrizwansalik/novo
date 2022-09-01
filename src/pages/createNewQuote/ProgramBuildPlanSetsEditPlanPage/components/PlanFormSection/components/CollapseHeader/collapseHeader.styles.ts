import Switch from "react-switch";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
`;

export const SwitchSection = styled(ColNoSpacing)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const SwitchWrapper = styled(Switch)<{ checked: boolean }>`
  border: 1px solid ${ThemeColor.BORDER_COLOR} !important;

  [class*="react-switch-handle"] {
    background-color: ${(props) =>
      !props?.checked
        ? ThemeColor.AZURE_RADIANCE
        : ThemeColor.BORDER_COLOR} !important;
  }
`;

export const SwitchLabel = styled.span`
  color: #a6a6a6;
  padding-left: 8px;
  font-size: 16px;
  line-height: 26px;
  font-weight: 500;
`;

export const CategorySection = styled(ColNoSpacing)``;

export const CategoryWrapper = styled(RowNoSpacing)`
  &:first-child {
    ${breakpoints("padding-left", [
      {
        xl: "20px",
      },
      {
        lg: "0px",
      },
      {
        md: "0px",
      },
      {
        sm: "0px",
      },
      {
        xs: "0px",
      },
    ])}
  }
`;

export const CategoryLabel = styled(ColNoSpacing)`
  color: #a6a6a6;
  font-size: 16px;
  font-weight: 500;
`;
