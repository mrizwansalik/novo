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
      label: "Direct Primary Care",
      value: NetworkCategory.DIRECT_PRIMARY_CARE,
    },
    {
      label: "Virtual Primary Care",
      value: NetworkCategory.VIRTUAL_PRIMARY_CARE,
    },
    {
      label: "Medical Management",
      value: NetworkCategory.MEDICAL_MANAGEMENT,
    },
    {
      label: "Navigation",
      value: NetworkCategory.NAVIGATION,
    },
    {
      label: "Tele Heath",
      value: NetworkCategory.TELE_HEALTH,
    },
    {
      label: "RX Solutions",
      value: NetworkCategory.RX_SOLUTIONS,
    },
    {
      label: "Bundled Services",
      value: NetworkCategory.BUNDLED_SERVICES,
    },
    {
      label: "Misc",
      value: NetworkCategory.MISC,
    },
  ];
  return options;
}
