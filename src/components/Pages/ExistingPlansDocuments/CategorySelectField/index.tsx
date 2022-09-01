import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { updateOrg } from "src/api/org";
import { IExistingPlanDocumentTypeChoice } from "src/constants/quote";
import { IDocument, IExistingPlanDocument } from "src/interfaces/document";
import useStore from "src/utils/useStore";
import { ComponentContainer, StyledSelect } from "./categorySelectField.style";

interface ICategorySelectFieldProps {
  file: IExistingPlanDocument;
  categoryTypes: IExistingPlanDocumentTypeChoice[];
}

const CategorySelectField = ({
  file,
  categoryTypes,
}: ICategorySelectFieldProps) => {
  const [category, setCategory] = useState("");
  const { onboardingQuoteStore, existingPlansDocumentsStore } = useStore();
  const { prospectDetail } = onboardingQuoteStore;

  const currentCategory = get(file, "category");

  const categoryOptions = categoryTypes.map((type) => ({
    label: type.name,
    value: type.tag,
  }));

  const selectedCategoryOption = categoryOptions.find(
    (option) => option.value === category
  );

  async function handleChangeCategory(selected) {
    try {
      setCategory(selected.value);
      file.category = category;
      const currentPlanDocuments: IDocument[] = get(
        prospectDetail,
        "generic_field_responses.plan_documents",
        []
      );
      const newPlanDocuments = currentPlanDocuments.map((document) => {
        if (document.id === file.file.id) {
          document.tags = selected.value;
        }
        return document;
      });
      prospectDetail.generic_field_responses.plan_documents = newPlanDocuments;
      const updatedProspect = await updateOrg(prospectDetail);
      onboardingQuoteStore.setProspectDetail(updatedProspect);
    } catch (e) {}
  }

  useEffect(() => {
    setCategory(currentCategory);
  }, [currentCategory]);

  return (
    <ComponentContainer>
      <StyledSelect
        menuPortalTarget={document.querySelector("body")}
        options={categoryOptions}
        value={selectedCategoryOption}
        onChange={(e) => handleChangeCategory(e)}
      />
    </ComponentContainer>
  );
};

export default CategorySelectField;
