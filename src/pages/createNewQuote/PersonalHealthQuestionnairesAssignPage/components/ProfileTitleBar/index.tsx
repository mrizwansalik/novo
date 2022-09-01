import ColNoSpacing from "src/components/ColNoSpacing";
import {
  Title,
  Description,
  ComponentContainer,
  HeaderLayout,
} from "./profileTitleBar.style";

const ProfileTitleBar = () => {
  return (
    <ComponentContainer>
      <HeaderLayout>
        <ColNoSpacing
          xl={{ size: 12 }}
          lg={{ size: 12 }}
          md={{ size: 12 }}
          sm={{ size: 12 }}
          xs={{ size: 12 }}
        >
          <Title>Assign PHQs</Title>
          <Description>
            <span>
              Select one or more Health Questionnaires for employees to
              complete.
            </span>
          </Description>
        </ColNoSpacing>
      </HeaderLayout>
    </ComponentContainer>
  );
};

export default ProfileTitleBar;
