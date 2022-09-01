import { useState } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";
import { Input } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import ErrorMessage from "src/components/ErrorMessage";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ClaimsHistoryFormValues } from "src/pages/createNewQuote/HealthClaimsHistoryPage/constant";
import useStore from "src/utils/useStore";
import { getEffectiveYearOptions, getMonthOptions } from "../../utils";
import {
  Label,
  PickerGroup,
  PickerSection,
  FormTitle,
  RowSpacing,
  CommonInput,
  CheckboxGroup,
  MobileSpacing,
  AssumedDiscount,
  PercentageSymbol,
  InputWithSuffix,
} from "./claimInformation.styles";

const ClaimInformation = () => {
  const [enableDiscount, setEnableDiscount] = useState<boolean>(true);
  const { formState, control } = useFormContext();
  const { errors } = formState;
  const { createQuoteStore } = useStore();
  const { selectedYear } = createQuoteStore;

  return (
    <RowNoSpacing>
      <FormTitle md={{ size: 12 }}>{`${selectedYear}'s Claims`}</FormTitle>
      <RowSpacing>
        <PickerGroup md={{ size: 3 }}>
          <MobileSpacing>
            <Label>Plan Effective Date</Label>
            <PickerSection>
              <Controller
                name={ClaimsHistoryFormValues.PLAN_EFFECTIVE_YEAR}
                control={control}
                defaultValue={getEffectiveYearOptions(selectedYear)[0]}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Year"
                    defaultValue={getEffectiveYearOptions(selectedYear)[0]}
                    options={getEffectiveYearOptions(selectedYear)}
                  />
                )}
              />
              <Controller
                name={ClaimsHistoryFormValues.PLAN_EFFECTIVE_MONTH}
                control={control}
                defaultValue={getMonthOptions()[0]}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Month"
                    defaultValue={getMonthOptions()[0]}
                    options={getMonthOptions()}
                  />
                )}
              />
            </PickerSection>
          </MobileSpacing>
        </PickerGroup>
        <ColNoSpacing md={{ size: 3, offset: 3 }}>
          <Label>Contract Length</Label>
          <Controller
            name={ClaimsHistoryFormValues.CONTRACT_LENGTH}
            control={control}
            render={({ field }) => <CommonInput {...field} />}
          />
          <ErrorMessage>
            {get(
              errors,
              `${ClaimsHistoryFormValues.CONTRACT_LENGTH}.message`,
              ""
            )}
          </ErrorMessage>
        </ColNoSpacing>
      </RowSpacing>
      <RowSpacing>
        <ColNoSpacing md={{ size: 3 }}>
          <MobileSpacing>
            <Label>Average Number of Employees</Label>
            <Controller
              name={ClaimsHistoryFormValues.AVERAGE_NUMBER_OF_EMPLOYEE}
              control={control}
              render={({ field }) => <CommonInput {...field} />}
            />
            <ErrorMessage>
              {get(
                errors,
                `${ClaimsHistoryFormValues.AVERAGE_NUMBER_OF_EMPLOYEE}.message`,
                ""
              )}
            </ErrorMessage>
          </MobileSpacing>
        </ColNoSpacing>
        <ColNoSpacing md={{ size: 3, offset: 3 }}>
          <Label>Assumed Discount</Label>
          <AssumedDiscount>
            <InputWithSuffix>
              <Controller
                name={ClaimsHistoryFormValues.ASSUMED_DISCOUNT}
                control={control}
                render={({ field }) => (
                  <CommonInput
                    {...field}
                    mediumSpacing
                    disabled={enableDiscount}
                  />
                )}
              />
            </InputWithSuffix>
            <PercentageSymbol>%</PercentageSymbol>
          </AssumedDiscount>
          <CheckboxGroup>
            <Input
              type="checkbox"
              value="true"
              checked={enableDiscount}
              onClick={() => setEnableDiscount(!enableDiscount)}
            />
            <span> Discount Unknown</span>
          </CheckboxGroup>
          <ErrorMessage>
            {get(
              errors,
              `${ClaimsHistoryFormValues.ASSUMED_DISCOUNT}.message`,
              ""
            )}
          </ErrorMessage>
        </ColNoSpacing>
      </RowSpacing>
    </RowNoSpacing>
  );
};

export default observer(ClaimInformation);
