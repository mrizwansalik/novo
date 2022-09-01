import { NetworkCategory } from "src/constants";
import { NetworkCategoryColor } from "./constants";

export function getCategoryColor(categoryId: NetworkCategory): string {
  let color = "";

  switch (categoryId) {
    case NetworkCategory.PROVIDER_ACCESS:
      color = NetworkCategoryColor.PROVIDER_ACCESS;
      break;
    case NetworkCategory.PHARMACY_BENEFIT_MANAGER:
      color = NetworkCategoryColor.PBMS;
      break;
    case NetworkCategory.NAVIGATION:
      color = NetworkCategoryColor.NAVIGATION;
      break;
    case NetworkCategory.MISC:
      color = NetworkCategoryColor.MISC;
      break;
    case NetworkCategory.TELE_HEALTH:
      color = NetworkCategoryColor.TELE_HEALTH;
      break;
    case NetworkCategory.MEDICAL_MANAGEMENT:
      color = NetworkCategoryColor.MEDICAL_MANAGEMENT;
      break;
    case NetworkCategory.BUNDLED_SERVICES:
      color = NetworkCategoryColor.BUNDLED_SERVICES;
      break;
    case NetworkCategory.RX_SOLUTIONS:
      color = NetworkCategoryColor.RX_SOLUTIONS;
      break;
    case NetworkCategory.VIRTUAL_PRIMARY_CARE:
      color = NetworkCategoryColor.VIRTUAL_PRIMARY_CARE;
      break;
    default:
      color = NetworkCategoryColor.PROVIDER_ACCESS;
      break;
  }

  return color;
}
