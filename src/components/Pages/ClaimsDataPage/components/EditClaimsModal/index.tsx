/* eslint-disable max-lines */
import React, { useEffect, useState, Fragment } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { get } from "lodash";
import { observer } from "mobx-react";
import moment from "moment";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Row, Col } from "reactstrap";
import ErrorMessage from "src/components/ErrorMessage";
import InputCheckbox from "src/components/InputCheckbox";
import Modal from "src/components/Modal";
import NumberInput from "src/components/NumberInput";
import RowNoSpacing from "src/components/RowNoSpacing";
import { SpecialTime } from "src/constants";
import { IStopLossClaims } from "src/interfaces/benefit";
import { IOption } from "src/interfaces/common";
import { IParamTypes } from "src/types";
import { thousandSeparatorByComma } from "src/utils/form";
import useStore from "src/utils/useStore";
import { ClaimsHistoryFormValues } from "./constants";
import {
  StyledModal,
  StyledModalBody,
  CloseIcon,
  StyledCol,
  SaveButton,
  YearTagContainer,
  YearLabel,
  TitleSection,
  DeleteModalBody,
  PrimaryButton,
  SecondaryButton,
  StyledDropdownInput,
  StyledLabel,
  StyledTextInput,
  AddNewClaimButton,
  FormTitle,
  DeleteYearIcon,
  AddButton,
  CancelButton,
  AddNewClaimInput,
  AmountGroup,
  EditIcon,
  RemoveIcon,
  InputWithSuffix,
  SuffixText,
  SaveAmountButton,
  ButtonContainer,
} from "./styles";
import {
  getYearTags,
  onSelectTag,
  enableDelete,
  getPaidThroughYearOptions,
  getEffectiveYearOptions,
  getPaidThroughMonthOptions,
  getPlanTypeOptions,
  getAverageRxPlan,
  getPaidThroughDateOptions,
  getPaidStatus,
  handleCreateStopLossClaims,
  handleAdd,
  handleCancel,
  handleUpdate,
  handleUpdateStopLossClaims,
  handleDeleteStopLossClaims,
  formatThousandSeparator,
  validationSchema,
  handleInitForm,
  createClaimsData,
  getEffectiveMonthOptions,
  getMonthsDiff,
  handleRemoveClaimsData,
} from "./utils";
interface IEditClaimsModalProps {
  isOpen?: boolean;
  toggle?: () => void;
}
interface IYearTag {
  label: string;
  value: number;
}

interface IYearSectionProps {
  onRemove?: (yearTag: IYearTag) => void;
}

interface IYearTagProps {
  active?: boolean;
  includeIcon?: boolean;
  label?: string;
  onClick?: () => void;
  onRemove?: () => void;
}

interface IClaimInputProps {
  value: number;
  stopLossClaimId: string;
  order: number;
  remove: (index: number) => void;
  handleUpdate: (order: number, updateValue: number) => void;
}

const LIMIT_AMOUNT: number = 10000;

const YearTag = (props) => {
  const { active, includeIcon, label, onClick, onRemove } = props;

  return (
    <YearTagContainer onClick={onClick} active={active}>
      <YearLabel active={active}>{label}</YearLabel>
      {includeIcon && (
        <DeleteYearIcon
          onClick={onRemove}
          iconName={active ? "xCircleLightBlue.png" : "large_blue_x.png"}
        />
      )}
    </YearTagContainer>
  );
};

const ClaimInput = (props: IClaimInputProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { value, order, remove, handleUpdate } = props;
  const [claimValue, setClaimValue] = useState<number>(value);

  return (
    <RowNoSpacing key={order}>
      <AmountGroup md={{ size: 4 }}>
        {!editMode && (
          <StyledLabel>{`$${thousandSeparatorByComma(value)}`}</StyledLabel>
        )}
        {editMode && (
          <NumberInput
            defaultValue={value}
            onChange={(event) => setClaimValue(Number(event.target.value))}
          />
        )}
        {editMode && (
          <SaveAmountButton
            onClick={() => {
              if (claimValue < LIMIT_AMOUNT) {
                toast.error(
                  `Claims must larger than $${thousandSeparatorByComma(
                    LIMIT_AMOUNT - 1
                  )}`
                );
                return;
              }
              handleUpdate(order, claimValue);
              setEditMode(false);
            }}
            label="Update"
          ></SaveAmountButton>
        )}
        {!editMode && (
          <ButtonContainer>
            <EditIcon
              onClick={() => setEditMode(true)}
              iconName="black_pencil.png"
            />
            <RemoveIcon
              onClick={() => remove(order)}
              iconName="red-trash.png"
            />
          </ButtonContainer>
        )}
      </AmountGroup>
    </RowNoSpacing>
  );
};

