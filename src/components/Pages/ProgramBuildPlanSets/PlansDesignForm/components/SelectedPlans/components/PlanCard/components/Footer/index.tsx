import {
  Container,
  TextButton,
  CommonButton,
  ButtonWrapper,
} from "./footer.styles";

const Footer = ({ setIsEditing }) => {
  return (
    <Container>
      <ButtonWrapper>
        <TextButton label="Cancel" onClick={() => setIsEditing(false)} />
        <CommonButton label="Update" type="submit" />
      </ButtonWrapper>
    </Container>
  );
};

export default Footer;
