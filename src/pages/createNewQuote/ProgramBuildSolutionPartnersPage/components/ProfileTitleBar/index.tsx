import {
  Container,
  Title,
  SubNavigationSection,
  LeftArrow,
  RightArrow,
  CommonButton,
} from "./profileTitleBar.style";

interface IProfileTitleBarProps {
  onClickNext: () => void;
  onClickPrevious: () => void;
}

const ProfileTitleBar = (props: IProfileTitleBarProps) => {
  const { onClickPrevious, onClickNext } = props;

  return (
    <Container>
      <Title xl="6" lg="6" md="12">
        Build Programs
      </Title>
      <SubNavigationSection xl="6" lg="6" md="12">
        <LeftArrow onClick={onClickPrevious} iconName="blue-arrow-right.png" />
        <RightArrow onClick={onClickNext} iconName="blue-arrow-right.png" />
        <CommonButton disabled label="Generate Programs (0)" />
      </SubNavigationSection>
    </Container>
  );
};

export default ProfileTitleBar;
