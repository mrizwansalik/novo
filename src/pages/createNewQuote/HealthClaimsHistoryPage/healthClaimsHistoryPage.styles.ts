import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  margin: 0;
`;

export const ContentContainer = styled.div`
  max-width: 1150px;
  padding: 0 15px;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  position: relative;

  ${breakpoints("padding-left", [
    {
      xl: "0px",
    },
    {
      lg: "15px",
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
      lg: "15px",
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
