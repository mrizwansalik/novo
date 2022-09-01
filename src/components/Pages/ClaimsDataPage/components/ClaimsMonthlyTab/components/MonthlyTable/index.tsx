import React from "react";
import { observer } from "mobx-react";
import useStore from "src/utils/useStore";
import { thousandSeparatorByComma } from "../../../../utils";
import {
  TableBody,
  TableBodyContent,
  TableContainer,
  Table,
  TableBodyRow,
  TableHead,
  TableHeadContent,
  TableHeadRow,
} from "./styles";

const MonthlyTable = () => {
  const { benefitStore } = useStore();
  const { claimsMonthsData, claimsYears, yearClaimsAmount } = benefitStore;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeadRow>
            <TableHeadContent minWidth={100}>Month</TableHeadContent>
            {claimsYears.map((item) => (
              <TableHeadContent minWidth={100}>{item}</TableHeadContent>
            ))}
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {claimsMonthsData.map((year, index) => (
            <TableBodyRow key={index.toString()}>
              <TableBodyContent minWidth={100}>
                {`#${index + 1}`}
              </TableBodyContent>
              {year.map((month) => (
                <TableBodyContent minWidth={100}>{`$${thousandSeparatorByComma(
                  month
                )}`}</TableBodyContent>
              ))}
            </TableBodyRow>
          ))}
          <TableBodyRow>
            <TableBodyContent minWidth={100}>Total</TableBodyContent>
            {yearClaimsAmount.map((year) => (
              <TableBodyContent minWidth={100}>{`$${thousandSeparatorByComma(
                year
              )}`}</TableBodyContent>
            ))}
          </TableBodyRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default observer(MonthlyTable);
