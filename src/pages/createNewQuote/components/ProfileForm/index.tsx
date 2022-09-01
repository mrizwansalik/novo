/* eslint-disable max-lines */
import React from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { createFilter } from "react-select";
import { Col, Row } from "reactstrap";
import InputRadio from "src/components/InputRadio";
import NumberInput from "src/components/NumberInput";
import { IndustryCodeType } from "src/constants";
import useProspectDetail from "src/hooks/ProspectDetail";
import { IOrg } from "src/interfaces/org";
import { IQuote } from "src/interfaces/quote";
import routes from "src/routes";
import useStore from "src/utils/useStore";
import useProfileForm from "./hook";

import {
  MarginLabel,
  selectControlStyle,
  StyledInput,
  StyledRadioGroup,
  StyledSelect,
  SubmitButton,
  IndustryCodeSelect,
  ShowOnDesktop,
  ShowOnMobile,
} from "./profileForm.style";
import {
  getYearOptions,
  IFormValues,
  upsertClientProfile,
  getOptionHeightDesktop,
  getOptionHeightMobile,
} from "./utils";

const ProfileForm = () => {
  const { createQuoteStore } = useStore();
  const history = useHistory();

  const prospectDetail = useProspectDetail();
  const countryName = get(prospectDetail, "country.name", "");
  const {
    formControl,
    regionOptions,
    cityOptions,
    monthOptions,
    selectedCodeType,
    industryCodeOptions,
  } = useProfileForm(countryName);

  const { control, formState, register, handleSubmit } = formControl;

  async function handleSubmitForm(data: IFormValues) {
    const newOrg: IOrg = await upsertClientProfile(data, prospectDetail);
    const newOrgId = get(newOrg, "id");
    const newQuote: IQuote = {
      name: data?.name,
    };
    createQuoteStore.setQuote(newQuote);
    if (newOrgId) {
      history.push(
        routes.dashboard.brokerage.prospects.onBoarding.census.choice.getValue(
          newOrgId
        )
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Row>
        <Col lg={5} md={5} sm={12}>
          <StyledInput
            label="Company Name *"
            placeholder="e.g Health Stance Inc"
            {...register("name", {
              required: true,
            })}
          />
        </Col>
        <Col lg={5} md={5} sm={12}>
          <StyledInput
            label="Street Address *"
            placeholder="e.g 60 Beaver Ridge Lane"
            {...register("address", {
              required: true,
            })}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={5} md={5} sm={12}>
          <Controller
            control={control}
            name="region"
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <StyledSelect
                label="State *"
                options={regionOptions}
                controlStyle={selectControlStyle}
                placeholder="e.g. California"
                onChange={onChange}
                isSearchable
              />
            )}
          />
        </Col>
        <Col lg={5} md={5} sm={12}>
          <Controller
            control={control}
            name="city"
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <StyledSelect
                label="City *"
                options={cityOptions}
                controlStyle={selectControlStyle}
                placeholder="e.g. Los Angeles"
                onChange={onChange}
                isSearchable
              />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={5} md={5} sm={12}>
          <NumberInput
            customInput={StyledInput}
            format="#####"
            mask="_"
            allowEmptyFormatting
            label="ZIP *"
            {...register("postal", {
              required: true,
            })}
          />
        </Col>
        <Col lg={5} md={5} sm={12}>
          <StyledRadioGroup>
            <legend>Industry Code *</legend>
            <div>
              <InputRadio
                label="NAICS"
                value={IndustryCodeType.NAICS}
                {...register("codeType", {
                  required: true,
                })}
              />
              <InputRadio
                label="SIC"
                value={IndustryCodeType.SIC}
                {...register("codeType", {
                  required: true,
                })}
              />
            </div>
          </StyledRadioGroup>
        </Col>
        <ShowOnMobile>
          <Col xs={12}>
            {Array.isArray(industryCodeOptions) &&
            industryCodeOptions.length ? (
              <Controller
                control={control}
                name="industryCode"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <IndustryCodeSelect
                    label={`${selectedCodeType} Code`}
                    onChange={onChange}
                    value={value}
                    controlStyle={selectControlStyle}
                    placeholder="Type to search..."
                    options={industryCodeOptions}
                    isSearchable
                    filterOption={createFilter({ ignoreAccents: false })}
                    optionHeight={getOptionHeightMobile}
                  />
                )}
              />
            ) : null}
          </Col>
        </ShowOnMobile>
      </Row>
      <Row>
        <Col lg={5} md={5} sm={12}>
          <MarginLabel>Effective Date *</MarginLabel>
          <Row>
            <Col lg={4} md={4}>
              <Controller
                control={control}
                name="effectiveYear"
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <StyledSelect
                    options={getYearOptions()}
                    placeholder="Year"
                    onChange={onChange}
                  />
                )}
              />
            </Col>
            <Col lg={4} md={4}>
              <Controller
                key="effectiveMonth"
                control={control}
                name="effectiveMonth"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <StyledSelect
                    value={value}
                    options={monthOptions}
                    placeholder="Month"
                    onChange={onChange}
                  />
                )}
              />
            </Col>
          </Row>
        </Col>
        <Col lg={5} md={5} sm={12}>
          <ShowOnDesktop>
            {Array.isArray(industryCodeOptions) &&
            industryCodeOptions.length ? (
              <Controller
                control={control}
                name="industryCode"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <IndustryCodeSelect
                    label={`${selectedCodeType} Code`}
                    onChange={onChange}
                    value={value}
                    controlStyle={selectControlStyle}
                    placeholder="Type to search..."
                    options={industryCodeOptions}
                    isSearchable
                    filterOption={createFilter({ ignoreAccents: false })}
                    optionHeight={getOptionHeightDesktop}
                  />
                )}
              />
            ) : null}
          </ShowOnDesktop>
        </Col>
      </Row>
      <Row>
        <Col lg={4} md={4}>
          <SubmitButton
            type="submit"
            label="Next"
            disabled={!formState.isValid}
          />
        </Col>
      </Row>
    </form>
  );
};

export default observer(ProfileForm);
