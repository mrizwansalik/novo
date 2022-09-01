import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ColNoSpacing } from "src/components/Pages/ProspectDashboard/prospectDashboard.styles";
import RowNoSpacing from "src/components/RowNoSpacing";
import { BuildNetworkFormValues } from "src/constants";
import { IOption } from "src/types";
import {
  getNetworkCategoryOptions,
  getSolutionPartnersOptions,
} from "src/utils/programBuild";
import {
  Container,
  SearchInput,
  CategorySelect,
  SearchWrapper,
  SearchIcon,
} from "./filterSection.styles";

interface IFilterSectionProps {
  isNetwork?: boolean;
  isSolutionPartners?: boolean;
  filterValue?: IOption;
}

const FilterSection = (props: IFilterSectionProps) => {
  const { isNetwork, isSolutionPartners, filterValue } = props;
  const [options, setOptions] = useState([]);

  const { control } = useFormContext();

  const hasCategorySelect = isNetwork || isSolutionPartners;

  useEffect(() => {
    let allOptions = [];
    if (isNetwork) {
      allOptions = getNetworkCategoryOptions();
    }
    if (isSolutionPartners) {
      allOptions = getSolutionPartnersOptions();
    }
    setOptions(allOptions);
  }, [isNetwork, isSolutionPartners]);

  return (
    <Container>
      <RowNoSpacing>
        <ColNoSpacing>
          <SearchWrapper>
            <Controller
              name={BuildNetworkFormValues.SEARCH_KEYWORD}
              control={control}
              render={({ field }) => (
                <SearchInput {...field} placeholder="Search" />
              )}
            />
            <SearchIcon iconName="grey_search.png" />
          </SearchWrapper>
        </ColNoSpacing>
        {hasCategorySelect && (
          <ColNoSpacing>
            <Controller
              name={BuildNetworkFormValues.CATEGORY_OPTION}
              control={control}
              defaultValue={options[0]}
              render={({ field }) => (
                <CategorySelect
                  {...field}
                  options={options}
                  value={filterValue}
                />
              )}
            />
          </ColNoSpacing>
        )}
      </RowNoSpacing>
    </Container>
  );
};

export default FilterSection;
