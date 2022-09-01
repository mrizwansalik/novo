import React from "react";
import Table, { ITableProps } from "../Table";
import { ComponentContainer } from "./tableWithSelect.style";

export interface ITableWithSelectProps extends ITableProps {
  selectedRow: Record<string, boolean>;
  maxRowPerPage?: number;
  onSelectRow: (selectedId: string | number, isSelect: boolean) => void;
  onSelectAll: (isSelect: boolean) => void;
}

const TableWithSelect = (props: ITableWithSelectProps) => {
  return (
    <ComponentContainer>
      <Table {...props} hasSelectColumn />
    </ComponentContainer>
  );
};
export default TableWithSelect;
