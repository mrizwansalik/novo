/* eslint-disable max-lines */
import { get, cloneDeep } from "lodash";
import moment from "moment";
import { toast } from "react-toastify";
import {
  createStopLossClaims,
  deleteStopLossClaims,
  updateStopLossClaims,
} from "src/api/benefits";
import {
  updateClaimsData as updateClaimsDataAPI,
  createClaimsData as createClaimsDataAPI,
  deleteClaimsData,
} from "src/api/benefits";
import { SpecialTime } from "src/constants";
import { getMonthName } from "src/constants/time/time";
import { IClaimsData, IStopLossClaims } from "src/interfaces/benefit";
import { IOption } from "src/interfaces/common";
import routes from "src/routes";
import BenefitStore from "src/stores/benefitStore";
import HealthHistoryStore from "src/stores/healthHistoryStore";
import { IHistory } from "src/types";
import { Reset, GetValues } from "src/types/hookForm";
import {
  thousandSeparatorByComma,
  parseCommaStringToNumber,
} from "src/utils/form";
import * as Yup from "yup";
import {
  monthsOptions,
  ClaimsHistoryFormValues,
  defaultMonthlyClaims,
} from "./constants";

interface IYearTag {
  label: string;
  value: number;
}

interface IMonthlyClaimForm {
  amount: string;
  checked: boolean;
}

interface IClaimsHistoryForm {
  assumedDiscount: string;
  averageCoinsurance: string;
  averageDeductive: string;
  averageNumberOfEmployee: string;
  averageOOPM: string;
  contractLength: string;
  largeClaimAmount: { amount: number }[];
  paidThroughDate: IOption;
  paidThroughMonth: IOption;
  paidThroughYear: IOption;
  planEffectiveYear: IOption;
  planEffectiveMonth: IOption;
  planType: IOption;
  averageRxPlan: IOption;
  paidStatus: IOption;
  monthlyClaim: IMonthlyClaimForm[];
}

export function getYearTags(): IYearTag[] {
  const years: IYearTag[] = [
    {
      label: SpecialTime.LAST_YEAR,
      value: moment().subtract(1, "year").toDate().getFullYear(),
    },
    {
      label: moment().toDate().getFullYear().toString(),
      value: moment().toDate().getFullYear(),
    },
    {
      label: moment().subtract(1, "year").toDate().getFullYear().toString(),
      value: moment().subtract(1, "year").toDate().getFullYear(),
    },
    {
      label: moment().subtract(2, "year").toDate().getFullYear().toString(),
      value: moment().subtract(2, "year").toDate().getFullYear(),
    },
    {
      label: moment().subtract(3, "year").toDate().getFullYear().toString(),
      value: moment().subtract(3, "year").toDate().getFullYear(),
    },
    {
      label: moment().subtract(4, "year").toDate().getFullYear().toString(),
      value: moment().subtract(4, "year").toDate().getFullYear(),
    },
  ];

  return years;
}

export function onSelectTag(
  healthHistoryStore: HealthHistoryStore,
  year: IYearTag
): void {
  healthHistoryStore.setSelectedYear(year.label);
}

export function enableDelete(claimsData: IClaimsData[], year: number): boolean {
  const filteredClaims: IClaimsData[] = Array.isArray(claimsData)
    ? claimsData?.filter(
        (claimDetail: IClaimsData) => claimDetail?.year === year
      )
    : [];
  return filteredClaims?.length > 0;
}

export function getDaysInMonth(
  month: number,
  year: number,
  day: number = 0
): number {
  return new Date(year, month, day).getDate();
}

export function getPaidThroughYearOptions(
  effectiveYearOption: IOption,
  effectiveMonthOption: IOption
): IOption[] {
  const options: IOption[] = [
    {
      label: effectiveYearOption.label,
      value: effectiveYearOption.value,
    },
  ];
  if (effectiveYearOption.value !== new Date().getFullYear()) {
    if (effectiveMonthOption && effectiveMonthOption.value !== 1) {
      options.push({
        label: (Number(effectiveYearOption.label) + 1).toString(),
        value: Number(effectiveYearOption.value) + 1,
      });
    }
  }

  return options;
}

