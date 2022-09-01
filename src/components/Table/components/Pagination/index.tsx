import React from "react";
import { IPagination } from "../..";
import { PaginateButton, PaginationContainer } from "./style";

interface IPaginationProps {
  pagination: IPagination;
}

const Pagination = ({ pagination }: IPaginationProps) => {
  const { pageIndex, pageCount, goNextPage, goPreviousPage } = pagination;

  return (
    <PaginationContainer>
      <PaginateButton
        iconName="leftChevronArrow64px-white.png"
        isDisabled={pageIndex === 1}
        onClick={pageIndex !== 1 && goPreviousPage}
      />
      <PaginateButton
        iconName="rightChevronArrow64px-white.png"
        isDisabled={pageIndex === pageCount}
        onClick={pageIndex !== pageCount && goNextPage}
      />
    </PaginationContainer>
  );
};
export default Pagination;
