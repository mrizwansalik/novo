import { observer } from "mobx-react";
import ClaimsDataContentLayout from "src/components/Pages/ClaimsDataPage/components/ClaimsDataPageLayout";
import ClaimsLargeTab from "src/components/Pages/ClaimsDataPage/components/ClaimsLargeTab";
import ProspectDashboardLayout from "src/components/ProspectDashboardLayout";
const ClaimsLargeLayout = () => {
  return (
    <ProspectDashboardLayout>
      <ClaimsDataContentLayout>
        <ClaimsLargeTab />
      </ClaimsDataContentLayout>
    </ProspectDashboardLayout>
  );
};

export default observer(ClaimsLargeLayout);
