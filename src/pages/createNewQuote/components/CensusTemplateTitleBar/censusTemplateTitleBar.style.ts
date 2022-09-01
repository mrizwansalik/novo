import { device, ThemeColor } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  width: 100%;
  min-height: 138px;
  background-color: #f5f5f5;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
  box-sizing: border-box;

  > div {
    max-width: 1080px;
    padding: 0 15px;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    position: relative;
  }

  h1 {
    font-size: 24px;
    line-height: 36px;
    margin-bottom: 8px;
    color: ${ThemeColor.STEEL_GRAY};
    font-weight: 700;
  }

  h3 {
    font-size: 16px;
    line-height: 24px;
    color: ${ThemeColor.STEEL_GRAY};
    font-weight: 300;
    margin-bottom: 8px;
  }

  a {
    height: 24px;
    font-size: 16px;
    line-height: 24px;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    display: flex;

    :hover {
      text-decoration: underline;
    }

    img {
      transform: scaleX(-1);
      margin-right: 6px;
      margin-bottom: 1px;
    }
  }

  @media only screen and (${device.mobile}) {
    padding: 10px 22px;
  }
`;
