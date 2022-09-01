import { device, ThemeColor } from "src/constants";
import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  margin: 0;
`;

export const PageHeader = styled.div`
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

  h3 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #212135;
    font-weight: 700;
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

export const ContentContainer = styled.div`
  max-width: 1080px;
  padding: 25px 15px;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
`;

export const TemplateOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;

  h1 {
    font-size: 24px;
    line-height: 36px;
    margin-bottom: 8px;
    color: ${ThemeColor.STEEL_GRAY};
  }

  h2 {
    font-size: 18px;
    line-height: 27px;
    color: ${ThemeColor.STEEL_GRAY};
    font-weight: 500;
    margin-bottom: 8px;
  }

  a {
    font-size: 18px;
    line-height: 27px;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    font-weight: 700;
    margin-bottom: 8px;
    cursor: pointer;

    :hover {
      text-decoration: underline !important;
    }
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 36px;
  min-width: 190px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 300;
  padding: 8px;
  margin-top: 8px;
  border-radius: 3px;
  background-color: ${ThemeColor.AZURE_RADIANCE};
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  color: ${ThemeColor.WHITE_COLOR};
  cursor: pointer;

  :hover {
    background-color: #0078c2;
    border-color: #0078c2;
  }
`;

export const RowSeparator = styled.div`
  height: 84px;
  border-right: 1px solid #c8c8c8;

  @media only screen and (${device.mobile}) {
    display: none;
  }
`;

export const TemplateCard = styled.div`
  display: flex;
  margin-bottom: 12px;

  a {
    font-size: 18px;
    line-height: 27px;
    color: #212135;
    font-weight: 700;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }

  img {
    margin-left: 12px;
    cursor: pointer;
  }
`;
