import { Fragment } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import Select from "react-select";
import ColNoSpacing from "src/components/ColNoSpacing";
import { IOption } from "src/interfaces/common";
import { ClaimsHistoryFormValues } from "src/pages/createNewQuote/HealthClaimsHistoryPage/constant";
import {
  getAverageRxPlan,
  getDateOptions,
  getMonthOptions,
  getPaidStatus,
  getPlanTypeOptions,
  getYearOptions,
} from "../../utils";
import {
  Label,
  PickerGroup,
  PickerSection,
  RowSpacing,
  MobileSpacing,
  Divider,
} from "./claimAmount.styles";

const ClaimAmount = () => {
  const { control } = useFormContext();
  const watchMonth: IOption = useWatch({
    name: ClaimsHistoryFormValues.PAID_THROUGH_MONTH,
  });
  const watchPlanType: IOption = useWatch({
    name: ClaimsHistoryFormValues.PLAN_TYPE,
  });

  return (
    <Fragment>
      <RowSpacing>
        <ColNoSpacing md={{ size: 3 }}>
          <MobileSpacing>
            <Label>Average RX Plan</Label>
            <Controller
              name={ClaimsHistoryFormValues.AVERAGE_RX_PLAN}
              control={control}
              defaultValue={getAverageRxPlan()[0]}
              render={({ field }) => (
                <Select
                  {...field}
                  isDisabled={
                    watchPlanType?.value === getPlanTypeOptions()[1]?.value
                  }
                  {...(watchPlanType?.value ===
                    getPlanTypeOptions()[1]?.value && {
                    value: getAverageRxPlan()[0],
                  })}
                  options={getAverageRxPlan()}
                  defaultValue={getAverageRxPlan()[0]}
                />
              )}
            />
          </MobileSpacing>
        </ColNoSpacing>
        <PickerGroup md={{ size: 3, offset: 3 }}>
          <Label>Paid Through Date</Label>
          <PickerSection>
            <Controller
              name={ClaimsHistoryFormValues.PAID_THROUGH_YEAR}
              control={control}
              defaultValue={getYearOptions()[0]}
              render={({ field }) => (
                <Select
                  options={getYearOptions()}
                  placeholder="Year"
                  defaultValue={getYearOptions()[0]}
                  {...field}
                />
              )}
            />
            <Controller
              name={ClaimsHistoryFormValues.PAID_THROUGH_MONTH}
              control={control}
              defaultValue={getMonthOptions()[0]}
              render={({ field }) => (
                <Select
                  options={getMonthOptions()}
                  placeholder="Month"
                  defaultValue={getMonthOptions()[0]}
                  {...field}
                />
              )}
            />
            <Controller
              name={ClaimsHistoryFormValues.PAID_THROUGH_DATE}
              control={control}
              defaultValue={getDateOptions()[0]}
              render={({ field }) => (
                <Select
                  options={getDateOptions(Number(watchMonth?.value))}
                  placeholder="Date"
                  defaultValue={getDateOptions()[0]}
                  {...field}
                />
              )}
            />
          </PickerSection>
        </PickerGroup>
      </RowSpacing>
      <RowSpacing>
        <ColNoSpacing md={{ size: 3 }}>
          <Label>Paid Status</Label>
          <Controller
            name={ClaimsHistoryFormValues.PAID_STATUS}
            control={control}
            defaultValue={getPaidStatus()[0]}
            render={({ field }) => (
              <Select
                options={getPaidStatus()}
                defaultValue={getPaidStatus()[0]}
                {...field}
              />
            )}
          />
        </ColNoSpacing>
      </RowSpacing>
      <Divider />
    </Fragment>
  );
};

export default ClaimAmount;
