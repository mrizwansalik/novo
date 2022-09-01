import { Input, Tooltip } from "reactstrap";
import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled, { createGlobalStyle } from "styled-components";

export const Container = styled(ColNoSpacing)``;

export const CardLayout = styled(RowNoSpacing)`
  padding: 24px;
  border: 1px solid ${ThemeColor.SILVER};
`;

export const Title = styled(ColNoSpacing)`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 500;
  margin-bottom: 8px;
`;

export const LinkSection = styled(ColNoSpacing)`
  display: flex;

  ${breakpoints("flex-direction", [
    {
      xl: "row",
    },
    {
      lg: "row",
    },
    {
      md: "row",
    },
    {
      sm: "column",
    },
    {
      xs: "column",
    },
  ])}

  ${breakpoints("margin-bottom", [
    {
      xl: "24px",
    },
    {
      lg: "24px",
    },
    {
      md: "24px",
    },
    {
      sm: "8px",
    },
    {
      xs: "8px",
    },
  ])}
`;

export const InputLink = styled(Input)`
  border-color: transparent;
  border-bottom-color: ${ThemeColor.SILVER};
  color: ${ThemeColor.SILVER};
  border-radius: 0px;
  padding-left: 0px;
  padding-right: 0px;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
    border-bottom-color: ${ThemeColor.SILVER};
    color: ${ThemeColor.SILVER};
    border-radius: 0px;
  }
`;

export const CopyButton = styled(Button)`
  min-width: 160px;

  font-size: 14px;
  line-height: 21px;
  background-color: ${ThemeColor.WHITE_COLOR} !important;
  color: ${ThemeColor.AZURE_RADIANCE} !important;
  border-color: ${ThemeColor.AZURE_RADIANCE};

  &:hover {
    border-color: ${ThemeColor.AZURE_RADIANCE};
    background-color: ${ThemeColor.SILVER} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
  }

  ${breakpoints("margin-left", [
    {
      xl: "24px",
    },
    {
      lg: "24px",
    },
    {
      md: "24px",
    },
    {
      sm: "0px",
    },
    {
      xs: "0px",
    },
  ])}

  ${breakpoints("margin-top", [
    {
      xl: "0px",
    },
    {
      lg: "0px",
    },
    {
      md: "0px",
    },
    {
      sm: "16px",
    },
    {
      xs: "16px",
    },
  ])}


  ${breakpoints("margin-bottom", [
    {
      xl: "0px",
    },
    {
      lg: "0px",
    },
    {
      md: "0px",
    },
    {
      sm: "16px",
    },
    {
      xs: "16px",
    },
  ])}
`;

export const RefLinkSection = styled(ColNoSpacing)`
  a:not(:last-child) {
    margin-right: 4px;
  }
`;

export const RefLinkTitle = styled.div`
  span {
    font-size: 16px;
    line-height: 24px;
    color: ${ThemeColor.RIVER_BED};
    font-weight: 500;
  }
`;

export const RefLinkButton = styled.div`
  margin-top: 8px;

  a {
    color: ${ThemeColor.STEEL_GRAY};
    cursor: pointer;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    text-decoration: unset;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const TooltipContainer = styled(Tooltip)`
  padding-bottom: 20px;
  [class*="show bs-tooltip-auto"] {
    top: -10px !important;
  }
`;

export const HideScrollBar = createGlobalStyle`
  &::-webkit-scrollbar {
    width: 0.01px;
  }
`;