export function getPaidThroughMonthOptions(
  effectiveYearOption: IOption,
  effectiveMonthOption: IOption,
  paidThroughYearOption: IOption
): IOption[] {
  if (!effectiveMonthOption) {
    return [];
  }
  if (!paidThroughYearOption) {
    return [];
  }

  //INFO: get up to current month of next year for year in the past
  if (Number(paidThroughYearOption.value) > Number(effectiveYearOption.value)) {
    return cloneDeep(monthsOptions).slice(
      0,
      Number(effectiveMonthOption.value) - 1
    );
  }

  //INFO: get up to current month of current year
  const currentDate = new Date();
  if (Number(effectiveYearOption.value) === currentDate.getFullYear()) {
    if (Number(effectiveMonthOption.value) <= currentDate.getMonth() + 1) {
      return cloneDeep(monthsOptions).slice(
        Number(effectiveMonthOption.value) - 1,
        currentDate.getMonth() + 1
      );
    }
  }

  //INFO: get from current month of that year to the end month of that year for year in the past
  return cloneDeep(monthsOptions).splice(
    Number(effectiveMonthOption.value) - 1
  );
}

export function getPaidThroughDateOptions(
  paidThroughYearOption: IOption,
  paidThroughMonthOption: IOption
): IOption[] {
  if (!paidThroughYearOption) {
    return [];
  }
  if (!paidThroughMonthOption) {
    return [];
  }

  let numberOfDays = getDaysInMonth(
    Number(paidThroughMonthOption.value),
    Number(paidThroughYearOption.value)
  );
  const currentDate = new Date();
  if (
    Number(paidThroughYearOption.value) === currentDate.getFullYear() &&
    Number(paidThroughMonthOption.value) === currentDate.getMonth() + 1
  ) {
    numberOfDays = getDaysInMonth(
      Number(paidThroughMonthOption.value),
      Number(paidThroughYearOption.value),
      Number(currentDate.getDate())
    );
  }

  const options = Array.from(
    { length: numberOfDays },
    (_, index: number) => index + 1
  ).map((day: number) => ({
    label: day.toString(),
    value: day,
  }));

  return options;
}

export function getEffectiveMonthOptions(year: string): IOption[] {
  const currentDate = moment();
  if (currentDate.year() > Number(year)) {
    return monthsOptions;
  }
  return cloneDeep(monthsOptions).slice(0, currentDate.month() + 1);
}

export function getEffectiveYearOptions(selectedYear: string): IOption[] {
  const lastYear = moment()
    .subtract(1, "year")
    .toDate()
    .getFullYear()
    .toString();
  const options: IOption[] = [
    {
      label: selectedYear === SpecialTime.LAST_YEAR ? lastYear : selectedYear,
      value: selectedYear === SpecialTime.LAST_YEAR ? lastYear : selectedYear,
    },
  ];

  return options;
}

export function getPlanTypeOptions(): IOption[] {
  const options: IOption[] = [
    {
      label: "Traditional (w/ copays)",
      value: "ppo",
    },
    {
      label: "HSA",
      value: "hsa",
    },
  ];

  return options;
}

export function getAverageRxPlan(): IOption[] {
  const options: IOption[] = [
    {
      label: "Ded / Coins",
      value: "Ded/Coins",
    },
    {
      label: "$0 / $35 / $50",
      value: "$0/$35/$50",
    },
    {
      label: "$15 / $45 / $60",
      value: "$15/$45/$60",
    },
    {
      label: "$20 / $50 / $75",
      value: "$20/$50/$75",
    },
    {
      label: "50% / 50% / 50%",
      value: "50%/50%/50%",
    },
  ];

  return options;
}

export function getPaidStatus(): IOption[] {
  const options: IOption[] = [
    {
      label: "Paid",
      value: "paid",
    },
    {
      label: "Paid and Incurred",
      value: "paid_and_incurred",
    },
  ];

  return options;
}

export function handleAdd(
  editMode: boolean,
  setEditMode: (editMode: boolean) => void,
  claimAmount: number,
  claimId: string,
  append: ({ amount: number, id: string }) => void
): void {
  append({ id: claimId, amount: Number(claimAmount) });
  setEditMode(!editMode);
}

