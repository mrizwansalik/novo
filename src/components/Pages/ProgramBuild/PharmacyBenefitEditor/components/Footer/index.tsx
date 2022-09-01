import { useFormContext, useWatch } from "react-hook-form";
import RowNoSpacing from "src/components/RowNoSpacing";
import { PharmacyBenefitFormValues } from "../../constants";
import {
  OutlineButton,
  SubmitButton,
  CancelButtonWrapper,
  SaveButtonWrapper,
  Container,
} from "./footer.styles";

interface IFooterProps {
  onClose: () => void;
  onSave: () => void;
}

const Footer = (props: IFooterProps) => {
  const { onClose, onSave } = props;
  const { control } = useFormContext();
  const subNetworkName: string = useWatch({
    control,
    name: PharmacyBenefitFormValues.NAME,
  });

  return (
    <RowNoSpacing>
      <Container xl="12" lg="12" md="12" sm="12" xs="12">
        <CancelButtonWrapper>
          <OutlineButton onClick={onClose}>Cancel</OutlineButton>
        </CancelButtonWrapper>
        <SaveButtonWrapper>
          <SubmitButton disabled={!subNetworkName} onClick={onSave}>
            Save
          </SubmitButton>
        </SaveButtonWrapper>
      </Container>
    </RowNoSpacing>
  );
};

export default Footer;
