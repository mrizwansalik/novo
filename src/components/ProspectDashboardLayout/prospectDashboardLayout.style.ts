import { device, ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${ThemeColor.BLACK_SQUEEZE};

  @media only screen and (${device.mobile}) {
    display: block;
  }
`;

export const MainContent = styled.div`
  background-color: ${ThemeColor.WHITE_COLOR};

  ${breakpoints("width", [
    {
      xl: "calc(100% - 115px)",
    },
    {
      lg: "calc(100% - 115px)",
    },
    {
      md: "calc(100% - 115px)",
    },
    {
      sm: "100%",
    },
    {
      xs: "100%",
    },
  ])}
  height: 100%;
  min-height: 100vh;
`;

export const SideBar = styled.div`
  width: 115px;
  height: 100%;
  min-height: 100vh;

  @media only screen and (${device.mobile}) {
    height: auto;
  }
`;
