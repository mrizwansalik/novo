import { useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import ProgramList from "./components/TpaProgramIngredientList";

const TPAProgramIndredient = () => {
  const { tpaId } = useParams<IParamTypes>();
  const { tpaStore, programIngredientStore } = useStore();

  useEffect(() => {
    tpaStore.getTpaPrograms(tpaId);
    programIngredientStore.getProgramIngredientsList(
      localStorage.getItem("orgId")
    );
  }, []);

  return (
    <>
      <ProgramList />
    </>
  );
};

export default observer(TPAProgramIndredient);
