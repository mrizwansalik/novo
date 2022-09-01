import { useState } from "react";
import {
  AmountGroup,
  CommonInput,
  SaveButton,
  Container,
  CommonLabel,
} from "./planSetInput.styles";

const PlanSetInput = () => {
  const [claimValue, setClaimValue] = useState<number>();

  return (
    <Container>
      <CommonLabel>Build your plans</CommonLabel>
      <AmountGroup md="4">
        <CommonInput
          placeholder="Plan set name"
          onChange={(event) => setClaimValue(event.target.value)}
        />
        <SaveButton disabled={!claimValue}>Add Plan Set</SaveButton>
      </AmountGroup>
    </Container>
  );
};

export default PlanSetInput;
