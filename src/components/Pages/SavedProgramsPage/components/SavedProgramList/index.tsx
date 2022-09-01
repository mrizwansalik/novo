import React, { useState } from "react";

import { observer } from "mobx-react";

import useStore from "../../../../../utils/useStore";
import DataCard from "../DataCard";

const SavedProgramsList = () => {
  const { savedProgramStore } = useStore();
  const [stopLossArrow, setStopLossArrow] = useState(false);
  const [expensesArrow, setExpensesArrow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [itemId, setItemId] = useState(3);
  const [nameEdit, setNameEdit] = useState(false);
  const {
    savedProgramDisplayList,
    UpdateSavedProgram,
    DeleteSavedProgram,
  } = savedProgramStore;
  return (
    <div>
      {savedProgramDisplayList?.map((item, index) => {
        return (
          <DataCard
            data={item}
            index={index}
            update={UpdateSavedProgram}
            onDelete={DeleteSavedProgram}
          />
        );
      })}
    </div>
  );
};

export default observer(SavedProgramsList);
