import { useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import Actionsheet from "./components/Actions";
import Headers from "./components/Headers";
import Template from "./components/Tepmlate";

const QouteRFPsList = () => {
  const { qouteProposalStore, qouteRFPsStore } = useStore();
  const { brokerageId } = useParams<IParamTypes>();
  const { getUnderwriters } = qouteProposalStore;
  useEffect(() => {
    getUnderwriters();
    qouteRFPsStore.getBroker(brokerageId);
  }, []);
  return (
    <>
      <Headers />
      <Actionsheet />
      <Template />
    </>
  );
};

export default observer(QouteRFPsList);
