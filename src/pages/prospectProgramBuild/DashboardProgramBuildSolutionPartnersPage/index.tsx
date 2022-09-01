import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router";
import SolutionPartnersEditor from "src/components/Pages/ProgramBuild/SolutionPartnersEditor";
import { handleSolutionPartnersForm } from "src/components/Pages/ProgramBuild/SolutionPartnersEditor/utils";
import SolutionPartnersProgramSection from "src/components/Pages/ProgramBuild/SolutionPartnersProgramSection";
import ProgramBuildDashboardLayout from "src/components/ProgramBuildDashboardLayout";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";

const DashboardProgramBuildSolutionPartnersPage = () => {
  const [isCreatePartnerModalOpen, setIsCreatePartnerModalOpen] = useState(
    false
  );
  const { prospectId, recipeId } = useParams<IParamTypes>();

  const methods = useForm();
  const { getValues, reset } = methods;

  const { programBuildStore } = useStore();

  return (
    <ProgramBuildDashboardLayout
      title="Select Vendors | Novo Connection"
      step={3}
    >
      <>
        <SolutionPartnersProgramSection
          onCreate={() => setIsCreatePartnerModalOpen(true)}
        />
        <FormProvider {...methods}>
          <SolutionPartnersEditor
            onSave={() => {
              handleSolutionPartnersForm(
                getValues,
                reset,
                programBuildStore,
                prospectId,
                recipeId
              );
              setIsCreatePartnerModalOpen(false);
            }}
            onClose={() => setIsCreatePartnerModalOpen(false)}
            isOpen={isCreatePartnerModalOpen}
          />
        </FormProvider>
      </>
    </ProgramBuildDashboardLayout>
  );
};

export default DashboardProgramBuildSolutionPartnersPage;
