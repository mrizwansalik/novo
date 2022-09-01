import { useState } from "react";
import { observer } from "mobx-react";
import Actionsheet from "./components/Actions";
import Headers from "./components/Headers";
import RFPListTable from "./components/RFPListTable";

const QouteRFPsList = () => {
  const [tableDisplay, setTableDisplay] = useState(false);
  return (
    <>
      <Headers display={tableDisplay} setDisplay={setTableDisplay} />
      <Actionsheet display={tableDisplay} />
      <RFPListTable display={tableDisplay} />
    </>
  );
};

export default observer(QouteRFPsList);
