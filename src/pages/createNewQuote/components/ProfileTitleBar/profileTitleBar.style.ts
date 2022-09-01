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
      font-weight: 500;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
      line-height: 24px;
      font-weight: 300;
      color: ${ThemeColor.STEEL_GRAY};
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
  }
`;

export const RowSeparator = styled.div`
  position: absolute;
  top: 15%;
  left: 0;
  width: 50%;
  height: 70%;
  border-right: 1px solid #c8c8c8;

  @media only screen and (${device.mobile}) {
    display: none;
  }
`;
