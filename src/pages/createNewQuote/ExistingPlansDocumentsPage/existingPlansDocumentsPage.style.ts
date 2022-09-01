import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const PageContainer = styled.div``;

export const ContentContainer = styled.div`
  max-width: 1590px;
  padding: 20px 15px 50px;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  position: relative;

  h2 {
    font-weight: 700;
    color: #4b565e;
    font-size: 18px;
    line-height: 24px;
    margin-top: 24px;
    margin-bottom: 25px;
  }
`;

export const StyledForm = styled.form``;

export const PageHeader = styled.div`
  min-height: 138px;
  background-color: #f5f5f5;
  margin-bottom: 25px;
  padding: 25px 0 20px;

  div {
    max-width: 1590px;
    padding: 0 15px;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    position: relative;

    h3 {
      font-size: 16px;
      line-height: 24px;
      color: #212135;
      font-weight: 500;
    }

    h1 {
      font-size: 24px;
      line-height: 36px;
      margin-bottom: 8px;
      color: #212135;
      font-weight: 700;
    }
  }
`;

export const Title = styled.div`
  margin-bottom: 12px;

  h2 {
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    color: #212135;
    margin: 0 0 8px;
  }

  h3 {
    font-size: 16px;
    line-height: 24px;
    color: #212135;
    font-weight: 500;
    margin-bottom: 0 0 8px;
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
  margin-top: 25px;
  border-radius: 3px;
  background-color: ${ThemeColor.AZURE_RADIANCE};
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  color: ${ThemeColor.WHITE_COLOR};
  cursor: pointer !important;
  opacity: 1;

  :hover {
    background-color: #0078c2;
    border-color: #0078c2;
  }
`;
