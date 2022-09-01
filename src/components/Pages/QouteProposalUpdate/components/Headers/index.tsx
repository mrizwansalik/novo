import { observer } from "mobx-react";
import {
  ActionSheetContainer,
  ActionSheetLayout,
  BrokerageCount,
  Header,
  HeaderLabel,
} from "./style";
const Headers = () => {
  return (
    <ActionSheetContainer>
      <ActionSheetLayout md={12}>
        <BrokerageCount>
          <Header>Novo RE</Header>
        </BrokerageCount>
        <HeaderLabel>Draft</HeaderLabel>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(Headers);
