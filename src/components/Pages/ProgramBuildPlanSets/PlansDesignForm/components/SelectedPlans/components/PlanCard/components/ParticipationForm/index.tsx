import { useEffect } from "react";
import { get } from "lodash";
import { useFormContext } from "react-hook-form";
import RowNoSpacing from "src/components/RowNoSpacing";
import { IMedicalPlan } from "src/interfaces/orgRecipes";
import { getParticipationFromExistingPlansOrCensusOptions } from "src/utils/census";
import useStore from "src/utils/useStore";
import {
  Container,
  TitleWrapper,
  CommonLabel,
  InputWrapper,
  CommonInputField,
  CommonInputFieldLabel,
  CommonInput,
  FormGroup,
  EditWrapper,
  EditIcon,
  Divider,
  CommonSelect,
  MediumSpacing,
} from "./participationForm.styles";

interface IParticipationFormProps {
  plan: IMedicalPlan;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const ParticipationForm = (props: IParticipationFormProps) => {
  const { plan, isEditing, setIsEditing } = props;

  const { register, reset } = useFormContext();
  const { existingPlansStore, censusDetailsStore } = useStore();
  const { existingPlans } = existingPlansStore;
  const { censusHumans } = censusDetailsStore;

  const participationOptions = getParticipationFromExistingPlansOrCensusOptions(
    censusHumans,
    existingPlans
  );

  function onSelectParticipationOption(selected) {
    reset(selected.value);
  }

  useEffect(() => {
    const defaultValue = {
      participation_estimation_employee: get(
        plan,
        "participation_estimation_employee",
        0
      ),
      participation_estimation_employee_child: get(
        plan,
        "participation_estimation_employee_child",
        0
      ),
      participation_estimation_employee_family: get(
        plan,
        "participation_estimation_employee_family",
        0
      ),
      participation_estimation_employee_spouse: get(
        plan,
        "participation_estimation_employee_spouse",
        0
      ),
    };
    reset(defaultValue);
  }, [plan]);

  return (
    <Container>
      <TitleWrapper xl="12">
        <CommonLabel>Participation</CommonLabel>
      </TitleWrapper>
      <InputWrapper xl="12">
        <RowNoSpacing>
          <FormGroup xl="11">
            <CommonInputField>
              <CommonInputFieldLabel>EE</CommonInputFieldLabel>
              <CommonInput
                type="number"
                disabled={!isEditing}
                {...register("participation_estimation_employee")}
              />
            </CommonInputField>
            <CommonInputField>
              <CommonInputFieldLabel>ES</CommonInputFieldLabel>
              <CommonInput
                type="number"
                disabled={!isEditing}
                {...register("participation_estimation_employee_spouse")}
              />
            </CommonInputField>
            <CommonInputField>
              <CommonInputFieldLabel>EC</CommonInputFieldLabel>
              <CommonInput
                type="number"
                disabled={!isEditing}
                {...register("participation_estimation_employee_child")}
              />
            </CommonInputField>
            <CommonInputField>
              <CommonInputFieldLabel>EF</CommonInputFieldLabel>
              <CommonInput
                type="number"
                disabled={!isEditing}
                {...register("participation_estimation_employee_family")}
              />
            </CommonInputField>
          </FormGroup>
          <EditWrapper xl="1">
            <EditIcon
              iconName="black_pencil.png"
              onClick={() => setIsEditing(true)}
            />
          </EditWrapper>
        </RowNoSpacing>
        {isEditing && (
          <>
            <Divider />
            <MediumSpacing>
              <CommonLabel>Use participation from</CommonLabel>
            </MediumSpacing>
            <CommonSelect
              options={participationOptions}
              placeholder="-"
              onChange={(selected) => onSelectParticipationOption(selected)}
            />
          </>
        )}
      </InputWrapper>
    </Container>
  );
};

export default ParticipationForm;
