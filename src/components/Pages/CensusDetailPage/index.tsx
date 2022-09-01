import React from "react";
import { observer } from "mobx-react";
import CensusDataTable from "./components/CensusDataTable";

const CensusDetailPage = () => {
  return <CensusDataTable />;
};

export default observer(CensusDetailPage);
