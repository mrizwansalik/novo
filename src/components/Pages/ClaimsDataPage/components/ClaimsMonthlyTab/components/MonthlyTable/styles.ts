import { ThemeColor, device } from "src/constants";
import styled from "styled-components";

export const Container = styled.div``;

export const TableContainer = styled.div`
  max-width: 100%;
  height: 100%;
  overflow-y: visible;
  overflow-x: auto;
  margin-top: 16px;
`;

export const Table = styled.table`
  width: 100%;
  border: 1px solid ${ThemeColor.BORDER_COLOR};
`;

export const TableHead = styled.thead`
  background-color: ${ThemeColor.BLACK_SQUEEZE};
  border-bottom: 1px solid ${ThemeColor.BORDER_COLOR};
  display: table-header-group !important;
`;

export const TableHeadRow = styled.tr`
  margin: 0 !important;
  padding: 0;
`;

export const TableHeadContent = styled.th<{ minWidth?: number }>`
  font-size: 18px;
  line-height: 21px;
  font-weight: 700;
  color: #61707a;
  padding: 24px;
  align-self: center;

  min-width: ${(props) => (props.minWidth ? `${props.minWidth}px` : `150px`)};
`;

export const TableBody = styled.tbody`
  border-collapse: collapse;
`;

export const TableBodyRow = styled.tr`
  margin: 0;
  border-bottom: 1px solid #e3e9ec;
  padding: 0;
  td:first-child {
    font-weight: 500;
    color: #61707a;
    font-size: 18px;
  }
  @media only screen and (${device.tablet}) {
    padding: 15px 0;
  }
`;

export const TableBodyContent = styled.td<{ minWidth?: number }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: 300;
  padding: 24px !important;
  align-self: center;
  min-width: ${(props) => (props.minWidth ? `${props.minWidth}px` : `150px`)};
`;
