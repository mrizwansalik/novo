import React, { Fragment, useEffect } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import ColNoSpacing from "src/components/ColNoSpacing";
import { BuildNetworkFormValues, NetworkCategory } from "src/constants";
import { IOption } from "src/interfaces/common";
import { ISubNetwork, ISubNetworksTree } from "src/interfaces/network";
import {
  buildSubSolutionPartnersTree,
  getSolutionPartnersOptions,
} from "src/utils/programBuild";
import useStore from "src/utils/useStore";
import FilterSection from "../FilterSection";
import ProgramList from "../ProgramList";
import { getSolutionPartnersCategory } from "./constants";
import {
  Container,
  HeaderWrapper,
  Description,
  DescriptionLink,
} from "./programSection.styles";

interface IProgramSectionProps {
  onCreate: () => void;
}

const SolutionPartnersProgramSection = (props: IProgramSectionProps) => {
  const { onCreate } = props;
  const { programBuildStore } = useStore();
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const recipeId: string = get(params, "recipeId", "");
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { control } = methods;

  const filterCategoryOption: IOption =
    useWatch({
      control,
      name: BuildNetworkFormValues.CATEGORY_OPTION,
    }) || getSolutionPartnersOptions()[0];
  const filterCategory = filterCategoryOption?.value;

  const searchKeyword: string = useWatch({
    control,
    name: BuildNetworkFormValues.SEARCH_KEYWORD,
  });

  useEffect(() => {
    if (prospectId) {
      programBuildStore.fetchCostContainmentVendors(prospectId);
    }
  }, [prospectId]);

  useEffect(() => {
    if (prospectId && recipeId) {
      programBuildStore.fetchOrgRecipe(prospectId, recipeId);
    }
  }, [prospectId, recipeId]);

  const solutionPartnersCategories: IOption[] = getSolutionPartnersCategory();
  const subNetworkTree: ISubNetworksTree = buildSubSolutionPartnersTree(
    programBuildStore?.costContainmentVendors,
    searchKeyword
  );

  const selectedSubNetworks: ISubNetwork[] =
    programBuildStore?.orgRecipe?.cost_containment_vendors || [];

  return (
    <Container>
      <HeaderWrapper
        title="Solution Partners"
        description={
          <Description>
            <span>
              Select the solution partner option(s) you want to include from the
              options below, or
            </span>
            <DescriptionLink onClick={onCreate}>
              add a custom solution partner
            </DescriptionLink>
          </Description>
        }
      />
      <FormProvider {...methods}>
        <FilterSection isSolutionPartners filterValue={filterCategoryOption} />
        {Array.isArray(solutionPartnersCategories) &&
          solutionPartnersCategories?.map(
            (solutionPartnersCategory: IOption, index: number) => (
              <Fragment key={index}>
                {(filterCategory === solutionPartnersCategory?.value ||
                  filterCategory === NetworkCategory.ALL) && (
                  <ColNoSpacing lg="12">
                    <ProgramList
                      subNetworks={get(
                        subNetworkTree,
                        `${solutionPartnersCategory?.value}`,
                        []
                      )}
                      selectedSubNetworks={selectedSubNetworks}
                      title={solutionPartnersCategory?.label}
                    />
                  </ColNoSpacing>
                )}
              </Fragment>
            )
          )}
      </FormProvider>
    </Container>
  );
};

export default observer(SolutionPartnersProgramSection);
