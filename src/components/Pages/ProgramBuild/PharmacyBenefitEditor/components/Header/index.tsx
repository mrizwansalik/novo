import RowNoSpacing from "src/components/RowNoSpacing";
import { Container, Title, CloseButton } from "./header.styles";

interface IHeaderProps {
  onClose: () => void;
}

const Header = (props: IHeaderProps) => {
  const { onClose } = props;

  return (
    <RowNoSpacing>
      <Container xl="12" lg="12" md="12" sm="12" xs="12">
        <Title>Add New Pharmacy Benefit Manager</Title>
        <CloseButton onClick={onClose} iconName="xCircleLightBlue.png" />
      </Container>
    </RowNoSpacing>
  );
};

export default Header;
