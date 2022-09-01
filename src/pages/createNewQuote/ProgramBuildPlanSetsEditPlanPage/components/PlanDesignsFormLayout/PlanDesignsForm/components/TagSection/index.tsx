import { observer } from "mobx-react";
import useStore from "src/utils/useStore";
import YearTag from "./components/YearTag";
import { IYearTag } from "./interfaces";
import { TitleSection, TableLabel, RemoveButton } from "./tagSection.styles";
import { enableDelete, getYearTags, onSelectTag } from "./utils";

interface ITagSectionProps {
  onRemove: (yearTag: IYearTag) => void;
}

const TagSection = (props: ITagSectionProps) => {
  const { createQuoteStore, benefitStore } = useStore();
  const { onRemove } = props;
  const years = getYearTags();
  const { claimsData } = benefitStore;

  return (
    <TitleSection
      xl={{ size: 12 }}
      lg={{ size: 12 }}
      md={{ size: 12 }}
      sm={{ size: 12 }}
      xs={{ size: 12 }}
    >
      <TableLabel>
        {Array.isArray(years) &&
          years.map((year: IYearTag, index: number) => (
            <YearTag
              key={index}
              onClick={() => onSelectTag(createQuoteStore, year)}
              onRemove={() => onRemove && onRemove(year)}
              label={year.label}
              includeIcon={enableDelete(claimsData, year.value)}
              active={createQuoteStore.selectedYear === year.label}
            />
          ))}
      </TableLabel>
      <RemoveButton label="Finished" />
    </TitleSection>
  );
};

export default observer(TagSection);
