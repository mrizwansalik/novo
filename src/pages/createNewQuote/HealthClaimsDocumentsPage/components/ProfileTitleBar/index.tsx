import { observer } from "mobx-react";
import RowNoSpacing from "src/components/RowNoSpacing";
import useStore from "src/utils/useStore";
import {
  Title,
  Description,
  ComponentContainer,
  Layout,
} from "./profileTitleBar.style";

const ProfileTitleBar = () => {
  const { createQuoteStore } = useStore();
  const { quote } = createQuoteStore;

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
            Upload your claims documents for
            <span>{`${quote.name || ""}`}</span>. Claims Documents are not
            required for illustrative quotes, but are required for underwriting
            when not completing PHQs.
          </Description>
        </Layout>
      </RowNoSpacing>
    </ComponentContainer>
  );
};

export default observer(ProfileTitleBar);
