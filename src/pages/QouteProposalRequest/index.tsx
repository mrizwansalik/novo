import React from "react";
import { observer } from "mobx-react";
import QouteHeader from "src/components/Header/components/QouteHeader";
import PageLayout from "src/components/PageLayout";
import useStore from "src/utils/useStore";
import QouteProposal from "../../components/Pages/QouteProposal";
const QouteRFPsList = () => {
  const { brokerProspectsListStore } = useStore();

  return (
    <PageLayout title="Add Request for Proposal | Novo Connection">
      <>
        <QouteHeader title={brokerProspectsListStore?.currentProspect?.name} />
        <QouteProposal />
      </>
    </PageLayout>
  );
};

export default observer(QouteRFPsList);
