/* eslint-disable max-lines */
import React from "react";
import { isEmpty } from "lodash";
import { useFormContext, useWatch } from "react-hook-form";
import { Row } from "src/components/Pages/ProspectDashboard/prospectDashboard.styles";
import Tooltip from "src/components/Tooltip";
import { makeInputTextUppercase } from "src/utils/form";
import {
  StyledCol,
  StyledInput,
  StyledLabel,
  StyledRow,
  TooltipContent,
} from "../uploadTemplateForm.style";

const TemplateSection = () => {
  const { control, register } = useFormContext();

  const watchRelationshipColumn = useWatch({
    control,
    name: "relationship_column",
  });
  const hasRelationshipColumnValue = !isEmpty(watchRelationshipColumn);

  const watchCoverageColumn = useWatch({
    control,
    name: "coverage_column",
  });
  const hasCoverageColumnValue = !isEmpty(watchCoverageColumn);

  return (
    <>
      <StyledRow>
        <StyledCol lg={12} md={12} sm={12}>
          <h2>Identify the columns below</h2>
        </StyledCol>
        <StyledCol lg={4} md={4} sm={12}>
          <StyledInput
            isShort
            isControlled
            label="Zip Code"
            subLabel="Full address is acceptable"
            placeholder="e.g. B"
            onInput={makeInputTextUppercase}
            register={{ ...register("postal_column") }}
          />
        </StyledCol>
        <StyledCol lg={4} md={4} sm={12}>
          <StyledInput
            labelComponent={
              <StyledLabel>
                Date of Birth{" "}
                <Tooltip id="date-of-birth">
                  <TooltipContent>
                    Acceptable formats are <strong>mm-dd-yy</strong> or{" "}
                    <strong>yyyy-mm-dd</strong>. Either <strong>-</strong> or{" "}
                    <strong>/</strong> are OK.
                  </TooltipContent>
                </Tooltip>
              </StyledLabel>
            }
            subLabel="mm-(/)dd-(/)yy, or yyyy-(/)mm-(/)dd"
            placeholder="e.g. C"
            onInput={makeInputTextUppercase}
            isShort
            isControlled
            register={{ ...register("birthday_column") }}
          />
        </StyledCol>
        <StyledCol lg={4} md={4} sm={12}>
          <StyledInput
            label="Gender"
            subLabel="M, male, F, female"
            placeholder="e.g. D"
            onInput={makeInputTextUppercase}
            isShort
            isControlled
            register={{ ...register("gender_column") }}
          />
        </StyledCol>
      </StyledRow>
      <StyledRow>
        <StyledCol lg={4} md={4} sm={12}>
          <StyledInput
            label="Relationship"
            placeholder="e.g. G"
            onInput={makeInputTextUppercase}
            isShort
            isControlled
            register={{ ...register("relationship_column") }}
          />
          {hasRelationshipColumnValue && (
            <>
              <StyledInput
                labelComponent={
                  <StyledLabel>
                    Relationship Labels{" "}
                    <Tooltip id="relationship-labels">
                      <TooltipContent>
                        The three relationship labels are{" "}
                        <strong>employee, spouse</strong> and{" "}
                        <strong>child</strong>. If labelled differently, then
                        assign them here.
                      </TooltipContent>
                    </Tooltip>
                  </StyledLabel>
                }
                placeholder="Employee"
                isMedium
                hasMarginTop
                isControlled
                register={{ ...register("relationship_employee") }}
              />
              <StyledInput
                noLabel
                isMedium
                hasMarginTop
                isControlled
                defaultValue="Spouse"
                register={{ ...register("relationship_spouse") }}
              />
              <StyledInput
                noLabel
                isMedium
                hasMarginTop
                isControlled
                defaultValue="Child"
                register={{ ...register("relationship_child") }}
              />
            </>
          )}
        </StyledCol>
        <StyledCol lg={4} md={4} sm={12}>
          <StyledInput
            label="Medical Coverage"
            subLabel="If left blank, then the medical coverage will be based off the relationship column"
            placeholder="e.g. A"
            onInput={makeInputTextUppercase}
            isShort
            isControlled
            register={{ ...register("coverage_column") }}
          />
        </StyledCol>
        <StyledCol lg={4} md={4} sm={12}>
          {hasCoverageColumnValue && (
            <>
              <StyledLabel>
                Relationship Types{" "}
                <Tooltip id="relationship-types">
                  <TooltipContent>
                    The four relationship types are <strong>EE</strong>
                    (employee), <strong>ES</strong> (employee + spouse),{" "}
                    <strong>EC</strong> (employee + children) and{" "}
                    <strong>EF</strong> (employee + family). If labelled
                    differently, then assign them here.
                  </TooltipContent>
                </Tooltip>
              </StyledLabel>
              <Row>
                <StyledCol lg={5} md={5} noPaddingLeft>
                  <StyledInput
                    noLabel
                    isControlled
                    placeholder="EE"
                    defaultValue="EE"
                    register={{ ...register("coverage_ee") }}
                  />
                </StyledCol>
                <StyledCol lg={5} md={5} noPaddingLeft>
                  <StyledInput
                    noLabel
                    isControlled
                    placeholder="ES"
                    defaultValue="ES"
                    register={{ ...register("coverage_es") }}
                  />
                </StyledCol>
              </Row>
              <Row>
                <StyledCol lg={5} md={5} noPaddingLeft>
                  <StyledInput
                    noLabel
                    hasMarginTop
                    isControlled
                    placeholder="EC"
                    defaultValue="EC"
                    register={{ ...register("coverage_ec") }}
                  />
                </StyledCol>
                <StyledCol lg={5} md={5} noPaddingLeft>
                  <StyledInput
                    noLabel
                    hasMarginTop
                    isControlled
                    placeholder="EF"
                    defaultValue="EF"
                    register={{ ...register("coverage_ef") }}
                  />
                </StyledCol>
              </Row>
              <StyledInput
                label="Waived"
                placeholder="Waived"
                defaultValue="W*"
                onInput={makeInputTextUppercase}
                isShort
                hasMarginTop
                isControlled
                register={{ ...register("coverage_waived") }}
              />
            </>
          )}
        </StyledCol>
      </StyledRow>

      <StyledRow>
        <StyledCol lg={6} md={6} sm={12}>
          <StyledInput
            label="Employee last names"
            subLabel="This can be specified as lastname, firstname or firstname lastname"
            placeholder="e.g. F"
            onInput={makeInputTextUppercase}
            isMedium
            isControlled
            register={{ ...register("last_name_column_ee") }}
          />
        </StyledCol>
        <StyledCol lg={6} md={6} sm={12}>
          <StyledInput
            label="Employee first names"
            subLabel="This only applies if the employee's full name is not in the last name column"
            placeholder="e.g. E"
            onInput={makeInputTextUppercase}
            isMedium
            isControlled
            register={{ ...register("first_name_column_ee") }}
          />
        </StyledCol>
      </StyledRow>

      <StyledRow>
        <StyledCol lg={6} md={6} sm={12}>
          <StyledInput
            label="Dependent last names"
            subLabel="This only applies if dependent last names are in a different column than the employee's"
            placeholder="e.g. J"
            onInput={makeInputTextUppercase}
            isMedium
            isControlled
            register={{ ...register("last_name_column_dep") }}
          />
        </StyledCol>
        <StyledCol lg={6} md={6} sm={12}>
          <StyledInput
            label="Dependent first names"
            subLabel="This only applies if dependent first names are in a different column than the employee's"
            placeholder="e.g. I"
            onInput={makeInputTextUppercase}
            isMedium
            isControlled
            register={{ ...register("first_name_column_dep") }}
          />
        </StyledCol>
      </StyledRow>

      <StyledRow isLastRow>
        <StyledCol lg={6} md={6} sm={12}>
          <StyledInput
            label="Which column contains medical plan selection?"
            subLabel="This only applies if there are multiple plan selections"
            placeholder="e.g. H"
            onInput={makeInputTextUppercase}
            isMedium
            isControlled
            register={{ ...register("plan_column") }}
          />
        </StyledCol>
      </StyledRow>
    </>
  );
};
export default TemplateSection;
