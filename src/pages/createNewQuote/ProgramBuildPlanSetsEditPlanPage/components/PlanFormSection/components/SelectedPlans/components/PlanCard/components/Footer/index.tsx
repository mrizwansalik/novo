import {
  Container,
  TextButton,
  CommonButton,
  ButtonWrapper,
} from "./footer.styles";

const Footer = () => {
  return (
    <Container>
      <ButtonWrapper>
        <TextButton label="Cancel" />
        <CommonButton label="Update" />
      </ButtonWrapper>
    </Container>
  );
};

export default Footer;
