import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div``;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h2 {
    font-size: 18px;
    line-height: 27px;
    color: #4b565e;
    font-weight: 700;
    margin: 0;
  }

  img {
    cursor: pointer;
  }
`;

export const StyledIcon = styled(Icon)`
  img {
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  h5 {
    color: #212135;
    font-size: 16px;
    line-height: 22px;
    margin: 0px;
    margin-bottom: 17px;
    font-weight: 500;
  }

  h4 {
    color: ${ThemeColor.AZURE_RADIANCE};
    margin: auto;
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

export const NoDocumentText = styled.div`
  border: 1px solid rgb(200, 200, 200);
  padding: 22px;
  border-radius: 3px;
  color: #4b565e;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
`;
