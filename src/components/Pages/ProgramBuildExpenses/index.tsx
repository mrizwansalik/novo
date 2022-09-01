import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { EmptyExpense } from "src/constants";
import { IParamTypes } from "src/types/router";
import useStore from "src/utils/useStore";
import ExpensesBasicSection from "./components/ExpensesBasicSection";
import OtherExpensesForm from "./components/OtherExpensesForm";
import OtherExpensesSection from "./components/OtherExpensesSection";
import { Container, HeaderWrapper } from "./expenses.style";

const ProgramBuildExpenses = () => {
  const { programBuildExpensesStore } = useStore();
  const { fees } = programBuildExpensesStore;
  const { prospectId, recipeId } = useParams<IParamTypes>();

  useEffect(() => {
    programBuildExpensesStore.getFees(prospectId, recipeId);
  }, [prospectId, recipeId]);

  useEffect(() => {}, [fees]);

  const otherFees = fees ? fees.filter((i) => i.fee_type === "other") : [];
  const advisorFee = fees.find((i) => i.fee_type === "broker") || {
    ...EmptyExpense,
    name: "Advisor Fee",
    fee_type: "broker",
  };

  async function handleSaveAndAddExpense(data) {
    try {
      if (!data.id) {
        programBuildExpensesStore.addExpenseAction(prospectId, recipeId, data);
      } else {
        programBuildExpensesStore.updateExpenseAction(
          prospectId,
          recipeId,
          data
        );
      }
      toast.success(`${data.name} saved`);
    } catch (e) {
      console.error(e);
      toast.error("error");
    }
  }

  async function handleDeleteExpense(expenseId) {
    try {
      programBuildExpensesStore.deleteExpenseAction(
        prospectId,
        recipeId,
        expenseId
      );
    } catch (e) {
      console.error(e);
      toast.error("error");
    }
  }

  return (
    <Container>
      <HeaderWrapper title="Third Party Administrators" description="" />
      <ExpensesBasicSection
        advisorFee={advisorFee}
        handleSaveAndAddExpense={handleSaveAndAddExpense}
        handleDeleteExpense={handleDeleteExpense}
      />
      <OtherExpensesSection />
      {Array.isArray(otherFees) &&
        [EmptyExpense, ...otherFees].map((fee, ind) => (
          <OtherExpensesForm
            fee={fee}
            key={ind}
            handleSaveAndAddExpense={handleSaveAndAddExpense}
            handleDeleteExpense={handleDeleteExpense}
          />
        ))}
    </Container>
  );
};

export default observer(ProgramBuildExpenses);
