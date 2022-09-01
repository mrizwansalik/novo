import { useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import QouteHeader from "src/components/Header/components/QouteHeader";
import PageLayout from "src/components/PageLayout";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import QouteRFPs from "../../components/Pages/QouteRFPsPage";
const QouteRFPsList = () => {
  const { prospectId } = useParams<IParamTypes>();
  const { qouteRFPsStore, brokerProspectsListStore } = useStore();
  const { currentProspect, setCurrentProspect } = brokerProspectsListStore;
  const { qouteRFPList, getRfpSet, getQouteOrg } = qouteRFPsStore;
  useEffect(() => {
    qouteRFPList(prospectId);
    getRfpSet(prospectId);
    getQouteOrg(prospectId);
    setCurrentProspect(prospectId);
  }, []);
  return (
    <PageLayout title="RFPs | Novo Connection">
      <>
        <QouteHeader title={currentProspect?.name} />
        <QouteRFPs />
      </>
    </PageLayout>
  );
};

export default observer(QouteRFPsList);
