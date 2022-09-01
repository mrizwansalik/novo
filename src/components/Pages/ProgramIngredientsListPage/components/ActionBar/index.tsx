import React from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Col } from "reactstrap";
import SingleSelect from "src/components/SingleSelect";
import routes from "src/routes";
import useStore from "../../../../../utils/useStore";
import { TpaFilter } from "../../../TPAListPage/components/ActionBar/style";
import { sortOptions } from "../../../TPAListPage/components/constants/constants";
import { subTypeOptions } from "../Constants";

import {
  AddButton,
  ActionSheetContainer,
  AddIcon,
  AddLabel,
  ActionSheetLayout,
  InputSearch,
} from "./style";
const ActionBar = ({ setOpenModal }) => {
  const { programIngredientStore } = useStore();
  const {
    programIngredientsDisplayList,
    sortBy,
    FilterByTypes,
    filterDisplayList,
    SubTypeFilter,
    subTypeFilter,
  } = programIngredientStore;
  const history = useHistory();
  const numberOfProgramIngredients = programIngredientsDisplayList.length;

  function handleSort(sortedByOption: any) {
    const sortedByValue = sortedByOption.value;
    FilterByTypes(sortedByValue);
  }
  function handleSubTypeFilter(sortedByOption: any) {
    const sortedByValue = sortedByOption.value;
    SubTypeFilter(sortedByValue);
  }
  const defaultSortByOption = sortOptions.find(
    (option) => option.value === sortBy
  );
  const defaultSubTypeByOption = subTypeOptions.find(
    (option) => option.value === subTypeFilter
  );

  return (
    <ActionSheetContainer>
      <ActionSheetLayout sm={6} xs={12} md={12} lg={12}>
        <Col md={3} lg={3} sm={10} xs={10}>
          <span>
            <b>{numberOfProgramIngredients}</b>
            {numberOfProgramIngredients > 1
              ? `programIngredients`
              : `programIngredient`}
          </span>
        </Col>

        <Col md={3} lg={3} sm={10} xs={10}>
          <InputSearch
            placeholder="Find Program Ingredients..."
            onChange={(e) => filterDisplayList(e.target.value)}
          />
        </Col>

        <Col md={2} lg={2} sm={10} xs={10}>
          <TpaFilter>
            <SingleSelect
              options={sortOptions}
              valueColor="#6d8491"
              defaultValue={defaultSortByOption}
              onChange={handleSort}
            />
          </TpaFilter>
        </Col>

        <Col md={2} lg={3} sm={10} xs={10}>
          <TpaFilter>
            <SingleSelect
              options={subTypeOptions}
              valueColor="#6d8491"
              defaultValue={defaultSubTypeByOption}
              onChange={handleSubTypeFilter}
            />
          </TpaFilter>
        </Col>

        <Col md={2} lg={1} sm={6} xs={8}>
          <AddButton
            onClick={() =>
              history.push(routes.dashboard.god.programIngredients.add.value)
            }
          >
            <AddIcon iconName="plus64px-blue.png" />
            <AddLabel>Add New</AddLabel>
          </AddButton>
        </Col>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(ActionBar);
