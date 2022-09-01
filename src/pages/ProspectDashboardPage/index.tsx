import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import ProspectDashboardLayout from "src/components/ProspectDashboardLayout";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import ProspectDashboard from "../../components/Pages/ProspectDashboard";
import { MainContent } from "./styles";
const ProspectLayout = () => {
  const { prospectId } = useParams<IParamTypes>();
  const { orgStore, brokerProspectsListStore } = useStore();
  const { orgDetail } = orgStore;

  const [isLoading, setIsLoading] = useState(true);
  const {
    setCurrentProspect,
    setCurrentProspectProgress,
    currentProspectProgress,
  } = brokerProspectsListStore;
  useEffect(() => {
    (async () => {
      await Promise.all([
        setCurrentProspect(prospectId),
        setCurrentProspectProgress(prospectId),
      ]);
      setIsLoading(false);
    })();
  }, []);
  return (
    <ProspectDashboardLayout title="Dashboard | Novo Connection">
      <>
        <MainContent>
          <ProspectDashboard />
        </MainContent>
      </>
    </ProspectDashboardLayout>
  );
};

export default observer(ProspectLayout);
