import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import Button from "src/components/Button";
import { ThemeColor } from "src/constants";
import { device } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled, { css } from "styled-components";
interface ITabProps {
  isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
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

export const LinkToPHQs = styled.p`
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

export const EditClaimsButton = styled(Button)`
  height: 38px;
  min-width: 166px;
  padding: 8px 18px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  align-self: center;
  color: ${(props) => (props.disabled ? "#a6a6a6" : ThemeColor.WHITE_COLOR)};
  border: 1px solid;
  border-color: ${(props) =>
    props.disabled ? "#e3e9ec" : ThemeColor.AZURE_RADIANCE};
  background-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.AZURE_RADIANCE};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")} !important;
  :focus,
  :active {
    background-color: #0078c2;
    color: ${ThemeColor.WHITE_COLOR};
  }
  :hover {
    color: ${(props) => (props.disabled ? "#a6a6a6" : ThemeColor.WHITE_COLOR)};
    background-color: ${(props) =>
      props.disabled ? ThemeColor.SILVER : "#0078c2"};
    border-color: ${(props) => (props.disabled ? "#e3e9ec" : "#0078c2")};
  }
  @media only screen and (${device.mobile}) {
    min-width: 100px;
  }
`;

export const ContentContainer = styled.div`
  padding: 22px;
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 24px;
`;

export const TabItem = styled(Link)<ITabProps>`
  color: ${ThemeColor.SLATE_GRAY};
  margin-right: 24px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  cursor: pointer;
  height: 54px;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 11px;
  text-decoration: none;
  :hover {
    color: ${ThemeColor.SLATE_GRAY};
  }
  ${(props) =>
    props.isActive &&
    css`
      color: ${ThemeColor.AZURE_RADIANCE};
      cursor: default;
      border-bottom: 4px solid ${ThemeColor.AZURE_RADIANCE};
      :hover {
        color: ${ThemeColor.AZURE_RADIANCE};
      }
    `}
`;
