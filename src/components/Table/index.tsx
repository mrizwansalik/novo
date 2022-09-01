import React from "react";
import { get } from "lodash";
import { useTable, usePagination, useFlexLayout } from "react-table";
import DetailPagination from "./components/DetailPagination";
import Pagination from "./components/Pagination";
import { StyledCheckbox, TableContainer } from "./style";

export interface IPagination {
  includePagination?: boolean;
  rowCounts?: number;
  pageCount?: number;
  pageIndex?: number;
  rowPerPage?: number;
  goNextPage?: () => void;
  goPreviousPage?: () => void;
  setRowPerPage?: (rowPerPage: number) => void;
  additionalInformation?: any;
}
export interface ITableProps {
  headerList?: unknown;
  data?: unknown[];
  pagination?: IPagination;
  isLoading?: boolean;
  hasSelectColumn?: boolean;
  selectedRow?: Record<string, boolean>;
  maxRowPerPage?: number;
  className?: string;
  onSelectRow?: (selectedId: string, isSelect: boolean) => void;
  onSelectAll?: (isSelect: boolean) => void;
}

const Table = (props: ITableProps) => {
  const {
    headerList,
    data,
    isLoading = false,
    pagination = {},
    hasSelectColumn,
    selectedRow,
    maxRowPerPage,
    className,
    onSelectRow,
    onSelectAll,
  } = props;
  const columns = React.useMemo(() => headerList, [headerList]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
    // Get the state from the instance
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: pagination.rowPerPage || maxRowPerPage || 5,
      },
    } as any,
    usePagination,
    useFlexLayout
  ) as any;

  let paginationComponent = null;

  if (pagination.includePagination) {
    if (hasSelectColumn) {
      paginationComponent = (
        <DetailPagination pagination={pagination} setPageSize={setPageSize} />
      );
    } else {
      paginationComponent = <Pagination pagination={pagination} />;
    }
  }

  const loadingPaginationComponent = isLoading ? null : paginationComponent;

  return (
    <TableContainer className={className}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {hasSelectColumn && (
                <th>
                  <StyledCheckbox
                    onClick={(e) => onSelectAll(e.currentTarget.checked)}
                  />
                </th>
              )}
              {headerGroup.headers.map((column, i) => (
                <th
                  key={i}
                  {...column.getHeaderProps({
                    style: {
                      minWidth: column.minWidth,
                      width: column.width,
                    },
                  })}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            const rowId = get(row, "original.id");
            return (
              <tr key={i} {...row.getRowProps()}>
                {hasSelectColumn && (
                  <td>
                    <StyledCheckbox
                      checked={selectedRow[rowId]}
                      onClick={(e) =>
                        onSelectRow(rowId, e.currentTarget.checked)
                      }
                    />
                  </td>
                )}
                {row.cells.map((cell, index) => {
                  return (
                    <td key={index} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {loadingPaginationComponent}
    </TableContainer>
  );
};
export default Table;
