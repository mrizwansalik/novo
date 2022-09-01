import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Container, StyledNumberInput } from "./expensesBasicSection.style";

const ExpensesBasicSection = ({
  advisorFee,
  handleSaveAndAddExpense,
  handleDeleteExpense,
}) => {
  const [amount, setAmount] = useState(advisorFee.amount_number);
  useEffect(() => {
    if (advisorFee.amount_number) {
      setAmount(advisorFee.amount_number);
    }
  }, [advisorFee.amount_number]);
  return (
    <Container>
      <StyledNumberInput
        onBlur={(e) =>
          handleSaveAndAddExpense({
            ...advisorFee,
            amount_number: amount,
          })
        }
        onValueChange={({ value }) => setAmount(parseInt(value))}
        thousandSeparator={true}
        value={amount}
        prefix={"$ "}
        allowEmptyFormatting
        isControlled
        label="Advisor Fee (PEPM)"
      />
    </Container>
  );
};

export default observer(ExpensesBasicSection);
