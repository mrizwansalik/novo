import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardContentLayout from "src/components/Pages/ExistingPlansDashboardContentLayout";
import ExistingPlansPage from "src/components/Pages/ExistingPlansPage";
import ProspectDashboardLayout from "src/components/ProspectDashboardLayout";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";

const DashboardPlansDocumentPage = () => {
  const { brokerProspectsListStore } = useStore();
  const {
    setCurrentProspect,
    setCurrentProspectProgress,
  } = brokerProspectsListStore;
  const { prospectId } = useParams<IParamTypes>();
  const [isLoading, setIsLoading] = useState(true);

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
    <ProspectDashboardLayout>
      <DashboardContentLayout>
        {!isLoading && <ExistingPlansPage />}
      </DashboardContentLayout>
    </ProspectDashboardLayout>
  );
};

export default DashboardPlansDocumentPage;
