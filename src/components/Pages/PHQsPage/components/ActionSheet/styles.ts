import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ConfirmModal from "src/components/ConfirmModal";
import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled, { css, keyframes } from "styled-components";
import { Status } from "./enums";

interface IStatus {
  status: string;
}

const fadeIn = keyframes`
  from {
    top: -40px;
  }

  to {
    top: 0;
  }
`;
const fadeOut = keyframes`
  0% {
    top: 0;
  }
  75% {
    top: 0;
  }
  100% {
    top: -40px;
  }
`;
const fadeInAndOut = keyframes`
  0% {
    top: -40px;
  }
  20% {
    top: 0;
  }
  80% {
    top: 0;
  }
  100% {
    top: -40px;
  }
`;

function handleStatusStyle(status: string) {
  switch (status) {
    case Status.PROCESSING:
      return css`
        top: 0;
        animation: 0.25s ${fadeIn} ease-out;
        background-color: #a6a6ae;
      `;
    case Status.FINISHED:
      return css`
        top: -40px;
        animation: 2s ${fadeOut} linear;
        background-color: ${ThemeColor.SHAMROCK};
      `;
    case Status.IMMEDIATE_FINISHED:
      return css`
        top: -40px;
        animation: 2s ${fadeInAndOut} linear;
        background-color: ${ThemeColor.SHAMROCK};
      `;
    case Status.CANNOT_PROCESS:
      return css`
        top: -40px;
        animation: 2s ${fadeInAndOut} linear;
        background-color: ${ThemeColor.BRIGHT_TURQUOISE};
        color: ${ThemeColor.BLACK_COLOR};
      `;
  }
}
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 13px;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledIcon = styled(Icon)`
  margin: 0px 12px;
  cursor: pointer;
`;

export const StyledDownloadButton = styled(DropdownToggle)`
  background-color: ${ThemeColor.FOAM};
  border-color: ${ThemeColor.FOAM};
  color: ${ThemeColor.AZURE_RADIANCE};
  min-width: 104px;
  font-size: 14px;
  font-weight: 300;
  line-height: 21px;
  border-radius: 4px !important;
  :hover,
  :active,
  :focus {
    background-color: ${ThemeColor.SAIL};
    border-color: ${ThemeColor.SAIL};
    color: ${ThemeColor.AZURE_RADIANCE};
  }
`;

export const StyledButtonDropdown = styled(ButtonDropdown)``;

export const StyledDropdownItem = styled(DropdownItem)`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.SLATE_GRAY};
  font-weight: 700;
  :hover,
  :active {
    background-color: ${ThemeColor.WHITE_COLOR};
    color: ${ThemeColor.AZURE_RADIANCE};
  }
`;

export const StyledDropdownMenu = styled(DropdownMenu)`
  padding-bottom: 0px;
`;

export const DownloadStatusMessage = styled.div<IStatus>`
  position: absolute;
  left: 0;

  width: 100vw;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  font-weight: 300;
  line-height: 22px;
  color: ${ThemeColor.WHITE_COLOR};

  ${(props) => handleStatusStyle(props.status)}
`;

export const ModalTitle = styled.div`
  font-weight: 300;
  font-size: 22px;
  line-height: 38px;
`;

export const StyledConfirmModal = styled(ConfirmModal)``;

export const ModalSubTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
`;