export function handleCancel(
  editMode: boolean,
  setEditMode: (editMode: boolean) => void
): void {
  setEditMode(!editMode);
}

export function handleUpdate(
  setValue: (fieldName: string, values: IStopLossClaims[]) => void,
  fields: IStopLossClaims[],
  order: number,
  updateValue: number
): void {
  const newFields = fields?.map((field, index: number) => {
    if (order === index) {
      return {
        ...field,
        amount: Number(updateValue),
      };
    }
    return field;
  });
  setValue(ClaimsHistoryFormValues.LARGE_CLAIM_AMOUNT, newFields);
}

export async function handleCreateStopLossClaims(
  benefitStore: BenefitStore,
  healthHistoryStore: HealthHistoryStore,
  prospectId: string,
  value: number
): Promise<IStopLossClaims> {
  const claimsData = benefitStore?.claimsData || [];
  const selectedYear =
    healthHistoryStore?.selectedYear === SpecialTime.LAST_YEAR
      ? moment().subtract(1, "year").toDate().getFullYear()
      : Number(healthHistoryStore?.selectedYear);

  const foundClaimsData =
    Array.isArray(claimsData) &&
    claimsData?.find(
      (claimsDataDetail: IClaimsData) =>
        claimsDataDetail?.year === Number(selectedYear)
    );
  if (!foundClaimsData) {
    toast.error("Please save the selected year's claims data first");
    return;
  }
  const stopLossClaim: IStopLossClaims = {
    amount: Number(value),
  } as IStopLossClaims;
  try {
    const createdStopLossClaim = await createStopLossClaims(
      prospectId,
      foundClaimsData?.id,
      stopLossClaim
    );
    toast.success("New large claim successfully added");
    return createdStopLossClaim;
  } catch (error) {
    toast.error("Failed to add new large claim");
  }
}

export async function handleUpdateStopLossClaims(
  benefitStore: BenefitStore,
  healthHistoryStore: HealthHistoryStore,
  stopLossClaimId: string,
  prospectId: string,
  value: number
): Promise<void> {
  const claimsData = benefitStore?.claimsData || [];
  const selectedYear =
    healthHistoryStore?.selectedYear === SpecialTime.LAST_YEAR
      ? moment().subtract(1, "year").toDate().getFullYear()
      : Number(healthHistoryStore?.selectedYear);

  const foundClaimsData =
    Array.isArray(claimsData) &&
    claimsData?.find(
      (claimsDataDetail: IClaimsData) =>
        claimsDataDetail?.year === Number(selectedYear)
    );

  const stopLossClaim: IStopLossClaims = {
    amount: Number(value),
  } as IStopLossClaims;

  await updateStopLossClaims(
    prospectId,
    foundClaimsData?.id,
    stopLossClaimId,
    stopLossClaim
  );
}

export async function handleDeleteStopLossClaims(
  benefitStore: BenefitStore,
  healthHistoryStore: HealthHistoryStore,
  stopLossClaimId: string,
  prospectId: string
): Promise<void> {
  const claimsData = benefitStore?.claimsData || [];
  const selectedYear =
    healthHistoryStore?.selectedYear === SpecialTime.LAST_YEAR
      ? moment().subtract(1, "year").toDate().getFullYear()
      : Number(healthHistoryStore?.selectedYear);

  const foundClaimsData =
    Array.isArray(claimsData) &&
    claimsData?.find(
      (claimsDataDetail: IClaimsData) =>
        claimsDataDetail?.year === Number(selectedYear)
    );

  await deleteStopLossClaims(prospectId, foundClaimsData?.id, stopLossClaimId);
}

export function formatThousandSeparator(numberWithSeparator: string): number {
  return Number(
    numberWithSeparator
      .split("")
      .filter((item) => item !== ",")
      .join("")
  );
}

