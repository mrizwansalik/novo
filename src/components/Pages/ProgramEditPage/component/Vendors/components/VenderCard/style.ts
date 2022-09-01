import { Collapse } from "reactstrap";
import Icon from "src/components/Icon";
import Image from "src/components/Image";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  padding: 11px;
  min-height: 240px;
  border: 1px solid ${ThemeColor.MYSTIC};
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
`;

export const CheckboxSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  input {
    width: 20px;
    height: 20px;
    border-width: 1px;
    border-radius: 50% !important;
    cursor: pointer;
  }

  input:checked {
    border-radius: 50%;
  }
`;

export const ProgramImage = styled(Image)`
  display: flex;
  justify-content: center;
  flex: 1;
  min-height: 150px;

  img {
    max-width: 150px;
    max-height: 150px;
    object-fit: contain;
  }
`;

export const ProgramName = styled.div`
  font-size: 15px;
  color: ${ThemeColor.RIVER_BED};
  text-align: center;
  padding: 15px 0px 0px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 0px;
  padding-right: 0px;
  margin-top: 10px;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const CollapseButton = styled(Icon)<{
  isCollapsed: boolean;
}>`
  opacity: 0.6;
  transform: ${(props) =>
    props?.isCollapsed ? "rotate(0deg)" : "rotate(180deg)"};
`;

export const CollapseContent = styled(Collapse)`
  padding-left: 0px;
  padding-right: 0px;

  font-size: 15px;
  color: ${ThemeColor.RIVER_BED};
  text-align: justify;
  padding: 10px 15px 0 15px;
  line-height: 20px;
  font-weight: 100;
`;
