import React from "react";
import SingleSelect from "src/components/SingleSelect";
import { IOption } from "src/types";
import { IPagination } from "../..";
import {
  AdditionalInformation,
  AdditionalInformationItem,
  PaginationButton,
  PaginationContainer,
  PaginationSelect,
  RowPerPageSelect,
} from "./detailPagination.style";

interface IDetailPaginationProps {
  pagination: IPagination;
  setPageSize: (pageSize) => void;
}

const DetailPagination = (props: IDetailPaginationProps) => {
  const { pagination, setPageSize } = props;
  const {
    rowPerPage,
    rowCounts,
    pageIndex,
    pageCount,
    additionalInformation,
    goNextPage,
    goPreviousPage,
    setRowPerPage,
  } = pagination;

  const rowPerPageOptions = [
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 50,
      label: "50",
    },
  ];

  function getSelectedRowPerPageOption(currentValue: number): IOption {
    return rowPerPageOptions.find((option) => option.value === currentValue);
  }

  function onChangePageSize(pageSize) {
    setRowPerPage(pageSize);
    setPageSize(pageSize);
  }

  return (
    <PaginationContainer>
      <AdditionalInformation>
        {Array.isArray(additionalInformation) &&
          additionalInformation.map((item) => (
            <AdditionalInformationItem key={item.field}>
              <span>{item.field}</span>&nbsp;{item.value}
            </AdditionalInformationItem>
          ))}
        <AdditionalInformationItem>
          {rowCounts}&nbsp;Total
        </AdditionalInformationItem>
        <RowPerPageSelect>
          Show
          <SingleSelect
            menuPlacement="top"
            options={rowPerPageOptions}
            onChange={(selected) => onChangePageSize(selected.value)}
            value={getSelectedRowPerPageOption(rowPerPage)}
          />
        </RowPerPageSelect>
        <PaginationSelect>
          <span>
            Page {pageIndex} of {pageCount}
          </span>
          <PaginationButton
            iconName="blue-arrow-right.png"
            isDisabled={pageIndex === 1}
            onClick={goPreviousPage}
            size={18}
            isLeft
          />
          <PaginationButton
            iconName="blue-arrow-right.png"
            isDisabled={pageIndex === pageCount}
            onClick={goNextPage}
            size={18}
          />
        </PaginationSelect>
      </AdditionalInformation>
    </PaginationContainer>
  );
};
export default DetailPagination;
