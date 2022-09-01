import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeColor } from "../../../../constants";
import { device } from "./../../../../constants/deviceSize/index";

interface IContainerProps {
  active?: boolean;
}

interface ITitleProps {
  active?: boolean;
}

export const Container = styled(Link)<IContainerProps>`
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 4px solid
    ${(props) => (props.active ? ThemeColor.BRIGHT_TURQUOISE : "transparent")};
  cursor: pointer;
  padding-left: 12px;
  padding-right: 12px;
  text-decoration: none;

  @media only screen and (${device.mobile}) {
    align-items: flex-start;
  }
`;

export const Title = styled.div<ITitleProps>`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 18px;
  line-height: 30px;
  font-weight: 300;
`;
