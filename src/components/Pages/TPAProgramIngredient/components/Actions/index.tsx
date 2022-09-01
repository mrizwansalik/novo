import React from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import SingleSelect from "src/components/SingleSelect";
import useStore from "../../../../../utils/useStore";
import {
  ActionSheetContainer,
  ActionSheetLayout,
  CarrierCount,
  CarrierSearch,
  InputSearch,
  TpaFilter,
} from "../../../TPAListPage/components/ActionBar/style";
import { sortOptions } from "../../../TPAListPage/components/constants/constants";
export const networkIngredientTypes = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Sub-Network",
    value: "sub_network",
  },
  {
    label: "Reference Based Pricing",
    value: "reference_based_pricing",
  },
  {
    label: "Pharmacy Benefit Manager",
    value: "pharmacy_benefit_manager",
  },
  {
    label: "Direct Primary Care",
    value: "direct_primary_care",
  },
  {
    label: "Navigation",
    value: "navigation",
  },
  {
    label: "Medical Management",
    value: "medical_management",
  },
  {
    label: "Virtual Primary Care",
    value: "virtual_primary_care",
  },
  {
    label: "Telehealth",
    value: "tele_health",
  },
  {
    label: "Rx-Solutions",
    value: "rx_solutions",
  },
  {
    label: "Bundled Services",
    value: "bundled_services",
  },
  {
    label: "Misc",
    value: "misc",
  },
  {
    label: "Pass Through Expense",
    value: "pass_through_expense",
  },
];
const ActionBar = () => {
  const { tpaStore } = useStore();
  const {
    sortBy,
    TpaProgramsDisplayList,
    FilterProgramIngredientByTypes,
    FilterProgramIngredientBySubTypes,
    filterTpaProgramIngredient,
  } = tpaStore;
  const history = useHistory();
  const numberOfTPA = TpaProgramsDisplayList.length;

  function handleSort(sortedByOption: any) {
    const sortedByValue = sortedByOption.value;
    FilterProgramIngredientByTypes(sortedByValue);
  }
  const defaultSortByOption = sortOptions.find(
    (option) => option.value === sortBy
  );

  return (
    <ActionSheetContainer>
      <ActionSheetLayout md={12}>
        <CarrierCount>
          <b>{numberOfTPA}</b>{" "}
          {numberOfTPA > 1
            ? `TPA Program Ingredients`
            : `TPA Program Ingredient`}
        </CarrierCount>{" "}
        <CarrierSearch>
          <InputSearch
            placeholder="Find TPAs..."
            onChange={(e) => filterTpaProgramIngredient(e.target.value)}
          />{" "}
        </CarrierSearch>{" "}
        <TpaFilter>
          <SingleSelect
            options={sortOptions}
            valueColor="#6d8491"
            defaultValue={defaultSortByOption}
            onChange={handleSort}
          />
        </TpaFilter>
        &nbsp; &nbsp;
        <TpaFilter>
          <SingleSelect
            options={networkIngredientTypes}
            valueColor="#6d8491"
            defaultValue={defaultSortByOption[0]}
            onChange={(e) => FilterProgramIngredientBySubTypes(e.value)}
          />
        </TpaFilter>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(ActionBar);
