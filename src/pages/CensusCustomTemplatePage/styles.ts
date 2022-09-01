import { breakpoints } from "src/styles/layout";
import styled from "styled-components";
import { ThemeColor } from "../../constants";
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: ${ThemeColor.BLACK_SQUEEZE}; */
`;

export const MainContent = styled.div`
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
`;
