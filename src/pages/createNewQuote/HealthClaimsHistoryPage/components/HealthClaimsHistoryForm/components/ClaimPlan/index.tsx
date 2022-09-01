import { Fragment } from "react";
import get from "lodash/get";
import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";
import ColNoSpacing from "src/components/ColNoSpacing";
import ErrorMessage from "src/components/ErrorMessage";
import { ClaimsHistoryFormValues } from "src/pages/createNewQuote/HealthClaimsHistoryPage/constant";
import { handleNumberSeparatorInput } from "src/utils/form";
import { getPlanTypeOptions } from "../../utils";
import {
  Label,
  RowSpacing,
  LabelLight,
  CommonInput,
  MobileSpacing,
  PercentageSymbol,
  PrefixSymbol,
  RelativeBlock,
  InputWithPrefix,
  InputWithSuffix,
} from "./claimPlan.styles";

const ClaimPlan = () => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <Fragment>
      <RowSpacing>
        <ColNoSpacing md={{ size: 3 }}>
          <MobileSpacing>
            <Label>Plan Type</Label>
            <Controller
              name={ClaimsHistoryFormValues.PLAN_TYPE}
              control={control}
              defaultValue={getPlanTypeOptions()[0]}
              render={({ field }) => (
                <Select
                  {...field}
                  defaultValue={getPlanTypeOptions()[0]}
                  options={getPlanTypeOptions()}
                />
              )}
            />
          </MobileSpacing>
        </ColNoSpacing>
        <ColNoSpacing md={{ size: 3, offset: 3 }}>
          <Label smallSpacing>Average Deductible</Label>
          <LabelLight>(Individual, In-network)</LabelLight>
          <RelativeBlock>
            <InputWithPrefix>
              <Controller
                name={ClaimsHistoryFormValues.AVERAGE_DEDUCTIVE}
                control={control}
                defaultValue={getPlanTypeOptions()[0]}
                render={({ field }) => (
                  <CommonInput
                    {...field}
                    onInput={handleNumberSeparatorInput}
                  />
                )}
              />
            </InputWithPrefix>
            <PrefixSymbol>$</PrefixSymbol>
            <ErrorMessage>
              {get(
                errors,
                `${ClaimsHistoryFormValues.AVERAGE_DEDUCTIVE}.message`,
                ""
              )}
            </ErrorMessage>
          </RelativeBlock>
        </ColNoSpacing>
      </RowSpacing>
      <RowSpacing>
        <ColNoSpacing md={{ size: 3 }}>
          <MobileSpacing>
            <Label smallSpacing>Average Coinsurance</Label>
            <LabelLight>(Individual, In-network)</LabelLight>
            <RelativeBlock>
              <InputWithSuffix>
                <Controller
                  name={ClaimsHistoryFormValues.AVERAGE_COINSURANCE}
                  control={control}
                  defaultValue={getPlanTypeOptions()[0]}
                  render={({ field }) => <CommonInput {...field} />}
                />
              </InputWithSuffix>
              <PercentageSymbol>%</PercentageSymbol>
              <ErrorMessage>
                {get(
                  errors,
                  `${ClaimsHistoryFormValues.AVERAGE_COINSURANCE}.message`,
                  ""
                )}
              </ErrorMessage>
            </RelativeBlock>
          </MobileSpacing>
        </ColNoSpacing>
        <ColNoSpacing md={{ size: 3, offset: 3 }}>
          <Label smallSpacing>Average OOPM</Label>
          <LabelLight>(Individual, In-network)</LabelLight>
          <RelativeBlock>
            <InputWithPrefix>
              <Controller
                name={ClaimsHistoryFormValues.AVERAGE_OOPM}
                control={control}
                defaultValue={getPlanTypeOptions()[0]}
                render={({ field }) => (
                  <CommonInput
                    {...field}
                    onInput={handleNumberSeparatorInput}
                  />
                )}
              />
            </InputWithPrefix>
            <PrefixSymbol>$</PrefixSymbol>
            <ErrorMessage>
              {get(
                errors,
                `${ClaimsHistoryFormValues.AVERAGE_OOPM}.message`,
                ""
              )}
            </ErrorMessage>
          </RelativeBlock>
        </ColNoSpacing>
      </RowSpacing>
    </Fragment>
  );
};

export default ClaimPlan;
