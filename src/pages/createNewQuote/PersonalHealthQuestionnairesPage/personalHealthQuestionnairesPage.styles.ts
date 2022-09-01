import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  margin: 0;
`;

export const ContentContainer = styled.div`
  max-width: 1150px;
  padding-top: 0px;
  padding-bottom: 0px;

  width: 100%;
  margin: auto;
  box-sizing: border-box;
  position: relative;

  ${breakpoints("padding-left", [
    {
      xl: "0px",
    },
    {
      lg: "16px",
    },
    {
      md: "16px",
    },
    {
      sm: "16px",
    },
    {
      xs: "16px",
    },
  ])}

  ${breakpoints("padding-right", [
    {
      xl: "0px",
    },
    {
      lg: "16px",
    },
    {
      md: "16px",
    },
    {
      sm: "16px",
    },
    {
      xs: "16px",
    },
  ])}
`;
