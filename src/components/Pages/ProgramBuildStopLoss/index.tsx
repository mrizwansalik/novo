import React, { useEffect } from "react";
import { get, isEmpty } from "lodash";
import { observer } from "mobx-react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import { deleteOrgRecipeStopLoss } from "src/api/orgRecipes";
import { IStopLoss } from "src/interfaces/orgRecipes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import StopLossForm from "./components/StopLossForm";
import {
  ButtonsContainer,
  ComponentContainer,
  Header,
  StopLossContainer,
  StopLossItem,
} from "./programBuildStopLoss.style";
import {
  getFormDefaultValue,
  handleRedirect,
  saveStopLossFunction,
} from "./utils";

const ProgramBuildStopLoss = () => {
  const history = useHistory();
  const {
    brokerageId,
    prospectId,
    recipeId,
    stopLossId,
  } = useParams<IParamTypes>();
  const { pathname } = useLocation();

  const { programStore } = useStore();

  const { orgRecipe } = programStore;
  const stopLossContracts: IStopLoss[] = get(
    orgRecipe,
    "stop_loss_contracts",
    []
  );

  const formControl = useForm({
    defaultValues: getFormDefaultValue(),
  });
  const { reset, handleSubmit } = formControl;

  async function onSaveForm(data, addNew: boolean) {
    try {
      const { currentStopLoss } = data;
      const savedStopLoss = await saveStopLossFunction(
        prospectId,
        recipeId,
        currentStopLoss
      );
      programStore.fetchOrgRecipe(prospectId, recipeId);
      if (addNew) {
        handleRedirect(
          brokerageId,
          prospectId,
          recipeId,
          "",
          history,
          pathname
        );
        reset(getFormDefaultValue());
      } else {
        handleRedirect(
          brokerageId,
          prospectId,
          recipeId,
          savedStopLoss.id,
          history,
          pathname
        );
      }
      toast.success("Stop loss option saved.");
    } catch (e) {
      toast.error("There was an error saving the stop loss option.");
    }
  }

  async function handleDeleteStopLoss(stopLossId) {
    await deleteOrgRecipeStopLoss(brokerageId, recipeId, stopLossId);
    programStore.fetchOrgRecipe(prospectId, recipeId);
  }

  useEffect(() => {
    programStore.fetchOrgRecipe(prospectId, recipeId);
  }, []);

  useEffect(() => {
    if (!isEmpty(orgRecipe) && stopLossId) {
      reset(getFormDefaultValue(orgRecipe, stopLossId));
    }
  }, [stopLossId, orgRecipe]);

  return (
    <FormProvider {...formControl}>
      <ComponentContainer>
        <Header>
          <span>Stop Loss</span>
        </Header>
        <StopLossContainer>
          {Array.isArray(stopLossContracts) &&
            stopLossContracts.map((stopLoss) => (
              <StopLossItem
                key={stopLoss.id}
                isActive={stopLoss.id === stopLossId}
                onClick={() =>
                  handleRedirect(
                    brokerageId,
                    prospectId,
                    recipeId,
                    stopLoss.id,
                    history,
                    pathname
                  )
                }
              >
                {stopLoss.display_name}
              </StopLossItem>
            ))}
        </StopLossContainer>
        <form>
          <StopLossForm />
          <ButtonsContainer>
            <button onClick={handleSubmit((data) => onSaveForm(data, false))}>
              Save
            </button>
            <button onClick={handleSubmit((data) => onSaveForm(data, true))}>
              Save and Add Another Contract
            </button>
          </ButtonsContainer>
        </form>
      </ComponentContainer>
    </FormProvider>
  );
};

export default observer(ProgramBuildStopLoss);
