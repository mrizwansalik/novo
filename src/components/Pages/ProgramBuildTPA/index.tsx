import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import ColNoSpacing from "src/components/ColNoSpacing";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import TPAEditor from "../ProgramBuild/TPAEditor";
import FilterSection from "./components/FilterSection";
import TPAList from "./components/TPAList";
import { Container, HeaderWrapper, Description } from "./TPAListSection.style";
import { initializeFromRecipe } from "./utils";

const TPAListSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { brokerageId, prospectId, recipeId } = useParams<IParamTypes>();
  const { programBuildTpaStore, programStore, censusDetailsStore } = useStore();
  const { censusHumans } = censusDetailsStore;
  const { orgRecipe } = programStore;

  useEffect(() => {
    censusDetailsStore.getCensusHumansList(prospectId);
    programStore.fetchOrgRecipe(prospectId, recipeId);
  }, [prospectId]);

  useEffect(() => {
    const fetchedRequiredData =
      brokerageId &&
      prospectId &&
      Array.isArray(censusHumans) &&
      !isEmpty(orgRecipe);

    if (fetchedRequiredData) {
      initializeFromRecipe(
        brokerageId,
        prospectId,
        censusHumans,
        orgRecipe,
        programBuildTpaStore
      );
    }
  }, [brokerageId, prospectId, censusHumans, orgRecipe]);

  return (
    <Container>
      <HeaderWrapper
        title="Third Party Administrators"
        description={
          <Description>
            <div>
              Select the TPA(s) you want to include from the options below, or
              &nbsp;<a onClick={() => setIsOpen(true)}>add a custom TPA</a>
            </div>
            <span>
              Any vendor you previously selected as well as any default vendors
              recommended by the TPA will be pre-selected for you. However, you
              can customize each TPA to fit your needs
            </span>
          </Description>
        }
      />
      <FilterSection />
      <ColNoSpacing lg="12">
        <TPAList />
      </ColNoSpacing>
      <TPAEditor isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
};

export default observer(TPAListSection);
