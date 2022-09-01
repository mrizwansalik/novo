import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { LoadingSpinner } from "src/components/PageLayout/pageLayout.style";
import ProgramEditPage from "src/components/Pages/ProgramEditPage";
import ProspectDashboardLayout from "src/components/ProspectDashboardLayout";
const ProgramDetail = () => {
  const { prospectId, programId } = useParams<IParamTypes>();
  const [isLoading, setIsLoading] = useState(true);
  const { illustrativeStore } = useStore();
  const { getIllustrative, summaryPrice } = illustrativeStore;
  useEffect(() => {
    getIllustrative(prospectId, programId);
    summaryPrice(prospectId);
    setIsLoading(false);
  }, []);
  return (
    <ProspectDashboardLayout title="Edit Program | Novo Connection">
      <>
        {" "}
        {isLoading && (
          <LoadingSpinner>
            <div></div>
          </LoadingSpinner>
        )}
        <ProgramEditPage />
      </>
    </ProspectDashboardLayout>
  );
};

export default observer(ProgramDetail);
