import { Col } from "reactstrap";
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

export const Title = styled(Col)`
  font-size: 24px;
  line-height: 27px;
  color: ${ThemeColor.STEEL_GRAY};
  display: flex;
  align-items: center;
  font-weight: 700;
`;

export const LinkToClaimsData = styled.p`
  margin-left: 8px;
  cursor: pointer;
  font-size: 14px;
  line-height: 24px;
  font-weight: 300;
  color: ${ThemeColor.BLACK_COLOR};
  :hover {
    text-decoration: underline;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  background-color: ${ThemeColor.WILD_SAND};
  padding: 22px 15px 22px 24px;
`;
