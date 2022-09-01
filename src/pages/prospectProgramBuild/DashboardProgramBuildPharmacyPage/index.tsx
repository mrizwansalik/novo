import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router";
import NetworkEditor from "src/components/Pages/ProgramBuild/PharmacyBenefitEditor";
import { handleNetworkForm } from "src/components/Pages/ProgramBuild/PharmacyBenefitEditor/utils";
import ProgramSection from "src/components/Pages/ProgramBuild/PharmacyBenefitProgramSection";
import ProgramBuildDashboardLayout from "src/components/ProgramBuildDashboardLayout";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";

const DashboardProgramBuildPharmacyPage = () => {
  const [isCreateNetworkModalOpen, setIsCreateNetworkModalOpen] = useState(
    false
  );
  const { prospectId, recipeId } = useParams<IParamTypes>();

  const methods = useForm();
  const { getValues, reset } = methods;

  const { programBuildStore } = useStore();

  return (
    <ProgramBuildDashboardLayout
      title="Add Pharmacy Benefit Manager | Novo Connection"
      step={2}
    >
      <>
        <ProgramSection onCreate={() => setIsCreateNetworkModalOpen(true)} />
        <FormProvider {...methods}>
          <NetworkEditor
            onSave={() => {
              handleNetworkForm(
                getValues,
                reset,
                programBuildStore,
                prospectId,
                recipeId
              );
              setIsCreateNetworkModalOpen(false);
            }}
            onClose={() => setIsCreateNetworkModalOpen(false)}
            isOpen={isCreateNetworkModalOpen}
          />
        </FormProvider>
      </>
    </ProgramBuildDashboardLayout>
  );
};

export default DashboardProgramBuildPharmacyPage;
