import React, { useEffect, useState } from "react";
import { cloneDeep, get } from "lodash";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { IPagination } from "src/components/Table";
import TableWithSelect from "src/components/TableWithSelect";
import { ICensusHuman } from "src/interfaces/census";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import CensusFieldInput from "../CensusFieldInput";
import CensusTableAction from "../CensusTableAction";
import { TableContainer } from "./styles";
import {
  getHeaderList,
  getPaginationAdditionalInformation,
  handleOnChangeField,
} from "./utils";
const CensusDataTable = () => {
  const { censusDetailsStore } = useStore();
  const { prospectId } = useParams<IParamTypes>();
  const [selectedHumans, setSelectedHuman] = useState({});
  const {
    fields,
    numDependents,
    rowPerPage,
    filteredHumans,
    flatHumans,
    humansInView,
    currentPage,
  } = censusDetailsStore;

  const headerList = getHeaderList(fields, numDependents);
  const tableData = handleTableData(humansInView);

  const rowCounts =
    (Array.isArray(filteredHumans) && filteredHumans.length) || 0;
  const pageCount = censusDetailsStore.numPages();
  const pagination: IPagination = {
    rowCounts,
    pageCount,
    rowPerPage,
    includePagination: rowCounts > rowPerPage,
    pageIndex: currentPage,
    goPreviousPage: () =>
      censusDetailsStore.setCurrentPage(Math.max(currentPage - 1, 1)),
    goNextPage: () =>
      censusDetailsStore.setCurrentPage(Math.min(currentPage + 1, pageCount)),
    additionalInformation: getPaginationAdditionalInformation(filteredHumans),
    setRowPerPage: (number) => censusDetailsStore.setRowPerPage(number),
  };

  function handleTableData(humans: ICensusHuman[]) {
    const data = humans.map((human) => {
      const row_number = get(human, "additional_data.row_number");
      const first_name = get(human, "first_name") || "n/a";
      const last_name = get(human, "last_name") || "n/a";
      const plan_name = get(human, "plan_name") || "n/a";

      return {
        ...human,
        row_number,
        first_name,
        last_name,
        plan_name,
        relationship: (
          <CensusFieldInput
            censusHuman={human}
            fieldName="relationship"
            onChange={handleOnChangeField}
          />
        ),
        postal: (
          <CensusFieldInput
            censusHuman={human}
            fieldName="postal"
            onChange={handleOnChangeField}
          />
        ),
        birthday: (
          <CensusFieldInput
            censusHuman={human}
            fieldName="birthday"
            onChange={handleOnChangeField}
          />
        ),
        gender: (
          <CensusFieldInput
            censusHuman={human}
            fieldName="gender"
            onChange={handleOnChangeField}
          />
        ),
        coverage_type: (
          <CensusFieldInput
            censusHuman={human}
            fieldName="coverage_type"
            onChange={handleOnChangeField}
          />
        ),
      };
    });

    return data;
  }

  function onSelectAll(isSelectAll: boolean) {
    setSelectedHuman({});
    if (isSelectAll) {
      const selected = {};
      flatHumans.forEach((human) => {
        selected[human.id] = true;
      });
      setSelectedHuman(selected);
    }
  }

  function onSelectHuman(humanId: string, isSelect: boolean) {
    const selected = cloneDeep(selectedHumans);
    if (isSelect) {
      selected[humanId] = true;
    } else {
      selected[humanId] = false;
    }
    setSelectedHuman(selected);
  }

  useEffect(() => {
    if (prospectId) {
      censusDetailsStore.initProspectCensusDetails(prospectId);
    }
  }, [prospectId]);

  useEffect(() => {
    setSelectedHuman({});
  }, [filteredHumans]);

  return (
    <TableContainer>
      <div>
        <CensusTableAction selectedHumans={selectedHumans} />
        <TableWithSelect
          headerList={headerList}
          data={tableData}
          // pagination={pagination}
          selectedRow={selectedHumans}
          onSelectRow={onSelectHuman}
          onSelectAll={onSelectAll}
        />
      </div>
    </TableContainer>
  );
};
export default observer(CensusDataTable);
