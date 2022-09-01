import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  margin-top: 50px;
  padding-bottom: 50px;
  position: relative;
`;

export const CompanyCollection = styled(RowNoSpacing)``;

export const CardLayout = styled(ColNoSpacing)`
  margin-bottom: 32px;
`;

export const ButtonLayout = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 16px;

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
`;

export const OutlineButton = styled(Button)`
  background-color: #0097f5 !important;
  border-color: #0078c2;
  border-radius: 3px;
  color: #fff;
  font-size: 14px;
  line-height: 21px;
  min-height: 38px;

  ${breakpoints("min-width", [
    {
      xl: "166px",
    },
    {
      lg: "166px",
    },
    {
      md: "166px",
    },
    {
      sm: "100%",
    },
    {
      xs: "100%",
    },
  ])}

  &:focus {
    background-color: #0078c2 !important;
  }

  &:hover {
    background-color: #0078c2 !important;
  }
`;

export const CommonButton = styled(Button)`
  font-size: 14px;
  background-color: ${ThemeColor.WHITE_COLOR} !important;
  color: ${ThemeColor.AZURE_RADIANCE} !important;
  border-color: ${ThemeColor.AZURE_RADIANCE};
  line-height: 21px;

  ${breakpoints("min-width", [
    {
      xl: "166px",
    },
    {
      lg: "166px",
    },
    {
      md: "166px",
    },
    {
      sm: "100%",
    },
    {
      xs: "100%",
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

  &:hover {
    border-color: ${ThemeColor.AZURE_RADIANCE};
    background-color: ${ThemeColor.SILVER} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
  }
`;

export const MediumLeftSpacing = styled.div`
  ${breakpoints("margin-left", [
    {
      xl: "16px",
    },
    {
      lg: "16px",
    },
    {
      md: "16px",
    },
    {
      sm: "0px",
    },
    {
      xs: "0px",
    },
  ])}
`;
