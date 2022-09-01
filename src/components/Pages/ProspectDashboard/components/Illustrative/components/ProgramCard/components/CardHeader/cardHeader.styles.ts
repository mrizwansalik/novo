import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import InputCheckbox from "src/components/InputCheckbox";
import styled from "styled-components";
import { ThemeColor } from "../../../../../../../../../constants";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 90px;

  background-color: ${ThemeColor.BLACK_SQUEEZE};
  cursor: pointer;
  padding: 16px;
`;

export const CheckboxContainer = styled.div`
  flex: 1;

  span {
    padding: 4px 8px 4px 8px;
    margin: 0;
    border-radius: 2px;
    color: #212135;
    font-size: 12px;
    line-height: 14px;
    background-color: #e3e9ec;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

export const GrayCircle = styled(InputCheckbox)<{ isHide?: boolean }>`
  display: ${(props) => (props.isHide ? "none" : "block")};

  input {
    width: 20px;
    height: 20px;
    border-radius: 50% !important;
  }
`;

export const Content = styled.div`
  flex: 3;
  text-align: center;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 12px;
`;

export const ContentTitle = styled.div`
  color: ${ThemeColor.RIVER_BED};
  font-size: 15px;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContentDescription = styled.div`
  color: ${ThemeColor.MANATEE};
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

export const MoreMenu = styled(UncontrolledDropdown)`
  flex: 1;

  button {
    border: none !important;
    background: transparent !important;
    outline: none !important;
    box-shadow: none !important;
  }

  img {
    opacity: 0.4;
  }

  :hover {
    img {
      opacity: 1;
    }
  }
`;

export const DropdownIcon = styled(DropdownToggle)``;

export const StyledDropdownMenu = styled(DropdownMenu)`
  width: 82px !important;
  min-width: 0;

  > button {
    width: 50px;
    margin: 0;
  }
`;
