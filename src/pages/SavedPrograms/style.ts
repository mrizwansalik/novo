import styled from "styled-components";
import { ThemeColor } from "../../constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${ThemeColor.BLACK_SQUEEZE};
`;

export const MainContent = styled.div`
  width: 100%;
  height: 100vh;
`;
