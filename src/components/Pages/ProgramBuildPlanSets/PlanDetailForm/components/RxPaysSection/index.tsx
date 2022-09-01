import { useEffect } from "react";
import get from "lodash/get";
import isFunction from "lodash/isFunction";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { Row, Col } from "reactstrap";
import {
  createMedicalPlanInPlanSet,
  updateMedicalPlanInPlanSet,
} from "src/api/planSet";
import {
  Container,
  Title,
  StyledCheckbox,
  StyledNumberInput,
  StyledInput,
  StyledButton,
  StyledOutlineButton,
} from "../../planDetailForm.style";
import RxTierSelect from "../RxTierSelect";

const RxPaysSection = (props) => {
  const { onCancel, orgId, planSetId, planId } = props;
  const { control, formState, handleSubmit, setValue } = useFormContext();
  const { errors } = formState;

  const handleSubmitForm = async (data) => {
    try {
      if (planSetId) {
        if (!data.medical_plan?.name) {
          toast.error("Name is required.");
          return;
        }
        if (!data.medical_plan.out_of_pocket_max_family_in) {
          toast.error("Individual out of pocket max is required.");
          return;
        }
        if (planId) {
          await updateMedicalPlanInPlanSet(orgId, planSetId, planId, data);
        } else {
          await createMedicalPlanInPlanSet(orgId, planSetId, data);
        }
        toast.success("Plan saved.");
        onCancel();
      }
    } catch (e) {
      toast.error("There was an error saving the plan.");
    }
  };

  const handleCancelForm = () => {
    if (isFunction(onCancel)) {
      onCancel();
    }
  };

  const rxDeductible = useWatch({
    control,
    name: "medical_plan.rx_deductible",
  });

  const selectedHsaQualified = useWatch({
    control,
    name: "medical_plan.hsa_qualified",
  });

  useEffect(() => {
    if (selectedHsaQualified) {
      setValue("medical_plan.rx_deductible", null);
    }
  }, [selectedHsaQualified]);

  return (
    <Container>
      <Row>
        <Title>
          <h1>Rx Co-pays</h1>
        </Title>
        {selectedHsaQualified && (
          <div>
            *rx copay options are locked because HSA eligiblility is checked
          </div>
        )}
      </Row>
      <RxTierSelect />
      <Col sm="12" lg="5">
        <Row>
          <Col sm="8">
            <StyledCheckbox
              label="Use separate Rx deductible"
              checked={rxDeductible !== undefined}
              onChange={(e) =>
                e.target.checked
                  ? setValue("medical_plan.rx_deductible", null)
                  : setValue("medical_plan.rx_deductible", undefined)
              }
            />
          </Col>

          {rxDeductible !== undefined && (
            <Col sm="4">
              <Controller
                control={control}
                name="medical_plan.rx_deductible"
                render={({ field: { onChange, value } }) => (
                  <StyledNumberInput
                    onValueChange={({ value }) => {
                      onChange(value);
                    }}
                    value={value}
                    customInput={StyledInput}
                    thousandSeparator={true}
                    prefix={"$ "}
                    allowEmptyFormatting
                    isControlled
                  />
                )}
              />
            </Col>
          )}
        </Row>
        <Title>
          <h2>Name *</h2>
        </Title>
        <Controller
          control={control}
          name="medical_plan.name"
          render={({ field: { onChange, value } }) => (
            <StyledInput
              onChange={(e) => {
                onChange(e.target.value);
              }}
              placeholer="e.g Aetina POS 1000"
              value={value}
              error={get(errors, "medical_plan.name.message", "")}
            />
          )}
        />
      </Col>
      <Row>
        <Col>
          <StyledButton onClick={handleSubmit(handleSubmitForm)}>
            Save Plan
          </StyledButton>
          <StyledOutlineButton onClick={handleCancelForm}>
            Cancel
          </StyledOutlineButton>
        </Col>
      </Row>
    </Container>
  );
};

export default RxPaysSection;
