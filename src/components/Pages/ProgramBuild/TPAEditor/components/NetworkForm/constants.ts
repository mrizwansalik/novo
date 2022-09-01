import { NetworkAmountType, NetworkCategory } from "src/constants";
import { IOption } from "src/interfaces/common";

export function getAmountTypeOptions(): IOption[] {
  const options: IOption[] = [
    {
      label: "PEPM",
      value: NetworkAmountType.FIXED_PER_EMPLOYEE_PER_MONTH,
    },
    {
      label: "Tiered (per mo)",
      value: NetworkAmountType.FOUR_TIER_FIXED_PER_EMPLOYEE_PER_MONTH,
    },
    {
      label: "One-time Fee",
      value: NetworkAmountType.ONE_TIME_FEE,
    },
    {
      label: "Custom",
      value: NetworkAmountType.CUSTOM_TEXT,
    },
  ];
  return options;
}

export function getSubNetworkTypeOptions(): IOption[] {
  const options: IOption[] = [
    {
      label: "Network",
      value: NetworkCategory.SUB_NETWORK,
    },
    {
      label: "Reference Based Pricing",
      value: NetworkCategory.REFERENCE_BASED_PRICING,
    },
  ];
  return options;
}
