/* eslint-disable max-lines */
import { Fragment, useState } from "react";
import get from "lodash/get";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import {
  MarginBottom,
  MarginLeft,
  MarginRight,
  MarginTop,
} from "src/components/CommonStyles";
import ErrorMessage from "src/components/ErrorMessage";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ClaimsHistoryFormValues } from "src/pages/createNewQuote/HealthClaimsHistoryPage/constant";
import { handleNumberSeparatorInput } from "src/utils/form";
import { getPlanTypeOptions } from "../../utils";
import {
  Label,
  CommonInput,
  PrefixSymbol,
  RelativeBlock,
  InputWithPrefix,
  CheckboxGroup,
  MediumHeading,
  SmallHeading,
  InputWithSuffix,
  SuffixSymbol,
} from "./basicsDeductibles.styles";

const BasicsDeductibles = () => {
  const [enableDiscount, setEnableDiscount] = useState<boolean>(true);
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <Fragment>
      <RowNoSpacing>
        <MarginBottom size={33}>
          <MediumHeading>Basics</MediumHeading>
        </MarginBottom>
      </RowNoSpacing>
      <RowNoSpacing>
        <ColNoSpacing md="6">
          <MarginBottom size={12}>
            <SmallHeading>Deductibles *</SmallHeading>
          </MarginBottom>
        </ColNoSpacing>
        <ColNoSpacing md="6">
          <MarginBottom size={12}>
            <SmallHeading>Out of Pockets *</SmallHeading>
          </MarginBottom>
        </ColNoSpacing>
      </RowNoSpacing>
      <RowNoSpacing>
        <ColNoSpacing md="6">
          <RowNoSpacing>
            <ColNoSpacing md="5">
              <MarginRight size={15}>
                <Label smallSpacing>Individual</Label>
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
              </MarginRight>
            </ColNoSpacing>
            <ColNoSpacing md="5">
              <MarginLeft size={15}>
                <Label smallSpacing>Family</Label>
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
              </MarginLeft>
            </ColNoSpacing>
          </RowNoSpacing>
        </ColNoSpacing>
        <ColNoSpacing md="6">
          <RowNoSpacing>
            <ColNoSpacing md="5">
              <MarginRight size={15}>
                <Label smallSpacing>Individual</Label>
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
              </MarginRight>
            </ColNoSpacing>
            <ColNoSpacing md="5">
              <MarginLeft size={15}>
                <Label smallSpacing>Family</Label>
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
              </MarginLeft>
            </ColNoSpacing>
          </RowNoSpacing>
        </ColNoSpacing>
      </RowNoSpacing>
      <RowNoSpacing>
        <MarginTop size={19}>
          <CheckboxGroup>
            <Input
              type="checkbox"
              value="true"
              checked={enableDiscount}
              onClick={() => setEnableDiscount(!enableDiscount)}
            />
            <span>HSA Qualified</span>
          </CheckboxGroup>
        </MarginTop>
      </RowNoSpacing>
      <RowNoSpacing>
        <ColNoSpacing md="12">
          <MarginTop size={25}>
            <MediumHeading>In & Out of Network (% plan pays)</MediumHeading>
          </MarginTop>
        </ColNoSpacing>
      </RowNoSpacing>
      <RowNoSpacing>
        <ColNoSpacing md="1">
          <MarginRight size={15}>
            <MarginTop size={20}>
              <Label smallSpacing>Individual</Label>
              <RelativeBlock>
                <InputWithSuffix>
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
                </InputWithSuffix>
                <SuffixSymbol>%</SuffixSymbol>
                <ErrorMessage>
                  {get(
                    errors,
                    `${ClaimsHistoryFormValues.AVERAGE_DEDUCTIVE}.message`,
                    ""
                  )}
                </ErrorMessage>
              </RelativeBlock>
            </MarginTop>
          </MarginRight>
        </ColNoSpacing>
        <ColNoSpacing md="1">
          <MarginLeft size={15}>
            <MarginTop size={20}>
              <Label smallSpacing>Family</Label>
              <RelativeBlock>
                <InputWithSuffix>
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
                </InputWithSuffix>
                <SuffixSymbol>%</SuffixSymbol>
                <ErrorMessage>
                  {get(
                    errors,
                    `${ClaimsHistoryFormValues.AVERAGE_DEDUCTIVE}.message`,
                    ""
                  )}
                </ErrorMessage>
              </RelativeBlock>
            </MarginTop>
          </MarginLeft>
        </ColNoSpacing>
      </RowNoSpacing>
    </Fragment>
  );
};

export default BasicsDeductibles;
