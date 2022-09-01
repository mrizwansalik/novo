import styled from "styled-components";
import { ThemeColor } from "../../../../constants";
import Icon from "../../../Icon";
import { device } from "./../../../../constants/deviceSize/index";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

export const DesktopWrapper = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (${device.mobile}) {
    display: none;
  }
`;

export const MobileWrapper = styled.div`
  display: none;
  position: absolute;
  right: 20px;

  @media only screen and (${device.mobile}) {
    display: block;
  }
`;

export const IconSection = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${ThemeColor.BRIGHT_TURQUOISE};
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-right: 12px;
`;

export const NameSection = styled.div`
  flex: 1;
  margin-right: 24px;
`;

export const OrganizationName = styled.div`
  color: ${ThemeColor.SLATE_GRAY};
  font-weight: 300;
  font-size: 12px;
  white-space: nowrap;
`;

export const OrganizationType = styled.div`
  color: ${ThemeColor.SLATE_GRAY};
  font-weight: 700;
  font-size: 12px;
`;

export const DropdownIcon = styled(Icon)`
  img {
    width: 16px;
    height: 16px;
  }
`;
