import React from "react";
import SingleSelect from "src/components/SingleSelect";
import {
  StopLossContainer,
  StopLossMenuItem,
  StopLossMenuHeading,
  StopLossMenuRow,
  StyledLabel,
  ParticipantItemHeading,
  StyledInput,
} from "./style";
const Participant = () => {
  return (
    <StopLossContainer>
      {/* <StopLossItem> */}
      <StopLossMenuHeading>
        <StopLossMenuItem md={3}>Census</StopLossMenuItem>
        <StopLossMenuItem md={2}>4 EE</StopLossMenuItem>
        <StopLossMenuItem md={2}>1 ES</StopLossMenuItem>
        <StopLossMenuItem md={2}>2 EC</StopLossMenuItem>
        <StopLossMenuItem md={2}>4 EF</StopLossMenuItem>
        <StopLossMenuItem md={1}>
          <StyledLabel> n/a W</StyledLabel>
        </StopLossMenuItem>
      </StopLossMenuHeading>
      <StopLossMenuRow>
        <StopLossMenuItem md={4}>
          <ParticipantItemHeading>
            <StopLossMenuItem md={5}>
              <StyledLabel>PPO 2000/80</StyledLabel>
            </StopLossMenuItem>
            <StopLossMenuItem md={7}>
              <StyledLabel> $2000/ 80%/ $4000</StyledLabel>
            </StopLossMenuItem>
          </ParticipantItemHeading>
        </StopLossMenuItem>
        <StopLossMenuItem md={6}>
          <ParticipantItemHeading>
            <StopLossMenuItem md={2}>
              <StyledLabel>EE</StyledLabel>
              <StyledInput value={0} />
            </StopLossMenuItem>
            <StopLossMenuItem></StopLossMenuItem>
            <StopLossMenuItem md={2}>
              <StyledLabel>ES</StyledLabel>
              <StyledInput value={0} />
            </StopLossMenuItem>
            <StopLossMenuItem></StopLossMenuItem>
            <StopLossMenuItem md={2}>
              <StyledLabel>EC</StyledLabel>
              <StyledInput value={0} />
            </StopLossMenuItem>
            <StopLossMenuItem></StopLossMenuItem>
            <StopLossMenuItem md={2}>
              <StyledLabel>EF</StyledLabel>
              <StyledInput value={0} />
            </StopLossMenuItem>
          </ParticipantItemHeading>
        </StopLossMenuItem>
        <StopLossMenuItem md={2}>
          <SingleSelect />
        </StopLossMenuItem>
      </StopLossMenuRow>
      {/* </StopLossItem> */}
    </StopLossContainer>
  );
};

export default Participant;
