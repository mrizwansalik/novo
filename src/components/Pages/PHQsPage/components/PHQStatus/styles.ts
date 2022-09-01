import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { ThemeColor } from "src/constants";
import styled, { css } from "styled-components";
interface IStatus {
  status?: string;
}

function getStatusColor(status: string) {
  switch (status) {
    case "Incomplete":
      return css`
        background-color: #e08e00;
      `;
    case "Complete":
      return css`
        background-color: ${ThemeColor.SHAMROCK};
      `;
    case "Locked":
      return css`
        background-color: ${ThemeColor.CINNABAR};
      `;
  }
}
export const StyledDropdownToggle = styled(DropdownToggle)`
  min-width: 104px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  font-style: italic;
  display: flex;
  flex-direction: row;
  padding: 0px;
  &&& {
    background-color: transparent;
    border-color: transparent;
    color: ${ThemeColor.RIVER_BED};
    box-shadow: none;
  }
`;

export const StyledButtonDropdown = styled(ButtonDropdown)``;

export const StyledDropdownItem = styled(DropdownItem)`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.SLATE_GRAY};
  font-weight: 500;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  :hover,
  :active {
    background-color: ${ThemeColor.WHITE_COLOR};
    color: ${ThemeColor.AZURE_RADIANCE};
  }
`;

export const StyledDropdownMenu = styled(DropdownMenu)`
  padding-bottom: 0px;
`;

export const StatusIcon = styled.div<IStatus>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: relative;
  margin-top: 2px;
  margin-left: 6px;
  ${(props) => getStatusColor(props.status)}
`;

export const Outline = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  border: 3px solid #ffffff;
`;
