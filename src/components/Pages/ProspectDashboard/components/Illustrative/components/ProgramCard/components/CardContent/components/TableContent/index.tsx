import { get } from "lodash";
import { CONDENSE_TIER } from "src/constants";
import { ICarrierPlan, IVersion } from "src/interfaces/benefit";
import { formatMoney } from "src/utils/formatMoney";
import Rows from "./components/Rows";
import { TableContainer, TableRow, Divider } from "./tableContent.styles";

interface ITableContentProps {
  program: ICarrierPlan;
  version: IVersion;
}

const TableContent = ({ program, version }: ITableContentProps) => {
  const totalAnnualCostNoCorridor = get(
    version,
    "total_annual_cost_no_corridor",
    0
  );
  const riskCorridor = get(version, "risk_corridor");
  const totalAnnualMaximumCost = get(version, "total_annual_maximum_cost", 0);
  const totalAnnualAdminFees = get(version, "total_annual_admin_fees", 0);
  const totalAnnualStopLossCost = get(
    version,
    "total_annual_stop_loss_cost",
    0
  );
  const totalExpectedClaimsFund = get(version, "total_expected_claims_fund", 0);

  return (
    <TableContainer>
      <TableRow md="12">
        <Rows
          title="Expected Cost"
          value={`${formatMoney(totalAnnualCostNoCorridor, {
            fraction_digits: 0,
            force_fractions: false,
            condense: true,
            condense_tier: CONDENSE_TIER.M,
            sig_figs: true,
            sig_fig_places: 3,
          })}`}
        />
      </TableRow>
      <TableRow md="12">
        <Rows
          title="Risk Corridor"
          value={`${formatMoney(riskCorridor, {
            fraction_digits: 0,
            force_fractions: false,
            condense: true,
            condense_tier: CONDENSE_TIER.M,
            sig_figs: true,
            sig_fig_places: 3,
          })}`}
        />
      </TableRow>
      <Divider />
      <TableRow md="12">
        <Rows
          title="Max Cost"
          value={`${formatMoney(totalAnnualMaximumCost, {
            fraction_digits: 0,
            force_fractions: false,
            condense: true,
            condense_tier: CONDENSE_TIER.M,
            sig_figs: true,
            sig_fig_places: 3,
          })}`}
        />
      </TableRow>
      <Divider />
      <TableRow md="12">
        <Rows
          title="Admin"
          value={`${formatMoney(totalAnnualAdminFees, {
            fraction_digits: 0,
            force_fractions: false,
            condense: true,
            condense_tier: CONDENSE_TIER.M,
            sig_figs: true,
            sig_fig_places: 3,
          })}`}
        />
      </TableRow>
      <TableRow md="12">
        <Rows
          title="Stop Loss"
          value={`${formatMoney(totalAnnualStopLossCost, {
            fraction_digits: 0,
            force_fractions: false,
            condense: true,
            condense_tier: CONDENSE_TIER.M,
            sig_figs: true,
            sig_fig_places: 3,
          })}`}
        />
      </TableRow>
      <TableRow md="12">
        <Rows
          title="Expected Claims"
          value={`${formatMoney(totalExpectedClaimsFund, {
            fraction_digits: 0,
            force_fractions: false,
            condense: true,
            condense_tier: CONDENSE_TIER.M,
            sig_figs: true,
            sig_fig_places: 3,
          })}`}
        />
      </TableRow>
    </TableContainer>
  );
};

export default TableContent;
