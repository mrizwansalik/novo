import React, { useEffect } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import ColNoSpacing from "src/components/ColNoSpacing";
import { ISubNetwork } from "src/interfaces/network";
import { seedDefaultTPAOptions } from "src/pages/createNewQuote/ProgramBuildThirdPartyAdministratorsPage/utils";
import useStore from "src/utils/useStore";
import FilterSection from "../FilterSection";
import ProgramList from "./components/ProgramList";
import {
  Container,
  HeaderWrapper,
  Description,
  DescriptionLink,
} from "./programSection.styles";

interface IProgramSectionProps {
  onCreate: () => void;
}

const TPAProgramSection = (props: IProgramSectionProps) => {
  const { onCreate } = props;
  const { programBuildStore } = useStore();
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const recipeId: string = get(params, "recipeId", "");
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { setValue } = methods;
  useEffect(() => {
    if (prospectId) {
      programBuildStore.fetchPharmacyBenefitManagers(prospectId);
    }
  }, [prospectId]);

  useEffect(() => {
    if (prospectId && recipeId) {
      programBuildStore.fetchOrgRecipe(prospectId, recipeId);
    }
  }, [prospectId, recipeId]);

  useEffect(() => {
    if (
      programBuildStore?.tpas?.length > 0 &&
      programBuildStore?.networkIngredientWithTPAs?.length > 0
    ) {
      seedDefaultTPAOptions(setValue, programBuildStore);
    }
  }, [
    programBuildStore?.orgRecipe,
    programBuildStore?.tpas,
    programBuildStore?.networkIngredientWithTPAs,
  ]);

  const selectedSubNetworks: ISubNetwork[] =
    programBuildStore?.orgRecipe?.pbms || [];

  return (
    <Container>
      <HeaderWrapper
        title="Third Party Administrators"
        description={
          <Description>
            <span>
              Select the TPA(s) you want to include from the options below, or
            </span>
            <DescriptionLink onClick={onCreate}>
              add a custom TPA
            </DescriptionLink>
            <div>
              Any vendor you previously selected as well as any default vendors
              recommended by the TPA will be pre-selected for you. However, you
              can customize each TPA to fit your needs
            </div>
          </Description>
        }
      />
      <FormProvider {...methods}>
        <FilterSection />
        <ColNoSpacing lg="12">
          <ProgramList selectedSubNetworks={selectedSubNetworks} title="" />
        </ColNoSpacing>
      </FormProvider>
    </Container>
  );
};

export default observer(TPAProgramSection);
