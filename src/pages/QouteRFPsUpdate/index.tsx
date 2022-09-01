import React from "react";
import { observer } from "mobx-react";
import QouteHeader from "src/components/Header/components/QouteHeader";
import PageLayout from "src/components/PageLayout";
import useStore from "src/utils/useStore";
import QouteProposalUpdate from "../../components/Pages/QouteProposalUpdate";
const QouteRFPsList = () => {
  const { brokerProspectsListStore } = useStore();
  return (
    <PageLayout title="Edit Request for Proposal | Novo Connection">
      <>
        <QouteHeader title={brokerProspectsListStore?.currentProspect?.name} />
        <QouteProposalUpdate />
      </>
    </PageLayout>
  );
};

export default observer(QouteRFPsList);
