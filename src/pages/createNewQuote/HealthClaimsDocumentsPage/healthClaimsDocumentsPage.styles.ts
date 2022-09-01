import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  margin: 0;
`;

export const ContentContainer = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;

  width: 100%;
  margin: auto;
  box-sizing: border-box;
  position: relative;

  ${breakpoints("max-width", [
    {
      xl: "80%",
    },
    {
      lg: "80%",
    },
    {
      md: "100%",
    },
    {
      sm: "100%",
    },
    {
      xs: "100%",
    },
  ])}

  ${breakpoints("padding-left", [
    {
      xl: "0px",
    },
    {
      lg: "0px",
    },
    {
      md: "15px",
    },
    {
      sm: "15px",
    },
    {
      xs: "15px",
    },
  ])}

  ${breakpoints("padding-right", [
    {
      xl: "0px",
    },
    {
      lg: "0px",
    },
    {
      md: "15px",
    },
    {
      sm: "15px",
    },
    {
      xs: "15px",
    },
  ])}
`;
