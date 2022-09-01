import styled from "styled-components";

export const PageContainer = styled.div``;

export const ContentContainer = styled.form`
  max-width: 1290px;
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

export const PageHeader = styled.div`
  min-height: 138px;
  background-color: #f5f5f5;
  margin-bottom: 25px;
  padding: 25px 0 20px;

  div {
    max-width: 1290px;
    padding: 0 15px;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    position: relative;

    h2 {
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
      color: #4b565e;
      margin-bottom: 8px;
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
