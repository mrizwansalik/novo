import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import ProgramDetailPage from "src/components/Pages/ProgramDetailPage";
import ProspectDashboardLayout from "src/components/ProspectDashboardLayout";
import { IParamTypes } from "src/types";
import { LoadingSpinner } from "src/components/PageLayout/pageLayout.style";
import useStore from "src/utils/useStore";
const ProgramDetail = () => {
  const { prospectId, programId } = useParams<IParamTypes>();
  const { illustrativeStore } = useStore();
  const { getIllustrative, summaryPrice } = illustrativeStore;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getIllustrative(prospectId, programId);
    summaryPrice(prospectId);
    setIsLoading(false);
  }, []);
  return (
    <ProspectDashboardLayout title="Program Detail | Novo Connection">
      <>
        {isLoading && (
          <LoadingSpinner>
            <div></div>
          </LoadingSpinner>
        )}
        <ProgramDetailPage />
      </>
    </ProspectDashboardLayout>
  );
};

export default observer(ProgramDetail);
