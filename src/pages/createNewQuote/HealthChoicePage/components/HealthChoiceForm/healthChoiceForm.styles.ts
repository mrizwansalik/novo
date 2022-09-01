import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { device, ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  margin-top: 50px;
  padding-bottom: 50px;
  position: relative;
`;

export const LeftSection = styled(ColNoSpacing)`
  ${breakpoints("padding-right", [
    {
      xl: "40px",
    },
    {
      lg: "40px",
    },
    {
      md: "40px",
    },
    {
      sm: "0px",
    },
    {
      xs: "0px",
    },
  ])}
`;

export const RightSection = styled(ColNoSpacing)`
  ${breakpoints("padding-left", [
    {
      xl: "40px",
    },
    {
      lg: "40px",
    },
    {
      md: "40px",
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
      sm: "40px",
    },
    {
      xs: "40px",
    },
  ])}
`;

export const RowSeparator = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  height: 70%;
  width: 0px;
  border-left: 1px solid ${ThemeColor.SILVER};

  @media only screen and (${device.mobile}) {
    display: none;
  }
`;
