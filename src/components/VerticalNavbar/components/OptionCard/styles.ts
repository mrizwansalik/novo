import { UncontrolledTooltip } from "reactstrap";
import { device } from "src/constants";
import styled from "styled-components";
import { ThemeColor } from "../../../../constants";
import Icon from "../../../Icon";

interface IContainerProps {
  active?: boolean;
}

interface ITitleProps {
  active?: boolean;
}

export const Container = styled.div<IContainerProps>`
  height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 4px solid
    ${(props) => (props.active ? ThemeColor.AZURE_RADIANCE : "transparent")};
  background-color: ${(props) =>
    props.active ? ThemeColor.TWILIGHT_BLUE : ThemeColor.WHITE_COLOR};
  cursor: pointer;

  @media only screen and (${device.mobile}) {
    width: 30%;
    border: none;
    border-bottom: 4px solid
      ${(props) => (props.active ? ThemeColor.AZURE_RADIANCE : "transparent")};
  }
`;

export const IconSection = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MenuIcon = styled(Icon)`
  height: 24px;
  width: 24px;
`;

export const WarningIcon = styled(Icon)`
  height: 24px;
  width: 24px;
  margin-left: 4px;
`;

export const HintContainer = styled(UncontrolledTooltip)`
  [class*="tooltip-inner"] {
    width: 180px;
    min-height: 60px;
    margin-top: 10px;
    margin-left: 20px;
    padding: 5px;
    background-color: ${ThemeColor.PROVINCIAL_PINK};
    border: 1px solid ${ThemeColor.CINNABAR};
    color: ${ThemeColor.CINNABAR};
    border-radius: 4px;
  }
`;

export const Title = styled.div<ITitleProps>`
  padding-top: 8px;
  color: ${(props) =>
    props.active ? ThemeColor.AZURE_RADIANCE : ThemeColor.SLATE_GRAY};
  font-size: 14px;
`;
