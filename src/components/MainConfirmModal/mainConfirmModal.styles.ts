import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  img {
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 16px;
  line-height: 22px;
  margin: 0px;
  margin-bottom: 17px;
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AcceptButton = styled.div`
  width: 50%;
  margin-right: 8px;
  padding: 8px 18px;

  text-align: center;

  border-radius: 3px;
  background-color: ${ThemeColor.AZURE_RADIANCE};
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  color: ${ThemeColor.WHITE_COLOR};
  text-align: center;
  cursor: pointer;
  font-size: 14px;
`;

export const RejectButton = styled.div`
  width: 50%;
  margin-left: 8px;
  padding: 8px 18px;

  text-align: center;
  border-radius: 3px;

  background-color: ${ThemeColor.WHITE_COLOR};
  border: 1px solid ${ThemeColor.MYSTIC};
  color: ${ThemeColor.SLATE_GRAY};
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
`;
