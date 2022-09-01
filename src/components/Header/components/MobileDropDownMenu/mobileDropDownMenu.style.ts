import styled from "styled-components";
import { ThemeColor } from "./../../../../constants/enum/theme";

interface IMenuState {
  isOpen?: boolean;
  itemCount?: number;
}

export const OverlayArea = styled.div<IMenuState>`
  position: fixed;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 2;
`;

export const MenuArea = styled.div<IMenuState>`
  position: fixed;
  z-index: 3;
  top: ${(props) => (props.isOpen ? 50 : -(props.itemCount + 1) * 47)}px;
  left: 0;
  right: 0;
  width: 100vw;
  height: ${(props) => props.itemCount * 50}px;
  background: #ffffff;
  border-bottom: 1px solid ${ThemeColor.ALTO};
  /* transition: 0.2s; */
`;
