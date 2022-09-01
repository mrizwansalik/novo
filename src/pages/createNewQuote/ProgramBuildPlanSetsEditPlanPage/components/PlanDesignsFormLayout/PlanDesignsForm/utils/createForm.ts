import get from "lodash/get";
import moment from "moment";
import { toast } from "react-toastify";
import {
  updateClaimsData as updateClaimsDataAPI,
  createClaimsData as createClaimsDataAPI,
} from "src/api/benefits";
import { SpecialTime } from "src/constants";
import { IClaimsData } from "src/interfaces/benefit";
import { getClaimsDetail } from "src/pages/createNewQuote/HealthClaimsDocumentsPage/utils";
import routes from "src/routes";
import BenefitStore from "src/stores/benefitStore";
import CreateQuoteStore from "src/stores/createQuoteStore";
import { IHistory } from "src/types";
import { GetValues } from "src/types/hookForm";
import { parseCommaStringToNumber } from "src/utils/form";
import { IClaimsHistoryForm } from "../interfaces";

export async function createClaimsData(
  prospectId: string,
  getValues: GetValues,
  createQuoteStore: CreateQuoteStore,
  benefitStore: BenefitStore,
  history: IHistory
): Promise<void> {
  const formValues: IClaimsHistoryForm = getValues() as IClaimsHistoryForm;
  const claimsData = claimFormatter(formValues, createQuoteStore);

  if (!prospectId) {
    toast.error("Failed to save claim data");
    return;
  }

  const foundClaimsData: IClaimsData = benefitStore?.claimsData?.find(
    (claimsDetail: IClaimsData) => claimsDetail?.year === claimsData?.year
  );

  try {
    if (!foundClaimsData?.id) {
      await createClaimsDataAPI(prospectId, claimsData);
    } else {
      await updateClaimsDataAPI(prospectId, foundClaimsData?.id, claimsData);
    }
    getClaimsDetail(benefitStore, prospectId);
    toast.success("Success to save claim data");
    history.push(
      routes.dashboard.brokerage.prospects.onBoarding.existingPlans.choice.getValue(
        prospectId
      )
    );
  } catch (error) {
    toast.error("Failed to save claim data");
  }
}

export function claimFormatter(
  formValues: IClaimsHistoryForm,
  createQuoteStore: CreateQuoteStore
): IClaimsData {
  const paidThroughDate: string = moment(
    `${formValues?.paidThroughYear?.value}-${formValues?.paidThroughMonth?.value}-${formValues?.paidThroughDate?.value}`,
    "YYYY-MM-DD"
  ).format("YYYY-MM-DD");
  const monthlyClaims = get(formValues, "monthlyClaim", []);

  const claimData: IClaimsData = {
    assumed_discount: Number(get(formValues, "assumedDiscount", 0)),
    contract_length: Number(get(formValues, "contractLength", 0)),
    experience_average_employees: Number(
      get(formValues, "averageNumberOfEmployee", 0)
    ),
    experience_coinsurance: Number(get(formValues, "averageCoinsurance", 0)),
    experience_deductible: Number(get(formValues, "averageDeductive", 0)),
    experience_oop_max: Number(get(formValues, "averageOOPM", 0)),
    experience_plan_type: get(formValues, "planType.value", ""),
    experience_rx: get(formValues, "averageRxPlan.value", ""),
    files_skipped: false,
    generic_field_responses: { claims_documents: [] },
    paid_status: get(formValues, "paidStatus.value", ""),
    paid_through_date: paidThroughDate,
    start_date: moment(
      `${formValues?.planEffectiveYear?.value}-${formValues?.planEffectiveMonth?.value}`,
      "YYYY-MM"
    ).format("YYYY-MM-DD"),
    year: Number(
      createQuoteStore?.selectedYear === SpecialTime?.LAST_YEAR
        ? moment().subtract(1, "year").toDate().getFullYear().toString()
        : createQuoteStore?.selectedYear
    ),
    monthly_claims: Array.isArray(monthlyClaims)
      ? monthlyClaims.map(
          (month) => parseCommaStringToNumber(month?.amount) || 0
        )
      : [],
  } as IClaimsData;
  return claimData;
}
