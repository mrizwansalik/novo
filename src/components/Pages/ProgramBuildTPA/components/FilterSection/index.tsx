import { observer } from "mobx-react";
import { ColNoSpacing } from "src/components/Pages/ProspectDashboard/prospectDashboard.styles";
import RowNoSpacing from "src/components/RowNoSpacing";
import useStore from "src/utils/useStore";

import {
  Container,
  SearchInput,
  SearchWrapper,
  SearchIcon,
} from "./filterSection.styles";

const FilterSection = () => {
  const { programBuildTpaStore } = useStore();
  const { tpas, filteredTpas } = programBuildTpaStore;

  function onFilterTpa(word: string) {
    if (!word) {
      programBuildTpaStore.setFilteredTpas(tpas);
    } else {
      const newFiltered = filteredTpas.filter((tpa) =>
        tpa.name.toLowerCase().includes(word.toLowerCase())
      );
      programBuildTpaStore.setFilteredTpas(newFiltered);
    }
  }

  return (
    <Container>
      <RowNoSpacing>
        <ColNoSpacing>
          <SearchWrapper>
            <SearchInput
              placeholder="Search"
              onChange={(e) => onFilterTpa(e.target.value)}
            />
            <SearchIcon iconName="grey_search.png" />
          </SearchWrapper>
        </ColNoSpacing>
      </RowNoSpacing>
    </Container>
  );
};

export default observer(FilterSection);
