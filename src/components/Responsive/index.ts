import { device } from "src/constants";
import styled from "styled-components";

export const HideOnMobile = styled.div`
  @media only screen and (${device.mobile}) {
    display: none;
  }
`;

export const ShowOnMobile = styled.div`
  display: none;

  @media only screen and (${device.mobile}) {
    display: block;
  }
`;
