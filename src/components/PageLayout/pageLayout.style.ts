import styled, { keyframes } from "styled-components";
import { ThemeColor } from "../../constants";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledContainer = styled.div<{ hasGrayBackground: boolean }>`
  min-height: 100vh;
  background-color: ${(props) =>
    props.hasGrayBackground ? ThemeColor.BLACK_SQUEEZE : "inherit"};
`;

export const ContentContainer = styled.div``;

export const LoadingSpinner = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 8px !important;
  left: 25px;
  background-color: ${ThemeColor.WHITE_COLOR};
  border-radius: 50%;

  div {
    position: relative;
    top: 5px;
    left: 5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 4px solid ${ThemeColor.WHITE_COLOR};
    border-top: 4px solid ${ThemeColor.BLACK_COLOR};
    animation-name: ${rotate};
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`;
