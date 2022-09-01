import { NetworkCategory } from "src/constants";
import { IOption } from "src/interfaces/common";

export function getNetworkCategoryOptions(): IOption[] {
  const options: IOption[] = [
    {
      label: "Network",
      value: NetworkCategory.SUB_NETWORK,
    },
    {
      label: "Reference Based Pricing",
      value: NetworkCategory.REFERENCE_BASED_PRICING,
    },
    {
      label: "All Categories",
      value: NetworkCategory.ALL,
    },
  ];

  return options;
}
