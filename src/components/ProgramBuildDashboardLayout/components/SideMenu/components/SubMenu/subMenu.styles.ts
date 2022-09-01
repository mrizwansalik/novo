import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
`;

export const RemoveIcon = styled(Icon)`
  img {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
`;

export const EditIcon = styled(Icon)`
  img {
    cursor: pointer;
    margin-left: 20px;
    width: 24px;
    height: 24px;
  }
`;

export const ProgramLabel = styled.div`
  margin-left: 20px;
  font-size: 16px;
  color: ${ThemeColor.SLATE_GRAY};
`;
