import React, { useState, Fragment } from "react";
import { observer } from "mobx-react";
import { Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrgWorkerBroker } from "../../../api/broker";
import { addBrokerage } from "../../../api/brokerage";
import { createNewOrg } from "../../../api/org";
import { createOrgWorker } from "../../../api/worker";
import bookmarkIcon from "../../../assets/images/bookmark64px100px.png";
import { currentAvailableCountries } from "../../../constants/region/countries";

import { IBroker } from "../../../interfaces/broker";
import { INewOrgFormValues } from "../../../interfaces/org";
import routes from "../../../routes";
import useAddBrokerageForm from "./hooks";
import {
  AddBrokerageContainer,
  AddBrokerageForm,
  AddBrokerageFormWrapper,
  FormSuccessfulText,
  FormTitle,
  FormInput,
  SubmitButton,
  BackButton,
  BookmarkIcon,
  FormDropdown,
  FormNumberInput,
} from "./styles";

const AddBrokeragePage = () => {
  const { formControl, regionOptions, cityOptions } = useAddBrokerageForm();
  const [isFormSuccessful, setFormSuccessful] = useState(false);
  const [brokerSuccessful, setBrokerSuccessful] = useState(false);
  const [orgData, setOrgData]: any = useState();
  const history = useHistory();
  const {
    control,
    formState: { isValid },
    register,
    handleSubmit,
  } = formControl;
  const onSubmit = async (data: INewOrgFormValues) => {
    const responseData = await createNewOrg(data);
    setOrgData(responseData);
    if (responseData) {
      const brokerdata = await addBrokerage(responseData.id);
      if (brokerdata) {
        setFormSuccessful(true);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    } else {
      toast.error("Fail to add a new brokerage. Please try again!");
    }
  };

  const submitBroker = async (data: IBroker) => {
    const workerResponse = await createOrgWorker(orgData.id, data)
      .then((res) => {
        if (res) {
          const brokerData = createOrgWorkerBroker(orgData.id, res.id)
            .then((response) => {
              toast.success("Broker Successfully Created");
              setBrokerSuccessful(true);
            })
            .catch((err) => {
              toast.error(err.response.data.detail);
            });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      });
  };

  return (
    <AddBrokerageContainer>
      <AddBrokerageFormWrapper>
        <BookmarkIcon src={bookmarkIcon} alt="icon" />
        <AddBrokerageForm onSubmit={handleSubmit(onSubmit)}>
          {!isFormSuccessful && (
            <Fragment>
              <FormTitle>Add a new brokerage</FormTitle>
              <FormInput
                label="Name *"
                placeholder="Org's name"
                {...register("name", { required: true })}
              />

              <Controller
                control={control}
                name="country"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    label="Country *"
                    isSearchable
                    placeholder="Type and select the country..."
                    options={currentAvailableCountries}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                control={control}
                name="region"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    label="State *"
                    isSearchable
                    placeholder="Type and select the state..."
                    options={regionOptions}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                control={control}
                name="city"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    label="City *"
                    isSearchable
                    placeholder="Type and select the city..."
                    options={cityOptions}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />

              <FormInput
                label="Address *"
                placeholder="Org's address"
                {...register("address", { required: true })}
              />

              <FormNumberInput
                customInput={FormInput}
                format="#####"
                mask="_"
                allowEmptyFormatting
                label="Zip/Postal code *"
                {...register("postal", {
                  required: true,
                })}
              />

              <SubmitButton label="Continue" disabled={!isValid} />
            </Fragment>
          )}
        </AddBrokerageForm>
        <AddBrokerageForm onSubmit={handleSubmit(submitBroker)}>
          {isFormSuccessful && !brokerSuccessful && (
            <Fragment>
              <FormTitle>Create Administrator</FormTitle>
              <FormInput
                label="First Name *"
                placeholder="first name"
                {...register("first_name", { required: true })}
              />

              <FormInput
                label="Last Name *"
                placeholder="last name"
                {...register("last_name", { required: true })}
              />
              <FormInput
                label="Email *"
                placeholder="email"
                {...register("email", { required: true })}
              />

              <FormNumberInput
                customInput={FormInput}
                format="(###)###-####"
                mask="_"
                allowEmptyFormatting
                label="Phone *"
                {...register("phone", {
                  required: true,
                })}
              />

              <SubmitButton label="Continue" disabled={!isValid} />
            </Fragment>
          )}
        </AddBrokerageForm>
        {isFormSuccessful && brokerSuccessful && (
          <Fragment>
            <FormSuccessfulText>
              Successfully add a new brokerage
            </FormSuccessfulText>
            <BackButton
              label="Continue"
              onClick={() =>
                history.push(
                  routes.dashboard.brokerage.teamMembers.getValue(orgData.id)
                )
              }
            />
          </Fragment>
        )}
      </AddBrokerageFormWrapper>
    </AddBrokerageContainer>
  );
};

export default observer(AddBrokeragePage);
