import { Col } from "reactstrap";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled.div`
  padding-left: 0px;
  padding-right: 0px;
  min-height: 280px;
`;

export const Divider = styled.div`
  ${breakpoints("padding-left", [
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
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}
  ${breakpoints("padding-right", [
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
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}
  hr {
    color: ${ThemeColor.MANATEE};
    width: 100%;
  }
`;

export const DividerNoSpacing = styled.div`
  ${breakpoints("padding-left", [
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
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}
  ${breakpoints("padding-right", [
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
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}
  hr {
    margin-top: 0px;
    margin-bottom: 0px;
    color: ${ThemeColor.MANATEE};
    width: 100%;
  }
`;

export const SmallSpacing = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const ArrowSection = styled.div`
  ${breakpoints("padding-left", [
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
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}
  ${breakpoints("padding-right", [
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
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}
`;

export const SwitchButtonSpacing = styled(Col)`
  ${breakpoints("padding-left", [
    {
      xl: "24px",
    },
    {
      lg: "24px",
    },
    {
      md: "12px",
    },
    {
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}

  ${breakpoints("padding-right", [
    {
      xl: "24px",
    },
    {
      lg: "24px",
    },
    {
      md: "12px",
    },
    {
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
