import styled from "styled-components";
import { ThemeColor } from "../../../../constants";
import { device } from "./../../../../constants/deviceSize/index";

export const Container = styled.div`
  position: absolute;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  z-index: 1;

  &::before {
    color: ${ThemeColor.WHITE_COLOR};
    text-shadow: 0 1px 3px ${ThemeColor.BLACK_COLOR};
    opacity: 0.5;
    position: absolute;
    top: -30px;
    left: 113px;
    content: "▲";
    border-color: transparent transparent ${ThemeColor.BLACK_COLOR};
    border-style: solid;
    border-width: 8px;
    border-bottom-color: ${ThemeColor.WHITE_COLOR};
  }

  @media only screen and (${device.mobile}) {
    &::before {
      content: "";
    }
  }
`;

export const DropdownStyle = styled.div`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 30%);
  position: absolute;
  top: -5px;
  left: -15px;

  height: auto;
  width: max-content;
  min-width: 160px;

  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0.125rem 0.5rem rgba(black, 0.15);
  padding: 6px 26px;

  align-self: flex-end;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(black, 0.3);
    border-radius: 5px;
    background-color: ${ThemeColor.WHITE_COLOR};
  }

  &::-webkit-scrollbar {
    width: 0.01px;
    background-color: ${ThemeColor.WHITE_COLOR};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${ThemeColor.SLATE_GRAY};
  }

  @media only screen and (${device.mobile}) {
    top: 0;
    width: 80vw;
  }
`;
