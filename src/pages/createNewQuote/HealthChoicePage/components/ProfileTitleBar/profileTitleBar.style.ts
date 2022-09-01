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

export const Title = styled.h1`
  font-size: 24px;
  line-height: 36px;
  margin-bottom: 8px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 700;
`;

export const Description = styled.h3`
  font-size: 14px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 300;
  margin-bottom: 8px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SwitchPlanButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 8px;

  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.AZURE_RADIANCE};
  cursor: pointer;

  img {
    margin-left: 8px;
    width: 20px;
    height: 20px;
  }
`;