export const validationSchema = Yup.object().shape({
  [ClaimsHistoryFormValues.CONTRACT_LENGTH]: Yup.number()
    .typeError("Contract Length should be a number")
    .min(0, "Contract Length should be greater than or equal 0")
    .max(12, "Contract Length should be less than or equal 12")
    .required("Contract Length is required"),
  [ClaimsHistoryFormValues.AVERAGE_NUMBER_OF_EMPLOYEE]: Yup.string().required(
    "Average Number of Employees is required"
  ),
  [ClaimsHistoryFormValues.ASSUMED_DISCOUNT]: Yup.number()
    .typeError("Assumed Discount should be a number")
    .min(0, "Assumed Discount should be greater than or equal 0")
    .max(100, "Assumed Discount should be less than or equal 100"),
  [ClaimsHistoryFormValues.AVERAGE_DEDUCTIVE]: Yup.string().required(
    "Average Deductible of Employees is required"
  ),
  [ClaimsHistoryFormValues.AVERAGE_COINSURANCE]: Yup.number()
    .typeError("Average Coinsurance should be a number")
    .min(0, "Average Coinsurance should be greater than or equal 0")
    .max(100, "Average Coinsurance should be less than or equal 100")
    .required("Average Coinsurance is required"),
  [ClaimsHistoryFormValues.AVERAGE_OOPM]: Yup.string().required(
    "Average OOPM is required"
  ),
  [ClaimsHistoryFormValues.PLAN_EFFECTIVE_MONTH]: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.number(),
    })
    .nullable()
    .required("Effective date is required"),
  [ClaimsHistoryFormValues.PAID_THROUGH_YEAR]: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.number(),
    })
    .nullable()
    .required("Paid through date is required"),
  [ClaimsHistoryFormValues.PAID_THROUGH_MONTH]: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.number(),
    })
    .nullable()
    .required("Paid through date is required"),
  [ClaimsHistoryFormValues.PAID_THROUGH_DATE]: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.number(),
    })
    .nullable()
    .required("Paid through date is required"),
});

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
    assumedDiscount:
      (foundClaimsData?.assumed_discount &&
        (foundClaimsData?.assumed_discount * 100).toString()) ||
      "0",
    contractLength: foundClaimsData?.contract_length?.toString() || "12",
    averageNumberOfEmployee:
      foundClaimsData?.experience_average_employees?.toString() || "0",
    averageCoinsurance:
      (foundClaimsData?.experience_coinsurance &&
        (foundClaimsData?.experience_coinsurance * 100).toString()) ||
      "0",
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
    paidThroughYear: foundClaimsData?.paid_through_date
      ? {
          label: moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
            .toDate()
            .getFullYear()
            .toString(),
          value: moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
            .toDate()
            .getFullYear(),
        }
      : null,
    paidThroughMonth: foundClaimsData?.paid_through_date
      ? {
          label: getMonthName(
            moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
              .toDate()
              .getMonth()
          ),
          value:
            moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
              .toDate()
              .getMonth() + 1,
        }
      : null,
    paidThroughDate: foundClaimsData?.paid_through_date
      ? {
          label: moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
            .toDate()
            .getDate()
            .toString(),
          value: moment(foundClaimsData?.paid_through_date, "YYYY-MM-DD")
            .toDate()
            .getDate(),
        }
      : null,
    planEffectiveYear: {
      label: year.toString(),
      value: Number(year),
    },
    planEffectiveMonth: foundClaimsData?.start_date
      ? {
          label: getMonthName(
            moment(foundClaimsData?.start_date, "YYYY-MM-DD")
              .toDate()
              .getMonth()
          ),
          value:
            moment(foundClaimsData?.start_date, "YYYY-MM-DD")
              .toDate()
              .getMonth() + 1,
        }
      : null,
    largeClaimAmount: foundClaimsData?.stop_loss_claims || [],
    monthlyClaim: Array.isArray(foundClaimsData?.monthly_claims)
      ? foundClaimsData?.monthly_claims?.map((monthlyClaimDetail: number) =>
          monthlyClaimDetail !== null
            ? {
                amount: thousandSeparatorByComma(monthlyClaimDetail),
                checked: true,
              }
            : {
                amount: null,
                checked: false,
              }
        )
      : defaultMonthlyClaims,
  };
  reset(formValues);
}

