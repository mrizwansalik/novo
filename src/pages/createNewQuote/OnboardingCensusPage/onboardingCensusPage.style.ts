import Button from "src/components/Button";
import { device, ThemeColor } from "src/constants";
import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  margin: 0;
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

export const ButtonWithIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 36px;
  min-width: 190px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  padding: 8px;
  margin-top: 25px;
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

export const CensusTemplates = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0;

  h2 {
    font-size: 18px;
    line-height: 27px;
    color: #212135;
    font-weight: 700;
    margin-bottom: 12px;
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

export const PrimaryButton = styled(Button)`
  max-height: 100%;
  width: 100%;
  background-color: ${ThemeColor.AZURE_RADIANCE};

  :hover {
    background-color: #0078c2;
  }
`;

export const SecondaryButton = styled(Button)`
  max-height: 100%;
  width: 100%;
  background-color: #ffffff;
  color: ${ThemeColor.STEEL_GRAY} !important;

  :hover {
    color: ${ThemeColor.STEEL_GRAY} !important;
    background-color: ${ThemeColor.MERCURY};
  }
`;

export const ModalBody = styled.div`
  padding: 20px;

  h5 {
    color: #212135;
    font-size: 16px;
    line-height: 22px;
    margin: 0px;
    margin-bottom: 17px;
    font-weight: 500;
  }

  > div {
    display: flex;
    justify-content: space-between;
  }

  button {
    max-width: 48%;
    font-weight: 300;
  }
`;
