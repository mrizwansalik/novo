import { observer } from "mobx-react";
import ClaimsDataContentLayout from "src/components/Pages/ClaimsDataPage/components/ClaimsDataPageLayout";
import ClaimsDocumentTab from "src/components/Pages/ClaimsDataPage/components/ClaimsDocumentTab";
import ProspectDashboardLayout from "src/components/ProspectDashboardLayout";
const ClaimsDocumentsLayout = () => {
  return (
    <ProspectDashboardLayout>
      <ClaimsDataContentLayout>
        <ClaimsDocumentTab />
      </ClaimsDataContentLayout>
    </ProspectDashboardLayout>
  );
};

export default observer(ClaimsDocumentsLayout);
