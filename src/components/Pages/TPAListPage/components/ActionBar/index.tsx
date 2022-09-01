import React from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import SingleSelect from "src/components/SingleSelect";
import routes from "src/routes";
import useStore from "../../../../../utils/useStore";
import { sortOptions } from "../constants/constants";

import {
  AddButton,
  ActionSheetContainer,
  AddIcon,
  AddLabel,
  ActionSheetLayout,
  CarrierCount,
  CarrierSearch,
  InputSearch,
  TpaFilter,
} from "./style";
const ActionBar = ({ setOpenModal }) => {
  const { tpaStore } = useStore();
  const { TPADisplayList, sortBy, FilterByTypes } = tpaStore;
  const history = useHistory();
  const numberOfTPA = TPADisplayList.length;

  function handleSort(sortedByOption: any) {
    const sortedByValue = sortedByOption.value;
    FilterByTypes(sortedByValue);
  }
  const defaultSortByOption = sortOptions.find(
    (option) => option.value === sortBy
  );

  return (
    <ActionSheetContainer>
      <ActionSheetLayout md={12}>
        <CarrierCount>
          <b>{numberOfTPA}</b> {numberOfTPA > 1 ? `TPAs` : `TPA`}
        </CarrierCount>{" "}
        <CarrierSearch>
          <InputSearch
            placeholder="Find TPAs..."
            onChange={(e) => tpaStore.filterDisplayList(e.target.value)}
          />{" "}
        </CarrierSearch>{" "}
        Type:&nbsp;
        <TpaFilter>
          <SingleSelect
            options={sortOptions}
            valueColor="#6d8491"
            defaultValue={defaultSortByOption}
            onChange={handleSort}
          />
        </TpaFilter>
        <TpaFilter></TpaFilter>
        <AddButton
          onClick={() => history.push(routes.dashboard.god.tpa.add.value)}
        >
          <AddIcon iconName="plus64px-blue.png" />
          <AddLabel>Add New</AddLabel>
        </AddButton>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(ActionBar);
