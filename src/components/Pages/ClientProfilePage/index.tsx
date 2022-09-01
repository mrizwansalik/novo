/* eslint-disable max-lines */
import React from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { Controller } from "react-hook-form";
import { createFilter } from "react-select";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { updateProspectDetails } from "src/api/prospects";
import InputRadio from "src/components/InputRadio";
import NumberInput from "src/components/NumberInput";
import { IndustryCodeType } from "src/constants";
import useStore from "src/utils/useStore";
import useProfileForm from "./hook";
import {
  selectControlStyle,
  Container,
  ProfileContainer,
  TextInput,
  DropdownInput,
  RadioInputGroup,
  SubmitButton,
  MarginLabel,
  IndustryCodeSelect,
  ShowOnDesktop,
  ShowOnMobile,
} from "./styles";
import {
  getYearOptions,
  formatRequestData,
  getOptionHeightDesktop,
  getOptionHeightMobile,
} from "./utils";
const ClientProfilePage = () => {
  const { brokerProspectsListStore } = useStore();
  const { currentProspect } = brokerProspectsListStore;
  const countryName = get(currentProspect, "country.name", "");
  const country = get(currentProspect, "country");
  const {
    formControl,
    regionOptions,
    cityOptions,
    monthOptions,
    selectedCodeType,
    industryCodeOptions,
  } = useProfileForm(countryName);
  const { control, formState, handleSubmit } = formControl;
  const handleProfileFormSubmit = async (data) => {
    const formattedData = formatRequestData(data, currentProspect, country);
    const prospectId = get(formattedData, "id");
    const response = await updateProspectDetails(formattedData, prospectId);
    if (response) {
      toast.success("Client profile updated successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container>
      <ProfileContainer onSubmit={handleSubmit(handleProfileFormSubmit)}>
        <Row>
          <Col lg={5} md={5} sm={12}>
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Company Name"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Col>
          <Col lg={5} md={5} sm={12}>
            <Controller
              control={control}
              name="address"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Street Address"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={5} md={5} sm={12}>
            <Controller
              control={control}
              name="region"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <DropdownInput
                  label="State"
                  value={value}
                  options={regionOptions}
                  controlStyle={selectControlStyle}
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
              render={({ field: { value, onChange } }) => (
                <DropdownInput
                  label="City"
                  value={value}
                  options={cityOptions}
                  controlStyle={selectControlStyle}
                  onChange={onChange}
                  isSearchable
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={5} md={5} sm={12}>
            <Controller
              control={control}
              name="postal"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <NumberInput
                  customInput={TextInput}
                  format="#####"
                  mask="_"
                  allowEmptyFormatting
                  label="ZIP"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Col>
          <Col lg={5} md={5} sm={12}>
            <Controller
              control={control}
              name="codeType"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <RadioInputGroup>
                  <legend>Industry Code</legend>
                  <div>
                    <InputRadio
                      label={IndustryCodeType.NAICS}
                      value={IndustryCodeType.NAICS}
                      checked={selectedCodeType === IndustryCodeType.NAICS}
                      onChange={onChange}
                    />
                    <InputRadio
                      label={IndustryCodeType.SIC}
                      value={IndustryCodeType.SIC}
                      checked={selectedCodeType === IndustryCodeType.SIC}
                      onChange={onChange}
                    />
                  </div>
                </RadioInputGroup>
              )}
            />
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
                  render={({ field: { onChange, value } }) => (
                    <DropdownInput
                      options={getYearOptions()}
                      value={value}
                      onChange={onChange}
                      placeholder="Year"
                    />
                  )}
                />
              </Col>
              <Col lg={4} md={4}>
                <Controller
                  control={control}
                  name="effectiveMonth"
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DropdownInput
                      options={monthOptions}
                      value={value}
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
              label="Update"
              disabled={!formState.isDirty && formState.isValid}
            />
          </Col>
        </Row>
      </ProfileContainer>
    </Container>
  );
};

export default observer(ClientProfilePage);
