import { NetworkCategory } from "src/constants";

export interface ICategory {
  title: string;
  categoryId: NetworkCategory;
  value: string;
}

export interface IPreviewCard {
  title: string;
  description: string;
  categories: ICategory[];
}

export const mockPrograms: IPreviewCard[] = [
  {
    title: "Summary",
    description: "Required (at least one or more Networks & PBMs are required)",
    categories: [
      {
        categoryId: NetworkCategory.PROVIDER_ACCESS,
        title: "Provider Access",
        value: "Payer Compass (RBP)",
      },
      {
        categoryId: NetworkCategory.PHARMACY_BENEFIT_MANAGER,
        title: "PBMs",
        value: "Southern Scripts, True Rx",
      },
    ],
  },
  {
    title: "Mandatory",
    description: "",
    categories: [
      {
        categoryId: NetworkCategory.NAVIGATION,
        title: "Navigation",
        value: "Best Doctors, Grand Rounds, IMC, Tria Health",
      },
      {
        categoryId: NetworkCategory.MISC,
        title: "Misc",
        value:
          "Dispatch Health, The Phia Group - Plan & Provider Docs The Phia Group - Plan & Provider DocsThe Phia Group - Plan & Provider DocsThe Phia Group - Plan & Provider Docs, The Phia Group - RBP Legal Support",
      },
      {
        categoryId: NetworkCategory.TELE_HEALTH,
        title: "Telehealth",
        value: "MeMD",
      },
      {
        categoryId: NetworkCategory.MEDICAL_MANAGEMENT,
        title: "Medical Management",
        value: "Medwatch (Utilization Management)",
      },
      {
        categoryId: NetworkCategory.BUNDLED_SERVICES,
        title: "Bundled Services",
        value: "PriceMDs, The Zero Card",
      },
      {
        categoryId: NetworkCategory.RX_SOLUTIONS,
        title: "Rx-Solutions",
        value: "Rx 'n Go (Rx Management)",
      },
    ],
  },
  {
    title: "Optional",
    description: "",
    categories: [
      {
        categoryId: NetworkCategory.MEDICAL_MANAGEMENT,
        title: "Medical Management",
        value: "AIMM",
      },
      {
        categoryId: NetworkCategory.NAVIGATION,
        title: "Navigation",
        value: "MORE Health",
      },
      {
        categoryId: NetworkCategory.MISC,
        title: "Misc",
        value: "MyLegacy by Family Care Path",
      },
      {
        categoryId: NetworkCategory.VIRTUAL_PRIMARY_CARE,
        title: "Virtual Primary Care",
        value: "Sherpaa",
      },
    ],
  },
];
