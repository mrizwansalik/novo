import { useFormContext, useWatch } from "react-hook-form";
import RowNoSpacing from "src/components/RowNoSpacing";
import { SubNetworkFormValues } from "../../constants";
import {
  OutlineButton,
  SubmitButton,
  CancelButtonWrapper,
  SaveButtonWrapper,
  Container,
} from "./footer.styles";

interface IFooterProps {
  onClose: () => void;
}

const Footer = (props: IFooterProps) => {
  const { onClose } = props;
  const { control } = useFormContext();
  const subNetworkName: string = useWatch({
    control,
    name: SubNetworkFormValues.NAME,
  });

  return (
    <RowNoSpacing>
      <Container xl="12" lg="12" md="12" sm="12" xs="12">
        <CancelButtonWrapper>
          <OutlineButton onClick={onClose}>Cancel</OutlineButton>
        </CancelButtonWrapper>
        <SaveButtonWrapper>
          <SubmitButton disabled={!subNetworkName} type="submit">
            Save
          </SubmitButton>
        </SaveButtonWrapper>
      </Container>
    </RowNoSpacing>
  );
};

export default Footer;
