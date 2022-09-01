import { Container, CheckedIcon, UnCheckIcon } from "./checkMark.styles";

interface ICheckMark {
  checked?: boolean;
}

export const CheckMark = (props: ICheckMark) => {
  const { checked } = props;

  return (
    <Container>
      {checked && <CheckedIcon iconName="tick64px-thick-white.png" />}
      {!checked && <UnCheckIcon />}
    </Container>
  );
};

export default CheckMark;
