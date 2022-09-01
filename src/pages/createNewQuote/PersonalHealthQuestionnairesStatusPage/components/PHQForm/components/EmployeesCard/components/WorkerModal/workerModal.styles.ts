import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div<{ openModal: boolean }>`
  position: fixed;
  top: ${(props) => (props?.openModal ? 0 : "-200vh")};
  right: 0;
  z-index: 9;
  height: 100%;
  width: 100%;
  padding-left: 0px;
  padding-right: 0px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const FormLayout = styled.div<{ openModal: boolean }>`
  position: fixed;
  right: 0;
  top: ${(props) => (props?.openModal ? 0 : "-200vh")};

  height: 100%;
  width: 80%;
  background-color: ${ThemeColor.WHITE_COLOR};
  padding: 16px 24px;
  transition: all 0.15s linear;
  overflow-y: scroll;
`;

export const CloseButton = styled(Icon)<{ openModal: boolean }>`
  position: fixed;
  top: ${(props) => (props?.openModal ? 0 : "-200vh")};
  right: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background-color: ${ThemeColor.FOAM};
  width: 24px;
  height: 24px;
  border-radius: 50%;

  margin-right: 16px;
  margin-top: 16px;

  img {
    width: 14px;
    height: 14px;
  }
`;
