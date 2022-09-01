import moment from "moment";
import { getMonthName } from "src/constants/time/time";
import { IClaimsData } from "src/interfaces/benefit";
import { IOption } from "src/interfaces/common";
import BenefitStore from "src/stores/benefitStore";
import { Reset } from "src/types/hookForm";
import { thousandSeparatorByComma } from "src/utils/form";
import { defaultMonthlyClaims } from "../constants";
import { IClaimsHistoryForm } from "../interfaces";
import { getAverageRxPlan, getPaidStatus, getPlanTypeOptions } from "./options";

export function handleInitForm(
  benefitStore: BenefitStore,
  reset: Reset,
  year: Number
): void {
  if (!Array.isArray(benefitStore?.claimsData)) return;
  const claimsData: IClaimsData[] = benefitStore?.claimsData || [];
  const foundClaimsData = claimsData?.find(
    (claimsDataDetail: IClaimsData) => claimsDataDetail?.year === year
  );

  const formValues: IClaimsHistoryForm = {
    assumedDiscount: foundClaimsData?.assumed_discount?.toString() || "0",
    contractLength: foundClaimsData?.contract_length?.toString() || "0",
    averageNumberOfEmployee:
      foundClaimsData?.experience_average_employees?.toString() || "0",
    averageCoinsurance:
      foundClaimsData?.experience_coinsurance?.toString() || "0",
    averageDeductive: foundClaimsData?.experience_deductible?.toString() || "0",
    averageOOPM: foundClaimsData?.experience_oop_max?.toString() || "0",
    ...(foundClaimsData?.experience_plan_type && {
      planType: getPlanTypeOptions()?.find(
        (planType: IOption) =>
          planType?.value === foundClaimsData?.experience_plan_type
      ),
    }),
    averageRxPlan: getAverageRxPlan()?.find(
      (averageRxPlan: IOption) =>
        averageRxPlan?.value === foundClaimsData?.experience_rx
    ),
    paidStatus: getPaidStatus()?.find(
      (paidStatus: IOption) =>
        paidStatus?.value === foundClaimsData?.paid_status
    ),
    paidThroughYear: {
      label: (foundClaimsData?.paid_through_date
        ? moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
        : moment()
      )
        .toDate()
        .getFullYear()
        .toString(),
      value: (foundClaimsData?.paid_through_date
        ? moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
        : moment()
      )
        .toDate()
        .getFullYear(),
    },
    paidThroughMonth: {
      label: getMonthName(
        (foundClaimsData?.paid_through_date
          ? moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
          : moment()
        )
          .toDate()
          .getMonth()
      ),
      value:
        (foundClaimsData?.paid_through_date
          ? moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
          : moment()
        )
          .toDate()
          .getMonth() + 1,
    },
    paidThroughDate: {
      label: (foundClaimsData?.paid_through_date
        ? moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
        : moment()
      )
        .toDate()
        .getDate()
        .toString(),
      value: moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
        .toDate()
        .getDate(),
    },
    planEffectiveYear: {
      label: (foundClaimsData?.start_date
        ? moment(foundClaimsData?.start_date, "YYYY-MM-DD")
        : moment()
      )
        .toDate()
        .getFullYear()
        .toString(),
      value: (foundClaimsData?.start_date
        ? moment(foundClaimsData?.start_date, "YYYY-MM-DD")
        : moment()
      )
        .toDate()
        .getFullYear(),
    },
    planEffectiveMonth: {
      label: getMonthName(
        (foundClaimsData?.start_date
          ? moment(foundClaimsData?.start_date, "YYYY-MM-DD")
          : moment()
        )
          .toDate()
          .getMonth()
      ),
      value:
        (foundClaimsData?.start_date
          ? moment(foundClaimsData?.start_date, "YYYY-MM-DD")
          : moment()
        )
          .toDate()
          .getMonth() + 1,
    },
    largeClaimAmount: foundClaimsData?.stop_loss_claims || [],
    monthlyClaim: Array.isArray(foundClaimsData?.monthly_claims)
      ? foundClaimsData?.monthly_claims?.map((monthlyClaimDetail: number) => ({
          amount: thousandSeparatorByComma(monthlyClaimDetail),
          checked: true,
        }))
      : defaultMonthlyClaims,
  };
  reset(formValues);
}
