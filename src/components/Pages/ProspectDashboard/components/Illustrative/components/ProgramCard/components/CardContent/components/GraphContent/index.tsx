import React, { Fragment } from "react";
import { get } from "lodash";
import DonutChart, { IDonutDataset } from "src/components/Charts/DonutChart";
import { CONDENSE_TIER } from "src/constants";
import { ICarrierPlan, IVersion } from "src/interfaces/benefit";
import { formatMoney } from "src/utils/formatMoney";
import {
  ChartSpacing,
  ColNoSpacing,
  OverviewLabel,
  OverviewValue,
  OverviewSpacing,
  RowNoSpacing,
  EmptyGraph,
  EmptyGraphContainer,
} from "./graphContent.styles";

interface IGraphContentProps {
  program: ICarrierPlan;
  version: IVersion;
}

const GraphContent = ({ program, version }: IGraphContentProps) => {
  const totalAnnualMaximumCost = get(version, "total_annual_maximum_cost", 0);
  const totalAnnualCostNoCorridor = get(
    version,
    "total_annual_cost_no_corridor"
  );
  const riskCorridor = get(version, "risk_corridor");
  const totalExpectedClaimsFund = get(version, "total_expected_claims_fund");
  const totalAnnualStopLossCost = get(version, "total_annual_stop_loss_cost");
  const totalAnnualAdminFees = get(version, "total_annual_admin_fees");

  const mockDatasets: IDonutDataset = {
    labels: ["Expected Claims", "Risk Corridor", "Stop loss", "Admin"],
    backgroundColor: ["#1fb2ff", "#ffb42e", "#4b27e6", "#fa39e8"],
    data: [
      totalExpectedClaimsFund,
      riskCorridor,
      totalAnnualStopLossCost,
      totalAnnualAdminFees,
    ],
  };
  return (
    <Fragment>
      <ChartSpacing md="12">
        {totalAnnualMaximumCost ? (
          <DonutChart
            dataset={mockDatasets}
            hiddenValue
            cutout={60}
            customOverlay={
              <ColNoSpacing md="12">
                <OverviewLabel>Max Cost</OverviewLabel>
                <OverviewValue>
                  {formatMoney(totalAnnualMaximumCost, {
                    fraction_digits: 0,
                    force_fractions: false,
                    condense: true,
                    condense_tier: CONDENSE_TIER.M,
                    sig_figs: true,
                    sig_fig_places: 3,
                  })}
                </OverviewValue>
              </ColNoSpacing>
            }
          />
        ) : (
          <EmptyGraphContainer>
            <EmptyGraph md="8" />
            <ColNoSpacing md="4">
              <OverviewLabel>Max Cost</OverviewLabel>
              <OverviewValue>
                {formatMoney(totalAnnualMaximumCost, {
                  fraction_digits: 0,
                  force_fractions: false,
                  condense: true,
                  condense_tier: CONDENSE_TIER.M,
                  sig_figs: true,
                  sig_fig_places: 3,
                })}
              </OverviewValue>
            </ColNoSpacing>
          </EmptyGraphContainer>
        )}
      </ChartSpacing>
      <OverviewSpacing>
        <RowNoSpacing>
          <ColNoSpacing md="6">
            <OverviewLabel>Expected Cost</OverviewLabel>
            <OverviewValue>
              {formatMoney(totalAnnualCostNoCorridor, {
                fraction_digits: 0,
                force_fractions: false,
                condense: true,
                condense_tier: CONDENSE_TIER.M,
                sig_figs: true,
                sig_fig_places: 3,
              })}
            </OverviewValue>
          </ColNoSpacing>
          <ColNoSpacing md="6">
            <OverviewLabel>Risk Corridor</OverviewLabel>
            <OverviewValue>
              {formatMoney(riskCorridor, {
                fraction_digits: 0,
                force_fractions: false,
                condense: true,
                condense_tier: CONDENSE_TIER.M,
                sig_figs: true,
                sig_fig_places: 3,
              })}
            </OverviewValue>
          </ColNoSpacing>
        </RowNoSpacing>
      </OverviewSpacing>
    </Fragment>
  );
};

export default GraphContent;
