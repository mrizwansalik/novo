import styled from "styled-components";
import { ThemeColor, device } from "../../constants";

export const Container = styled.div`
  height: 50px;
  background-color: ${ThemeColor.WHITE_COLOR};
  border-collapse: collapse;
  display: flex;
  flex-direction: row;

  @media only screen and (${device.mobile}) {
    flex-direction: column;
    height: auto;
    align-items: flex-start;
  }
`;
