import { Controller, useFormContext } from "react-hook-form";
import { ColNoSpacing } from "src/components/Pages/ProspectDashboard/prospectDashboard.styles";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThirdPartyAdministratorFormValues } from "src/constants";
import {
  Container,
  SearchInput,
  SearchWrapper,
  SearchIcon,
} from "./filterSection.styles";

const FilterSection = () => {
  const { control } = useFormContext();

  return (
    <Container>
      <RowNoSpacing>
        <ColNoSpacing>
          <SearchWrapper>
            <Controller
              name={ThirdPartyAdministratorFormValues.SEARCH_KEYWORD}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <SearchInput {...field} placeholder="Search" />
              )}
            />
            <SearchIcon iconName="grey_search.png" />
          </SearchWrapper>
        </ColNoSpacing>
      </RowNoSpacing>
    </Container>
  );
};

export default FilterSection;
