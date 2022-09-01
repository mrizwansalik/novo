import { device, ThemeColor } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  width: 100%;
  min-height: 138px;
  background-color: #f5f5f5;
  margin-bottom: 25px;
  padding-top: 22px;
  padding-bottom: 22px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;

  > div {
    display: flex;
    justify-content: space-between;
    position: relative;

    > div {
      justify-content: space-between;
    }

    div {
      align-items: center;
    }

    @media only screen and (${device.mobile}) {
      padding: 10px 22px;
    }
  }
`;

export const Description = styled.h3`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 500;
  margin-bottom: 8px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
