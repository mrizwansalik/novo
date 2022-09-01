import { device, ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  width: inherit;
  background-color: ${ThemeColor.WHITE_COLOR};
  border-right: 1px solid ${ThemeColor.SILVER};
  border-collapse: collapse;

  @media only screen and (${device.mobile}) {
    height: 150px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;
