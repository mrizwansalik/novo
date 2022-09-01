import { useState } from "react";
import { observer } from "mobx-react";
import useStore from "src/utils/useStore";
import PlanSetNameTag from "./components/PlanSetNameTag";
import { IYearTag } from "./interfaces";
import { TitleSection, TableLabel } from "./tagSection.styles";
import { getYearTags, onSelectTag } from "./utils";

const TagSection = () => {
  const [editingIndex, setEditingIndex] = useState<number>(0);
  const { createQuoteStore } = useStore();
  const years = getYearTags();

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
            <PlanSetNameTag
              key={index}
              onClick={() => onSelectTag(createQuoteStore, year)}
              label={year.label}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              order={index}
              active={createQuoteStore.selectedYear === year.label}
            />
          ))}
      </TableLabel>
    </TitleSection>
  );
};

export default observer(TagSection);
