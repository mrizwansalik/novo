import { Col, Container, NavLink, NavItem, TabContent, Nav } from "reactstrap";
import { device } from "src/constants";
import styled, { css } from "styled-components";

export const StyledContainer = styled(Container)`
  padding: 24px;
`;

export const PHQsContainer = styled.div``;

export const SideBar = styled.div`
  width: 115px;
  height: 100%;
  min-height: 100vh;
`;

export const TitleContainer = styled(Col)`
  background-color: #f5f5f5;
  font-size: 24px;
  line-height: 27px;
  color: #212135;
  padding-top: 22px;
  padding-bottom: 22px;
  padding-left: 24px;
  display: flex;
  font-weight: 700;
`;

export const TabTitle = styled(NavLink)`
  &&& {
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    border: none;
    padding: 15px 0px 11px 0px;

    ${(props) =>
      props.active
        ? css`
            color: #0097f5;
            cursor: default;
            border-bottom: 4px solid #0097f5;
          `
        : css`
            color: #728490;
            cursor: pointer;
          `};
  }
`;

export const TabItem = styled(NavItem)`
  margin-right: 24px;
  margin-bottom: 25px;
  border: none;
  @media only screen and (${device.mobile}) {
    margin-right: 0px;
    text-align: center;
  }
`;

export const ContentContainer = styled(TabContent)``;

export const TabletDesktopTabContainer = styled(Nav)`
  border: none;
  @media only screen and (${device.mobile}) {
    display: none;
  }
`;

export const MobileTabContainer = styled(Nav)`
  border: none;
  @media only screen and (${device.tablet}) {
    display: none;
  }
`;

export const StyledCol = styled(Col)``;
