import styled from "styled-components";
import { ThemeColor } from "../../constants";
import Icon from "../Icon";
import Image from "../Image";
import { device } from "./../../constants/deviceSize/index";
import UserDropdown from "./components/UserDropdown";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 100%;
  background: ${ThemeColor.WHITE_COLOR};
  flex-wrap: nowrap;
`;

export const LogoSection = styled(Image)`
  background: ${ThemeColor.WHITE_COLOR}
    url(${process.env.PUBLIC_URL}/assets/images/badge-bright-fade-200px.png)
    no-repeat -6px -24px;
  background-size: 96px;
  width: 100px;
  display: flex;
  align-items: center;
  padding-left: 26px;
  cursor: pointer;
  img {
    width: 33px;
    height: 33px;
  }
`;

export const NavigationSection = styled.div`
  flex: 9;
`;

export const UserProfileSection = styled.div`
  flex: 1;
`;

export const DesktopContainer = styled.div`
  flex: 10;
  display: flex;
  justify-content: space-between;

  @media only screen and (${device.mobile}) {
    display: none;
  }
`;

export const MobileContainer = styled.div`
  height: 100%;
  width: calc(100vw - 100px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const HamburgerMenu = styled(Icon)`
  position: absolute;
  left: -30px;
  z-index: 9;
`;

export const DotMenu = styled(UserDropdown)`
  z-index: 9;
`;

export const EmptyHeader = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${ThemeColor.STEEL_GRAY};
`;
