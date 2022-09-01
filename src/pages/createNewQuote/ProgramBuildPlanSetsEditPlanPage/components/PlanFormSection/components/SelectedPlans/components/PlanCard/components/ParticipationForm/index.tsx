import RowNoSpacing from "src/components/RowNoSpacing";
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

const ParticipationForm = () => {
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
              <CommonInput type="number" />
            </CommonInputField>
            <CommonInputField>
              <CommonInputFieldLabel>EE</CommonInputFieldLabel>
              <CommonInput type="number" />
            </CommonInputField>
            <CommonInputField>
              <CommonInputFieldLabel>EE</CommonInputFieldLabel>
              <CommonInput type="number" />
            </CommonInputField>
            <CommonInputField>
              <CommonInputFieldLabel>EE</CommonInputFieldLabel>
              <CommonInput type="number" />
            </CommonInputField>
          </FormGroup>
          <EditWrapper xl="1">
            <EditIcon iconName="black_pencil.png" />
          </EditWrapper>
        </RowNoSpacing>
        <Divider />
        <MediumSpacing>
          <CommonLabel>Use participation from</CommonLabel>
        </MediumSpacing>
        <CommonSelect />
      </InputWrapper>
    </Container>
  );
};

export default ParticipationForm;
