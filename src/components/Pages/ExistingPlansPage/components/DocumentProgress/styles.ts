import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";
export const Container = styled.div``;

interface IProgressBar {
  progress?: number;
}

export const UploadDocument = styled.div`
  display: flex;
  flex-direction: row;
  color: ${ThemeColor.AZURE_RADIANCE};
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ProgressBar = styled.div<IProgressBar>`
  height: 8px;
  border-radius: 4px;
  background-color: ${ThemeColor.AZURE_RADIANCE};
  margin-top: 16px;
  margin-bottom: 8px;
  width: ${(props) => `calc(100% / 8 * ${props.progress})`};
`;

export const ProgressBarContainer = styled.div`
  height: 8px;
  border-radius: 4px;
  background-color: #e3e9ec;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const ProgressStatus = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 0px 8px 0px;
  font-weight: 300px;
  color: ${ThemeColor.TOWER_GRAY};
`;

export const ProgressStatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CheckboxIcon = styled(Icon)``;

export const UnderwritingText = styled.div`
  background-color: #fafafa;
  color: ${ThemeColor.TOWER_GRAY};
  padding: 8px 6px 8px 6px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  height: 40px;
`;

export const UploadIcon = styled(Icon)`
  margin-top: -2px;
  margin-right: 7px;
`;
