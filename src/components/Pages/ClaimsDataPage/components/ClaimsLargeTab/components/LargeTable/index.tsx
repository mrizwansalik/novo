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
  EmptyTableRow,
} from "./styles";

const LargeTable = () => {
  const { benefitStore } = useStore();
  const {
    claimsYears,
    yearStopLossClaims,
    totalYearStopLossClaims,
  } = benefitStore;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeadRow>
            <TableHeadContent minWidth={100}></TableHeadContent>
            {claimsYears.map((item, index) => (
              <TableHeadContent minWidth={100}>{item}</TableHeadContent>
            ))}
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {yearStopLossClaims.map((item, index) => (
            <TableBodyRow key={index.toString()}>
              <TableBodyContent minWidth={100}>{index + 1}</TableBodyContent>
              {item.map((stopLossAmount) => (
                <TableBodyContent minWidth={100}>{`$${thousandSeparatorByComma(
                  stopLossAmount
                )}`}</TableBodyContent>
              ))}
            </TableBodyRow>
          ))}
          {totalYearStopLossClaims && totalYearStopLossClaims.length > 0 && (
            <TableBodyRow>
              <TableBodyContent minWidth={100}>Total</TableBodyContent>
              {totalYearStopLossClaims.map((year) => (
                <TableBodyContent minWidth={100}>{`$${thousandSeparatorByComma(
                  year
                )}`}</TableBodyContent>
              ))}
            </TableBodyRow>
          )}
          {!totalYearStopLossClaims ||
            (totalYearStopLossClaims.length === 0 && (
              <EmptyTableRow colSpan={3}>
                There is no large claim yet
              </EmptyTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default observer(LargeTable);