export async function createClaimsData(
  prospectId: string,
  getValues: GetValues,
  healthHistoryStore: HealthHistoryStore,
  benefitStore: BenefitStore,
  history: IHistory,
  enableDiscount: boolean,
  numberOfMonths: number
): Promise<void> {
  const formValues: IClaimsHistoryForm = getValues() as IClaimsHistoryForm;
  const claimsData = claimFormatter(
    formValues,
    healthHistoryStore,
    enableDiscount,
    numberOfMonths
  );
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
    benefitStore.getClaimsDetail(prospectId);
    toast.success("Successfully save claim data");
    history.push(
      routes.dashboard.brokerage.prospects.prospectId.claims.documents.getValue(
        prospectId
      )
    );
  } catch (error) {
    toast.error("Failed to save claim data");
  }
}

export function claimFormatter(
  formValues: IClaimsHistoryForm,
  healthHistoryStore: HealthHistoryStore,
  enableDiscount: boolean,
  numberOfMonths: number
): IClaimsData {
  const paidThroughDate: string = moment(
    `${formValues?.paidThroughYear?.value}-${formValues?.paidThroughMonth?.value}-${formValues?.paidThroughDate?.value}`,
    "YYYY-MM-DD"
  ).format("YYYY-MM-DD");
  const monthlyClaims = get(formValues, "monthlyClaim", [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const averageDeductive = get(formValues, "averageDeductive");
  const averageOOPM = get(formValues, "averageOOPM");
  const claimData: IClaimsData = {
    assumed_discount: enableDiscount
      ? (Number(get(formValues, "assumedDiscount", 0)) * 1.0) / 100
      : null,
    contract_length: Number(get(formValues, "contractLength", 0)),
    experience_average_employees: Number(
      get(formValues, "averageNumberOfEmployee", 0)
    ),
    experience_coinsurance:
      (Number(get(formValues, "averageCoinsurance", 0)) * 1.0) / 100,
    experience_deductible: averageDeductive.includes("$")
      ? Number(averageDeductive.substring(1))
      : Number(averageDeductive),
    experience_oop_max: averageOOPM.includes("$")
      ? Number(averageOOPM.substring(1))
      : Number(averageOOPM),
    experience_plan_type: get(formValues, "planType.value", "ppo"),
    experience_rx: get(formValues, "averageRxPlan.value", "Ded/Coins"),
    files_skipped: false,
    generic_field_responses: { claims_documents: [] },
    paid_status: get(formValues, "paidStatus.value", "paid"),
    paid_through_date: paidThroughDate,
    start_date: moment(
      `${formValues?.planEffectiveYear?.value}-${formValues?.planEffectiveMonth?.value}`,
      "YYYY-MM"
    ).format("YYYY-MM-DD"),
    year: Number(
      healthHistoryStore?.selectedYear === SpecialTime?.LAST_YEAR
        ? moment().subtract(1, "year").toDate().getFullYear().toString()
        : healthHistoryStore?.selectedYear
    ),
    monthly_claims: Array.isArray(monthlyClaims)
      ? monthlyClaims.map((month, index) => {
          if (month?.checked && index < numberOfMonths) {
            return parseCommaStringToNumber(month?.amount) || 0;
          }
          return null;
        })
      : [],
  } as IClaimsData;
  return claimData;
}

export function getMonthsDiff(
  fromYear: string | number,
  fromMonth: string | number,
  toYear: string | number,
  toMonth: string | number
): number {
  const fromDate = moment([Number(fromYear), Number(fromMonth) - 1, 1]);
  const toDate = moment([Number(toYear), Number(toMonth) - 1, 1]);
  const monthDiff = toDate.diff(fromDate, "months");
  if (monthDiff >= 11) {
    return 11;
  }
  if (monthDiff <= 0) {
    return 0;
  }
  return monthDiff;
}

export async function handleRemoveClaimsData(
  benefitStore: BenefitStore,
  prospectId: string,
  year: number
): Promise<void> {
  const claimsData: IClaimsData[] = benefitStore?.claimsData || [];
  const foundClaimsData: IClaimsData = claimsData?.find(
    (claimsDetail: IClaimsData) => claimsDetail?.year === year
  );
  if (!foundClaimsData) return undefined;
  try {
    await deleteClaimsData(prospectId, foundClaimsData?.id);
    benefitStore.getClaimsDetail(prospectId);
    toast.success("Successfully delete claim data");
  } catch (error) {
    toast.error("Failed to delete claim data");
  }
}
