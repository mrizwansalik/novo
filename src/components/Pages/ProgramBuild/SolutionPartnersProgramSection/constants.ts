import { NetworkCategory } from "src/constants";
import { IOption } from "src/interfaces/common";

export function getSolutionPartnersCategory(): IOption[] {
  const options: IOption[] = [
    {
      label: "Directed Primary Care",
      value: NetworkCategory.DIRECT_PRIMARY_CARE,
    },
    {
      label: "Telehealth",
      value: NetworkCategory.TELE_HEALTH,
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
      label: "Misc",
      value: NetworkCategory.MISC,
    },
    {
      label: "Bundled Services",
      value: NetworkCategory.BUNDLED_SERVICES,
    },
    {
      label: "Virtual Primary Care",
      value: NetworkCategory.VIRTUAL_PRIMARY_CARE,
    },
    {
      label: "Rx-Solutions",
      value: NetworkCategory.RX_SOLUTIONS,
    },
  ];

  return options;
}
