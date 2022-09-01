import React from "react";
import QouteHeader from "src/components/Header/components/QouteHeader";
import PageLayout from "src/components/PageLayout";
import OldDash from "src/components/Pages/OldDash";

const OldDashboard = () => {
  return (
    <PageLayout title="Get a Qoute | Novo Connection">
      <>
        <QouteHeader title="New qoute" />
        <OldDash />
      </>
    </PageLayout>
  );
};

export default OldDashboard;
