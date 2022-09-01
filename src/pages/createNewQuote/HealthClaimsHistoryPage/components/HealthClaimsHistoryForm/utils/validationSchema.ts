import * as Yup from "yup";
import { ClaimsHistoryFormValues } from "../../../constant";

export const validationSchema = Yup.object().shape({
  [ClaimsHistoryFormValues.CONTRACT_LENGTH]: Yup.number()
    .typeError("Contract Length should be a number")
    .min(0, "Contract Length should greater or equal 0")
    .max(12, "Contract Length should less or equal 12")
    .required("Contract Length is required"),
  [ClaimsHistoryFormValues.AVERAGE_NUMBER_OF_EMPLOYEE]: Yup.string().required(
    "Average Number of Employees is required"
  ),
  [ClaimsHistoryFormValues.ASSUMED_DISCOUNT]: Yup.number()
    .typeError("Assumed Discount should be a number")
    .min(0, "Assumed Discount should greater or equal 0")
    .max(12, "Assumed Discount should less or equal 100"),
  [ClaimsHistoryFormValues.AVERAGE_DEDUCTIVE]: Yup.string().required(
    "Average Deductible of Employees is required"
  ),
  [ClaimsHistoryFormValues.AVERAGE_COINSURANCE]: Yup.number()
    .typeError("Average Coinsurance should be a number")
    .min(0, "Average Coinsurance should greater or equal 0")
    .max(12, "Average Coinsurance should less or equal 100")
    .required("Average Coinsurance is required"),
  [ClaimsHistoryFormValues.AVERAGE_OOPM]: Yup.string().required(
    "Average OOPM is required"
  ),
});
