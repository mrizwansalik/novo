import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import useStore from "src/utils/useStore";
import { StyledLabel } from "../SubHeader/styles";
import {
  StopLossContainer,
  StopLossItem,
  StopLossMenu,
  StopLossMenuItem,
  StopLossMenuHeading,
  StopLossMenuRow,
} from "./style";

const StopLoss = () => {
  const { illustrativeStore } = useStore();
  const [data, setData]: any = useState({});
  const { illustrative } = illustrativeStore;

  useEffect(() => {
    console.log("firs log", illustrative);
    if (illustrative && illustrative.versions) {
      setData(illustrative?.versions[0]);
    }
  }, [illustrative]);
  return (
    <StopLossContainer>
      <StopLossItem md={3}>
        {illustrative?.versions?.map((item) => {
          return (
            <StopLossMenu onClick={() => setData(item)}>
              {item.name}
            </StopLossMenu>
          );
        })}
      </StopLossItem>
      <StopLossItem md={9}>
        <StopLossMenuHeading>
          <StopLossMenuItem md={3}>
            <StopLossMenuRow>
              <StyledLabel>Specific Deductible</StyledLabel>
              <StopLossMenuItem>${data.specific_deductible}</StopLossMenuItem>
            </StopLossMenuRow>
          </StopLossMenuItem>
          <StopLossMenuItem md={3}>
            <StopLossMenuRow>
              <StyledLabel>Aggregate Attach Point</StyledLabel>
              <StopLossMenuItem>
                {data.aggregate_attachment_percent * 100}%
              </StopLossMenuItem>
            </StopLossMenuRow>
          </StopLossMenuItem>
          <StopLossMenuItem md={6}>
            <StopLossMenuRow>
              <StyledLabel>Contract Type</StyledLabel>
              <StopLossMenuItem>{data.contract_length}</StopLossMenuItem>
            </StopLossMenuRow>
          </StopLossMenuItem>
        </StopLossMenuHeading>
        <StopLossMenuRow>
          <StopLossMenuItem md={3}>
            <StyledLabel>TLO</StyledLabel>
          </StopLossMenuItem>
          <StopLossMenuItem md={9}>
            {data.aggregate_tlo ? "Aggregate" : "N/A"}
          </StopLossMenuItem>
        </StopLossMenuRow>
        <hr style={{ width: "100%" }} />
        <StopLossMenuRow>
          <StopLossMenuItem md={3}>
            <StyledLabel>Funding</StyledLabel>
          </StopLossMenuItem>
          <StopLossMenuItem md={9}>
            {data.has_agg_accommodation || data.has_advanced_specific_funding
              ? ` ${
                  data.has_advanced_specific_funding === true
                    ? "Advanced Specific,"
                    : ""
                } ${
                  data.has_agg_accommodation === true
                    ? "Aggregate Accomodation"
                    : ""
                } `
              : "N/A"}
          </StopLossMenuItem>
        </StopLossMenuRow>
      </StopLossItem>
    </StopLossContainer>
  );
};

export default observer(StopLoss);
