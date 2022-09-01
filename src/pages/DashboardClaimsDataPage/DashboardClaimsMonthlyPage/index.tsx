import { observer } from "mobx-react";
import ClaimsDataContentLayout from "src/components/Pages/ClaimsDataPage/components/ClaimsDataPageLayout";
import ClaimsMonthlyTab from "src/components/Pages/ClaimsDataPage/components/ClaimsMonthlyTab";
import ProspectDashboardLayout from "src/components/ProspectDashboardLayout";
const ClaimsMonthlyLayout = () => {
  return (
    <ProspectDashboardLayout>
      <ClaimsDataContentLayout>
        <ClaimsMonthlyTab />
      </ClaimsDataContentLayout>
    </ProspectDashboardLayout>
  );
};

export default observer(ClaimsMonthlyLayout);
