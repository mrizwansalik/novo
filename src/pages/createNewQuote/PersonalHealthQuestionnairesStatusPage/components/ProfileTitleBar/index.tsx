import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import {
  Title,
  Description,
  ComponentContainer,
} from "./profileTitleBar.styles";

const ProfileTitleBar = () => {
  return (
    <ComponentContainer>
      <RowNoSpacing>
        <ColNoSpacing
          xl={{ size: 12 }}
          lg={{ size: 12 }}
          md={{ size: 12 }}
          sm={{ size: 12 }}
          xs={{ size: 12 }}
        >
          <Title>Personal Health Questionnaires</Title>
          <Description>
            <span>
              Invite Employees to complete personal health questionnaires. Make
              sure to assign the PHQs you need completed prior to inviting
              employees. PHQs are required for underwriting when there is not
              sufficient claims history.
            </span>
          </Description>
        </ColNoSpacing>
      </RowNoSpacing>
    </ComponentContainer>
  );
};

export default ProfileTitleBar;
