import React from "react";
import NumberInput from "src/components/NumberInput";
import { Container, ContainerItem, StyledInput } from "./styles";

const Expense = ({ advisor, setAdvisor }) => {
  return (
    <Container>
      <ContainerItem md={3}>{advisor?.name}</ContainerItem>
      <ContainerItem md={3}>
        <NumberInput
          value={advisor?.amount_number}
          prefix="$"
          customInput={StyledInput}
          onChange={(e) => {
            console.log(e.target.value);
            setAdvisor({
              ...advisor,
              amount_number: e.target.value,
            });
          }}
        />
      </ContainerItem>
    </Container>
  );
};

export default Expense;
