import { device } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  border: 1px solid #c8c8c8;
  box-shadow: inset 0 2px 0 0 rgb(0 0 0 / 15%), 0 0 6px 0 rgb(0 0 0 / 15%);
  border-radius: 3px;
  background-color: #ffffff;
  width: 100%;

  @media only screen and (${device.mobile}) {
    margin-bottom: 25px;
  }
`;

export const CensusItem = styled.div`
  padding: 16px;
  width: 100%;

  :nth-child(odd) {
    background-color: #f7f7f7;
  }

  h3 {
    font-size: 16px;
    line-height: 24px;
    color: #212135;
    font-weight: 700;
  }

  p {
    font-size: 16px;
    line-height: 24px;
    color: #212135;
    font-weight: 500;
  }
`;
