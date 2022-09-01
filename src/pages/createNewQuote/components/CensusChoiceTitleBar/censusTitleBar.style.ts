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
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 24px;
    line-height: 36px;
    margin-bottom: 8px;
    color: ${ThemeColor.STEEL_GRAY};
    font-weight: 700;
  }

  span {
    font-size: 14px;
    line-height: 24px;
    font-weight: 300;
    color: ${ThemeColor.STEEL_GRAY};
    display: flex;
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
      margin-left: 6px;
      margin-bottom: 1px;
    }
  }

  @media only screen and (${device.mobile}) {
    padding: 10px 22px;
  }
`;
