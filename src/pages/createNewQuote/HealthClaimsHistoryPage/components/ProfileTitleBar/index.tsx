import RowNoSpacing from "src/components/RowNoSpacing";
import {
  Title,
  Description,
  ComponentContainer,
  Layout,
} from "./profileTitleBar.style";

const ProfileTitleBar = () => {
  return (
    <ComponentContainer>
      <RowNoSpacing>
        <Layout
          xl={{ size: 12 }}
          lg={{ size: 12 }}
          md={{ size: 12 }}
          sm={{ size: 12 }}
          xs={{ size: 12 }}
        >
          <Title>Claims History</Title>
          <Description>
            Get more accurate quotes by adding more detailed claims data. This
            is used to calculate more accurate illustrative quotes but is not
            required for underwriting. Click "Finished" when you are done or to
            continue.
          </Description>
        </Layout>
      </RowNoSpacing>
    </ComponentContainer>
  );
};

export default ProfileTitleBar;
