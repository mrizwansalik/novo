import { Progress } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  max-width: 80%;

  h3 {
    font-weight: 700;
    color: #4b565e;
    font-size: 18px;
    line-height: 24px;
    margin: 0 0 24px;
  }

  h5 {
    font-weight: 700;
    color: #61707a;
    font-size: 16px;
    line-height: 24px;
    margin: 0 0 15px;
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
  margin: 43px 0 24px;
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

export const UploadButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 24px;

  h5 {
    font-size: 16px;
    font-weight: 700;
    color: #0097f5;
    margin: 2px 0 0 8px;

    :hover {
      text-decoration: underline;
    }
  }
`;

export const ProgressBar = styled(Progress)`
  height: 8px;
  border-radius: 4px;

  div {
    background-color: #0097f5;
  }
`;

export const ProgressDetail = styled.div`
  display: flex;
  justify-content: space-between;
  color: #aeb8c0;
  margin: 8px 0 24px;

  button {
    :disabled {
      color: #aeb8c0;
      background-color: #fafafa;
      height: 40px;
      min-width: 174px;
      padding: 8px 0px;
      border-radius: 3px;
      border: none;
    }
  }

  div {
    display: flex;
    align-items: center;

    span {
      margin-left: 8px;
    }
  }
`;

interface IChecklistItemProps {
  isDisabled?: boolean;
}
export const ChecklistItem = styled.div<IChecklistItemProps>`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${(props) => (props.isDisabled ? "#aeb8c0" : "#000000")};

  :last-child {
    margin-bottom: 24px;
  }
`;