const EditClaimsModal = (props: IEditClaimsModalProps) => {
  const { isOpen, toggle } = props;
  const { prospectId } = useParams<IParamTypes>();
  const history = useHistory();
  const { healthHistoryStore, benefitStore } = useStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteYear, setDeleteYear] = useState<number>();
  const [enableDiscount, setEnableDiscount] = useState<boolean>(true);
  const [addNewClaimMode, setAddNewClaimMode] = useState<boolean>(false);
  const [claimAmount, setClaimAmount] = useState<any>(0);
  const [months, setMonths] = useState<any[]>([]);
  const { selectedYear } = healthHistoryStore;
  const { claimsData } = benefitStore;
  const years = getYearTags();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState,
    getValues,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const { errors, dirtyFields, isDirty } = formState;

  const watchPlanType: IOption = watch(ClaimsHistoryFormValues.PLAN_TYPE);
  const watchPaidThroughMonth: IOption = watch(
    ClaimsHistoryFormValues.PAID_THROUGH_MONTH
  );
  const monthClaims = watch(ClaimsHistoryFormValues.MONTHLY_CLAIM);
  const { fields, append, remove } = useFieldArray({
    control,
    name: ClaimsHistoryFormValues.LARGE_CLAIM_AMOUNT,
  });
  const watchLargeClaimArray = watch(
    ClaimsHistoryFormValues.LARGE_CLAIM_AMOUNT
  );
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchLargeClaimArray[index],
    };
  });
  const watchEffectiveYear = watch(ClaimsHistoryFormValues.PLAN_EFFECTIVE_YEAR);
  const watchEffectiveMonth = watch(
    ClaimsHistoryFormValues.PLAN_EFFECTIVE_MONTH
  );
  const watchPaidThroughYear = watch(ClaimsHistoryFormValues.PAID_THROUGH_YEAR);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    const year: Number =
      selectedYear === SpecialTime.LAST_YEAR
        ? moment().subtract(1, "year").toDate().getFullYear()
        : Number(selectedYear);
    handleInitForm(benefitStore, reset, year);
  }, [selectedYear, benefitStore?.claimsData]);

  useEffect(() => {
    if (dirtyFields[ClaimsHistoryFormValues.PLAN_EFFECTIVE_MONTH]) {
      setValue(ClaimsHistoryFormValues.PAID_THROUGH_YEAR, null);
      setValue(ClaimsHistoryFormValues.PAID_THROUGH_MONTH, null);
      setValue(ClaimsHistoryFormValues.PAID_THROUGH_DATE, null);
    }
  }, [watchEffectiveMonth]);

  useEffect(() => {
    if (
      dirtyFields[ClaimsHistoryFormValues.PAID_THROUGH_YEAR] ||
      dirtyFields[ClaimsHistoryFormValues.PAID_THROUGH_MONTH] ||
      dirtyFields[ClaimsHistoryFormValues.PAID_THROUGH_DATE]
    ) {
      setValue(ClaimsHistoryFormValues.PAID_THROUGH_MONTH, null);
      setValue(ClaimsHistoryFormValues.PAID_THROUGH_DATE, null);
    }
  }, [watchPaidThroughYear]);

  useEffect(() => {
    if (dirtyFields[ClaimsHistoryFormValues.PAID_THROUGH_MONTH]) {
      setValue(ClaimsHistoryFormValues.PAID_THROUGH_DATE, null);
    }
  }, [watchPaidThroughMonth]);

  useEffect(() => {
    if (watchPaidThroughMonth && watchPaidThroughYear && watchEffectiveMonth) {
      const numberOfAvailableMonths =
        getMonthsDiff(
          watchEffectiveYear.value,
          watchEffectiveMonth.value,
          watchPaidThroughYear.value,
          watchPaidThroughMonth.value
        ) + 1 || 0;
      setMonths(
        Array.from({
          length: numberOfAvailableMonths,
        }).map((_, order: number) => order)
      );
    } else {
      setMonths([]);
    }
  }, [
    watchPaidThroughYear?.value,
    watchPaidThroughMonth?.value,
    watchEffectiveMonth?.value,
    watchEffectiveYear?.value,
  ]);

  return (
    <StyledModal isOpen={isOpen} toggle={toggle}>
      <form
        onSubmit={handleSubmit(() => {
          createClaimsData(
            prospectId,
            getValues,
            healthHistoryStore,
            benefitStore,
            history,
            enableDiscount,
            months.length
          );
        })}
      >
        <CloseIcon iconName="cross-blue.png" size={10} onClick={toggle} />
        <StyledModalBody>
          <TitleSection>
            {Array.isArray(years) &&
              years.map((year: IYearTag, index: number) => (
                <YearTag
                  key={index}
                  onClick={() => onSelectTag(healthHistoryStore, year)}
                  onRemove={() => {
                    setDeleteYear(Number(year?.value));
                    setIsDeleteModalOpen(true);
                  }}
                  label={year.label}
                  includeIcon={enableDelete(claimsData, year.value)}
                  active={selectedYear === year.label}
                />
              ))}
            <Modal
              isOpen={isDeleteModalOpen}
              toggle={() => {
                setDeleteYear(undefined);
                setIsDeleteModalOpen(false);
              }}
              body={
                <DeleteModalBody>
                  <h5>{`Are you sure you want to remove this claims year?`}</h5>
                  <div>
                    <PrimaryButton
                      label="Yes"
                      onClick={async () => {
                        await handleRemoveClaimsData(
                          benefitStore,
                          prospectId,
                          deleteYear
                        );
                        setDeleteYear(undefined);
                        setIsDeleteModalOpen(false);
                      }}
                    />
                    <SecondaryButton
                      label="No"
                      onClick={() => {
                        setDeleteYear(undefined);
                        setIsDeleteModalOpen(false);
                      }}
                    />
                  </div>
                </DeleteModalBody>
              }
            />
          </TitleSection>

          {/* Plan info section */}
          <Row>
            <FormTitle md={12}>{`${selectedYear}'s Claims`}</FormTitle>
            <StyledCol md={6}>
              <StyledLabel>Plan Effective Date</StyledLabel>
              <Row>
                <Col xs={6} md={5} lg={4} xl={3}>
                  <Controller
                    control={control}
                    name={ClaimsHistoryFormValues.PLAN_EFFECTIVE_YEAR}
                    render={({ field: { onChange, value } }) => (
                      <StyledDropdownInput
                        value={value}
                        onChange={onChange}
                        placeholder="Year"
                        options={getEffectiveYearOptions(selectedYear)}
                      />
                    )}
                  />
                </Col>
                <Col xs={6} md={5} lg={4} xl={3}>
                  <Controller
                    control={control}
                    name={ClaimsHistoryFormValues.PLAN_EFFECTIVE_MONTH}
                    render={({ field: { onChange, value } }) => (
                      <StyledDropdownInput
                        value={value}
                        onChange={onChange}
                        placeholder="Month"
                        options={getEffectiveMonthOptions(selectedYear)}
                      />
                    )}
                  />
                </Col>
              </Row>
              <ErrorMessage>
                {get(
                  errors,
                  `${ClaimsHistoryFormValues.PLAN_EFFECTIVE_MONTH}.message`,
                  ""
                )}
              </ErrorMessage>
            </StyledCol>
            <StyledCol xs={12} md={4} lg={3}>
              <Controller
                name={ClaimsHistoryFormValues.CONTRACT_LENGTH}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledCol xs={10} md={12} xl={9}>
                    <NumberInput
                      customInput={StyledTextInput}
                      format="##"
                      allowEmptyFormatting
                      label="Contract Length"
                      value={value}
                      onChange={onChange}
                    />
                  </StyledCol>
                )}
              />
              <ErrorMessage>
                {get(
                  errors,
                  `${ClaimsHistoryFormValues.CONTRACT_LENGTH}.message`,
                  ""
                )}
              </ErrorMessage>
            </StyledCol>
          </Row>
          <Row>
            <StyledCol xs={12} md={5} lg={4}>
              <Controller
                name={ClaimsHistoryFormValues.AVERAGE_NUMBER_OF_EMPLOYEE}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledCol xs={10} md={12} xl={9}>
                    <NumberInput
                      customInput={StyledTextInput}
                      allowEmptyFormatting
                      label="Average Number of Employees"
                      value={value}
                      onChange={onChange}
                    />
                  </StyledCol>
                )}
              />
              <ErrorMessage>
                {get(
                  errors,
                  `${ClaimsHistoryFormValues.AVERAGE_NUMBER_OF_EMPLOYEE}.message`,
                  ""
                )}
              </ErrorMessage>
            </StyledCol>
            <StyledCol
              xs={12}
              md={{ size: 4, offset: 1 }}
              lg={{ size: 4, offset: 2 }}
            >
              <Controller
                name={ClaimsHistoryFormValues.ASSUMED_DISCOUNT}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledCol hasNoMarginBottom>
                    <InputWithSuffix>
                      <NumberInput
                        customInput={StyledTextInput}
                        allowEmptyFormatting
                        label="Assumed Discount"
                        value={value}
                        onChange={onChange}
                        disabled={!enableDiscount}
                      />
                      <SuffixText>%</SuffixText>
                    </InputWithSuffix>
                  </StyledCol>
                )}
              />

              <InputCheckbox
                label="Discount unknown"
                checked={!enableDiscount}
                onClick={() => setEnableDiscount(!enableDiscount)}
              />
              <ErrorMessage>
                {get(
                  errors,
                  `${ClaimsHistoryFormValues.ASSUMED_DISCOUNT}.message`,
                  ""
                )}
              </ErrorMessage>
            </StyledCol>
          </Row>
          {/* Plan type section */}
          <Row>
            <StyledCol xs={10} md={5} lg={4} xl={3}>
              <StyledLabel>Plan Type</StyledLabel>
              <Row>
                <Col>
                  <Controller
                    name={ClaimsHistoryFormValues.PLAN_TYPE}
                    control={control}
                    defaultValue={getPlanTypeOptions()[0]}
                    render={({ field: { onChange, value } }) => (
                      <StyledDropdownInput
                        defaultValue={getPlanTypeOptions()[0]}
                        options={getPlanTypeOptions()}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Col>
              </Row>
            </StyledCol>
            <StyledCol
              xs={12}
              md={{ size: 5, offset: 1 }}
              lg={{ size: 3, offset: 2 }}
              xl={{ size: 3, offset: 3 }}
              hasNoMarginBottom
            >
              <StyledLabel>Average Deductible</StyledLabel>
              <Controller
                name={ClaimsHistoryFormValues.AVERAGE_DEDUCTIVE}
                control={control}
                defaultValue={getPlanTypeOptions()[0]}
                render={({ field: { onChange, value } }) => (
                  <StyledCol xs={10} md={12} xl={9} hasNoMarginBottom>
                    <NumberInput
                      customInput={StyledTextInput}
                      allowEmptyFormatting
                      label="(Individual, In-network)"
                      thousandSeparator
                      value={value}
                      onChange={onChange}
                      prefix="$"
                      isNumericString
                    />
                  </StyledCol>
                )}
              />
              <ErrorMessage>
                {get(
                  errors,
                  `${ClaimsHistoryFormValues.AVERAGE_DEDUCTIVE}.message`,
                  ""
                )}
              </ErrorMessage>
            </StyledCol>
          </Row>
          <Row>
            <StyledCol xs={12} md={5} lg={4} xl={3}>
              <StyledLabel>Average Coinsurance</StyledLabel>
              <Controller
                name={ClaimsHistoryFormValues.AVERAGE_COINSURANCE}
                control={control}
                defaultValue={getPlanTypeOptions()[0]}
                render={({ field: { onChange, value } }) => (
                  <StyledCol xs={12} hasNoMarginBottom>
                    <InputWithSuffix>
                      <NumberInput
                        customInput={StyledTextInput}
                        allowEmptyFormatting
                        label="(Individual, In-network)"
                        value={value}
                        onChange={onChange}
                        isNumericString
                      />
                      <SuffixText>%</SuffixText>
                    </InputWithSuffix>
                  </StyledCol>
                )}
              />
              <ErrorMessage>
                {get(
                  errors,
                  `${ClaimsHistoryFormValues.AVERAGE_COINSURANCE}.message`,
                  ""
                )}
              </ErrorMessage>
            </StyledCol>
            <StyledCol
              xs={12}
              md={{ size: 5, offset: 1 }}
              lg={{ size: 3, offset: 2 }}
              xl={{ size: 3, offset: 3 }}
            >
              <StyledLabel>Average OOPM</StyledLabel>
              <Controller
                name={ClaimsHistoryFormValues.AVERAGE_OOPM}
                control={control}
                defaultValue={getPlanTypeOptions()[0]}
                render={({ field: { onChange, value } }) => (
                  <StyledCol xs={10} md={12} xl={9}>
                    <NumberInput
                      customInput={StyledTextInput}
                      allowEmptyFormatting
                      label="(Individual, In-network)"
                      thousandSeparator
                      value={value}
                      onChange={onChange}
                      prefix="$"
                      isNumericString
                    />
                  </StyledCol>
                )}
              />
              <ErrorMessage>
                {get(
                  errors,
                  `${ClaimsHistoryFormValues.AVERAGE_OOPM}.message`,
                  ""
                )}
              </ErrorMessage>
            </StyledCol>
          </Row>
          {/* Payment info section */}
          <Row>
            <StyledCol xs={10} md={5} lg={4} xl={3}>
              <StyledLabel>Average RX Plan</StyledLabel>
              <Row>
                <Col>
                  <Controller
                    name={ClaimsHistoryFormValues.AVERAGE_RX_PLAN}
                    control={control}
                    defaultValue={getAverageRxPlan()[0]}
                    render={({ field: { onChange, value } }) => (
                      <StyledDropdownInput
                        placeholder="Ded / Coin"
                        isDisabled={
                          watchPlanType?.value ===
                          getPlanTypeOptions()[1]?.value
                        }
                        {...(watchPlanType?.value ===
                          getPlanTypeOptions()[1]?.value && {
                          value: getAverageRxPlan()[0],
                        })}
                        options={getAverageRxPlan()}
                        defaultValue={getAverageRxPlan()[0]}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Col>
              </Row>
            </StyledCol>

            <StyledCol
              xs={12}
              md={{ size: 6, offset: 1 }}
              lg={{ size: 6, offset: 2 }}
              xl={{ size: 5, offset: 3 }}
              hasNoMarginBottom
            >
              <StyledLabel>Paid Through Date</StyledLabel>
              <Row>
                <Col xs={4} md={4}>
                  <Controller
                    name={ClaimsHistoryFormValues.PAID_THROUGH_YEAR}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <StyledDropdownInput
                        options={getPaidThroughYearOptions(
                          watchEffectiveYear,
                          watchEffectiveMonth
                        )}
                        placeholder="Year"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Col>
                <Col xs={4} md={4}>
                  <Controller
                    name={ClaimsHistoryFormValues.PAID_THROUGH_MONTH}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <StyledDropdownInput
                        options={getPaidThroughMonthOptions(
                          watchEffectiveYear,
                          watchEffectiveMonth,
                          watchPaidThroughYear
                        )}
                        placeholder="Month"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Col>
                <Col xs={4} md={4}>
                  <Controller
                    name={ClaimsHistoryFormValues.PAID_THROUGH_DATE}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <StyledDropdownInput
                        options={getPaidThroughDateOptions(
                          watchPaidThroughYear,
                          watchPaidThroughMonth
                        )}
                        placeholder="Day"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Col>
              </Row>
              <ErrorMessage>
                {get(
                  errors,
                  `${ClaimsHistoryFormValues.PAID_THROUGH_DATE}.message`,
                  ""
                )}
              </ErrorMessage>
            </StyledCol>
          </Row>
          <Row>
            <StyledCol xs={10} md={5} lg={4} xl={3}>
              <StyledLabel>Paid Status</StyledLabel>
              <Row>
                <Col>
                  <Controller
                    name={ClaimsHistoryFormValues.PAID_STATUS}
                    control={control}
                    defaultValue={getPaidStatus()[0]}
                    render={({ field: { onChange, value } }) => (
                      <StyledDropdownInput
                        options={getPaidStatus()}
                        defaultValue={getPaidStatus()[0]}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Col>
              </Row>
            </StyledCol>
          </Row>
          {/* Monthly claims section */}
          <Row>
            <StyledLabel>Monthly Claims</StyledLabel>
            {Array.isArray(months) && months.length > 0 && (
              <StyledCol xs={12}>Number of months: {months.length}</StyledCol>
            )}
            <Row>
              {Array.isArray(months) &&
                months.map((month: number, order: number) => {
                  return (
                    <Col xs={6} md={3}>
                      <Controller
                        name={`${ClaimsHistoryFormValues.MONTHLY_CLAIM}[${order}].checked`}
                        control={control}
                        render={({ field }) => (
                          <InputCheckbox
                            label={`Month #${month + 1}`}
                            checked={get(
                              monthClaims,
                              `[${order}].checked`,
                              true
                            )}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`${ClaimsHistoryFormValues.MONTHLY_CLAIM}[${order}].amount`}
                        control={control}
                        render={({ field }) => (
                          <NumberInput
                            disabled={
                              !get(monthClaims, `[${order}].checked`, true)
                            }
                            thousandSeparator
                            customInput={StyledTextInput}
                            allowEmptyFormatting
                            {...field}
                          />
                        )}
                      />
                      <ErrorMessage>
                        {get(
                          errors,
                          `${ClaimsHistoryFormValues.MONTHLY_CLAIM}[${order}].message`,
                          ""
                        )}
                      </ErrorMessage>
                    </Col>
                  );
                })}
            </Row>
          </Row>
          {/* Large claims section */}
          <Row>
            <StyledLabel>Large Claims</StyledLabel>
            <StyledCol xs={12}>Claims that exceed $10,000.</StyledCol>
            <StyledCol xs={12}>
              <AddNewClaimButton
                label="Add new claim"
                onClick={() => setAddNewClaimMode(true)}
              />
              {addNewClaimMode && (
                <Fragment>
                  <StyledLabel noMarginBottom>Amount</StyledLabel>
                  <AddNewClaimInput xs={12} md={12} lg={6}>
                    <NumberInput
                      customInput={StyledTextInput}
                      onChange={(event) => setClaimAmount(event.target.value)}
                    />
                    <AddButton
                      disabled={Number(claimAmount) < LIMIT_AMOUNT}
                      onClick={() => {
                        handleCreateStopLossClaims(
                          benefitStore,
                          healthHistoryStore,
                          prospectId,
                          formatThousandSeparator(claimAmount)
                        ).then((stopLossClaims) => {
                          if (stopLossClaims) {
                            handleAdd(
                              addNewClaimMode,
                              setAddNewClaimMode,
                              claimAmount,
                              stopLossClaims?.id,
                              append
                            );
                            setClaimAmount(0);
                          }
                        });
                      }}
                      label="Add"
                    />
                    <CancelButton
                      onClick={() =>
                        handleCancel(addNewClaimMode, setAddNewClaimMode)
                      }
                      label="Cancel"
                    />
                  </AddNewClaimInput>
                </Fragment>
              )}
              <Col xs={12}>
                <StyledLabel noMarginBottom>Amount</StyledLabel>
              </Col>
              {Array.isArray(controlledFields) &&
                controlledFields.map(
                  (field: IStopLossClaims, index: number) => {
                    return (
                      <ClaimInput
                        handleUpdate={(order: number, updateValue: number) => {
                          handleUpdateStopLossClaims(
                            benefitStore,
                            healthHistoryStore,
                            field.id,
                            prospectId,
                            updateValue
                          );
                          handleUpdate(
                            setValue,
                            fields as IStopLossClaims[],
                            order,
                            updateValue
                          );
                        }}
                        value={get(field, "amount", 0)}
                        stopLossClaimId={get(field, "id", "")}
                        order={index}
                        remove={async (order: number) => {
                          await handleDeleteStopLossClaims(
                            benefitStore,
                            healthHistoryStore,
                            field.id,
                            prospectId
                          );
                          remove(order);
                        }}
                        key={field.id}
                      />
                    );
                  }
                )}
            </StyledCol>
          </Row>
          <Row>
            <StyledCol>
              <SaveButton label={`Save ${selectedYear}'s Claims Data`} />
            </StyledCol>
          </Row>
        </StyledModalBody>
      </form>
      {/* INFO: Delete year */}
    </StyledModal>
  );
};

export default observer(EditClaimsModal);
