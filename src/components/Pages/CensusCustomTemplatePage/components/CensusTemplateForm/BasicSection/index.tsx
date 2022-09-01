import { Controller, get, useFormContext } from "react-hook-form";
import { FormGroup } from "reactstrap";
import InputRadio from "src/components/InputRadio";
import {
  StyledCol,
  StyledInput,
  StyledRadioGroup,
  StyledRow,
} from "../uploadTemplateForm.style";

const BasicSection = () => {
  const { formState, control, register, watch } = useFormContext();
  const { errors } = formState;
  const radioValue = watch("hasMultipleSheets");

  return (
    <>
      <StyledRow>
        <StyledCol lg={12} md={12} sm={12}>
          <h2>Basic</h2>
        </StyledCol>
        <StyledCol lg={4} md={4} sm={12}>
          <StyledInput
            isControlled
            label="Template Name *"
            subLabel="This will be saved to use again."
            placeholder="Custom template name"
            register={{ ...register("name") }}
            error={get(errors, "name.message", "")}
            helperText={get(errors, "name.message")}
          />
        </StyledCol>
        <StyledCol lg={4} md={4} sm={12}>
          <StyledRadioGroup>
            <legend>Includes 2 or more spreadsheet tabs</legend>
            <div>
              <Controller
                control={control}
                name="hasMultipleSheets"
                render={({ field: { value, onChange } }) => (
                  <FormGroup>
                    <InputRadio
                      label="No"
                      onChange={(e) => onChange(!Boolean(e.target.checked))}
                      checked={!value}
                    />
                    <InputRadio
                      label="Yes"
                      onChange={(e) => onChange(Boolean(e.target.checked))}
                      checked={value}
                    />
                  </FormGroup>
                )}
              />
            </div>
          </StyledRadioGroup>
          {radioValue && (
            <StyledInput
              isControlled
              placeholder="Sheet name"
              register={{
                ...register("sheet_name", {
                  validate: (value) => (radioValue && !value) || "please",
                }),
              }}
              error={get(errors, "sheet_name.message", "")}
              helperText={get(errors, "sheet_name.message")}
            />
          )}
        </StyledCol>
        <StyledCol lg={4} md={4} sm={12}>
          <StyledInput
            isControlled
            label="First row that contains employee info"
            placeholder="e.g. 2"
            type="number"
            min="1"
            isShort
            register={{ ...register("data_start_row") }}
          />
        </StyledCol>
      </StyledRow>

      <StyledRow isLastRow>
        <StyledCol lg={4} md={4} sm={12}>
          <StyledInput
            isControlled
            label="Last row of data"
            subLabel="Leave empty to stop at the first empty row."
            placeholder="e.g. 100"
            type="number"
            min="1"
            isShort
            register={{ ...register("data_end_row") }}
          />
        </StyledCol>
      </StyledRow>
    </>
  );
};
export default BasicSection;
