import {
  NavItem as ReactstrapNavItem,
  NavLink as ReactstrapNavLink,
  Nav as ReactstrapNav,
} from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div``;

export const NavItem = styled(ReactstrapNavItem)<{ active: boolean }>`
  border-bottom: ${(props) => (props?.active ? "4px;" : "0px;")};
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-style: solid;
  border-color: ${ThemeColor.AZURE_RADIANCE};
  margin-right: 24px;
  cursor: pointer;

  a {
    border-width: 0px !important;
    padding-left: 0px;
    padding-right: 0px;

    color: ${(props) =>
      props?.active ? ThemeColor.AZURE_RADIANCE : ThemeColor.SLATE_GRAY};

    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
  }

  a:hover {
    color: ${(props) =>
      props?.active ? ThemeColor.AZURE_RADIANCE : ThemeColor.SLATE_GRAY};
  }
`;

export const NavLink = styled(ReactstrapNavLink)``;

export const Nav = styled(ReactstrapNav)`
  border-bottom-width: 0px;
`;
