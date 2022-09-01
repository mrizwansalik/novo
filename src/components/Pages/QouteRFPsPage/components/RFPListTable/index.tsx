import { useState } from "react";
import { cloneDeep } from "lodash";
import { observer } from "mobx-react";
import { ITableHeader } from "src/interfaces/common";
import useStore from "src/utils/useStore";
import DocumentTable from "./components/DocumentTable";
import RFPTable from "./components/RFPTable";
import { RFPContainer } from "./style";

const CensusDataTable = ({ display }) => {
  const { qouteRFPsStore } = useStore();
  const [selectedHumans, setSelectedHuman] = useState({});
  const [tableSelect, setTableSelect] = useState(true);
  const { qouteRFPs } = qouteRFPsStore;
  function onSelectAll(isSelectAll: boolean) {
    // setSelectedHuman({});
    // if (isSelectAll) {
    //   const selected = {};
    //   flatHumans.forEach((human) => {
    //     selected[human.id] = true;
    //   });
    //   setSelectedHuman(selected);
    // }
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

  // useEffect(() => {
  //   if (prospectId) {
  //     censusDetailsStore.initProspectCensusDetails(prospectId);
  //   }
  // }, [prospectId]);

  // useEffect(() => {
  //   setSelectedHuman({});
  // }, [filteredHumans]);

  const DocumentHeaderList: ITableHeader[] = [
    { Header: "Name", accessor: "", width: "40%" },
    { Header: "Shared With", accessor: "", width: "20%" },
    { Header: "Modified", accessor: "", width: "20%" },
    { Header: "Category", accessor: "", width: "40%" },
  ];

  return (
    // <TableContainer>
    <RFPContainer>
      {display ? (
        <DocumentTable qouteRFPs={qouteRFPs} />
      ) : (
        <RFPTable qouteRFPs={qouteRFPs} />
      )}
    </RFPContainer>
  );
};
export default observer(CensusDataTable);
