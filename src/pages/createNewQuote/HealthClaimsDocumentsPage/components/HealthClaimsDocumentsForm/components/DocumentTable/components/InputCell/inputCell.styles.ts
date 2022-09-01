import Button from "src/components/Button";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const InputContainer = styled.td``;

export const NameLabel = styled.div`
  width: 100%;
  white-space: pre;

  span {
    margin-left: 4px;
  }

  img {
    height: 24px;
    width: 24px;
    cursor: pointer;
  }
`;

export const NameInput = styled.div``;

export const InputSection = styled.div`
  margin-bottom: 16px;
`;

export const ButtonSection = styled.div`
  button:not(:last-child) {
    margin-right: 16px;
  }
`;

export const UpdateButton = styled(Button)`
  background-color: #def5fc;
  border-color: #def5fc;
  color: #0097f5;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;

  &:hover {
    background-color: #def5fc;
    border-color: #def5fc;
    color: #0097f5;
  }

  &:focus {
    outline: none;
  }
`;

export const CancelButton = styled(Button)`
  background-color: ${ThemeColor.WHITE_COLOR};
  border: 1px solid ${ThemeColor.MYSTIC};
  color: ${ThemeColor.SLATE_GRAY};
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;

  &:hover {
    background-color: ${ThemeColor.WHITE_COLOR};
    border: 1px solid ${ThemeColor.MYSTIC};
    color: ${ThemeColor.SLATE_GRAY};
  }

  &:focus {
    outline: none;
  }
`;
