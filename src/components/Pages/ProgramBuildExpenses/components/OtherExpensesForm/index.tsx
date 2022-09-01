import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { ExpenseTypeOptions } from "src/constants";
import { IFee } from "src/interfaces/benefit";
import {
  Container,
  StyledNumberInput,
  StyledSelect,
  InputGroupContainer,
  CommonTextarea,
  CommonInput,
} from "./otherExpensesForm.style";
import { PrimaryButton, SecondaryButton } from "./otherExpensesForm.style";

const OtherExpensesForm = ({
  fee,
  handleSaveAndAddExpense,
  handleDeleteExpense,
}) => {
  const { handleSubmit, control, setValue } = useForm<IFee>({
    mode: "onChange",
    defaultValues: fee,
  });

  const amountType = useWatch({
    control,
    name: "amount_type",
  });
  const amountSpouse = useWatch({
    control,
    name: "amount_spouse",
  });
  const name = useWatch({
    control,
    name: "name",
  });
  const amountEmployee = useWatch({
    control,
    name: "amount_employee",
  });
  const amountChildren = useWatch({
    control,
    name: "amount_children",
  });
  const amountFamily = useWatch({
    control,
    name: "amount_family",
  });
  const amountNumber = useWatch({
    control,
    name: "amount_number",
  });
  const amountText = useWatch({
    control,
    name: "amount_text",
  });

  const enable =
    ((amountType === "fixed_per_employee_per_month" ||
      amountType === "one_time_fee") &&
      amountNumber > 0) ||
    (amountType === "custom_text" && amountText !== "") ||
    (amountType === "four_tier_fixed_per_employee_per_month" &&
      (amountFamily > 0 ||
        amountChildren > 0 ||
        amountEmployee > 0 ||
        amountSpouse > 0));
  return (
    <Container>
      <form onSubmit={handleSubmit(handleSaveAndAddExpense)}>
        <Row>
          <Col xs={12} lg={3}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CommonInput
                  onChange={onChange}
                  placeholder={"Expense Name"}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </Col>
          <Col xs={12} lg={3}>
            <Controller
              control={control}
              name="amount_type"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <StyledSelect
                  options={ExpenseTypeOptions}
                  onChange={(option) => {
                    onChange(option.value);
                    if (
                      option.value === "fixed_per_employee_per_month" ||
                      option.value === "one_time_fee"
                    ) {
                      setValue("amount_employee", 0);
                      setValue("amount_spouse", 0);
                      setValue("amount_children", 0);
                      setValue("amount_family", 0);
                    } else if (
                      option.value === "four_tier_fixed_per_employee_per_month"
                    ) {
                      setValue("amount_number", 0);
                    }
                  }}
                  value={ExpenseTypeOptions.find((i) => i.value === value)}
                />
              )}
            />
          </Col>
          <Col xs={12} lg={3}>
            {amountType === "fixed_per_employee_per_month" && (
              <Controller
                control={control}
                name="amount_number"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <StyledNumberInput
                    onValueChange={({ value }) => onChange(parseInt(value))}
                    value={value}
                    thousandSeparator={true}
                    prefix={"$ "}
                    allowEmptyFormatting
                    isControlled
                  />
                )}
              />
            )}
            {amountType === "four_tier_fixed_per_employee_per_month" && (
              <InputGroupContainer>
                <Controller
                  control={control}
                  name="amount_employee"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <StyledNumberInput
                      onValueChange={({ value }) => onChange(parseInt(value))}
                      value={value}
                      thousandSeparator={true}
                      prefix={"$ "}
                      label={"EE"}
                      allowEmptyFormatting
                      isControlled
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="amount_spouse"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <StyledNumberInput
                      onValueChange={({ value }) => onChange(parseInt(value))}
                      value={value}
                      thousandSeparator={true}
                      prefix={"$ "}
                      label={"ES"}
                      allowEmptyFormatting
                      isControlled
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="amount_children"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <StyledNumberInput
                      onValueChange={({ value }) => onChange(parseInt(value))}
                      value={value}
                      thousandSeparator={true}
                      prefix={"$ "}
                      label={"EC"}
                      allowEmptyFormatting
                      isControlled
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="amount_family"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <StyledNumberInput
                      onValueChange={({ value }) => onChange(parseInt(value))}
                      value={value}
                      thousandSeparator={true}
                      prefix={"$ "}
                      label={"EF"}
                      allowEmptyFormatting
                      isControlled
                    />
                  )}
                />
              </InputGroupContainer>
            )}
            {amountType === "one_time_fee" && (
              <Controller
                control={control}
                name="amount_number"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <StyledNumberInput
                    onValueChange={({ value }) => onChange(parseInt(value))}
                    thousandSeparator={true}
                    prefix={"$ "}
                    value={value}
                    allowEmptyFormatting
                    isControlled
                  />
                )}
              />
            )}
            {amountType === "custom_text" && (
              <Controller
                control={control}
                name="amount_text"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CommonTextarea
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            )}
          </Col>
          <Col xs={12} lg={3}>
            {fee.id ? (
              <>
                <PrimaryButton
                  disabled={!enable}
                  type="submit"
                  label="Update"
                />
                <SecondaryButton
                  type="button"
                  label="Remove"
                  onClick={(e) => handleDeleteExpense(fee.id)}
                />
              </>
            ) : (
              <PrimaryButton disabled={!enable} type="submit" label="Add" />
            )}
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default OtherExpensesForm;
