import { get } from "lodash";
import { useHistory } from "react-router-dom";
import {
  Container,
  MainContent,
  BrokerageThumbnail,
  BrokerageDetails,
  BrokerageName,
  BrokerageLinkContainer,
} from "./styles";
const OrganizationCard = (props) => {
  const { data } = props;
  const history = useHistory();
  const carrierName = get(data, "name", "");
  const date = get(data, "effective_date", "");
  return (
    <Container md={6} lg={4}>
      <MainContent>
        <BrokerageThumbnail>
          {carrierName.trim().slice(0, 1)}
        </BrokerageThumbnail>
        <BrokerageDetails>
          <BrokerageName>{carrierName}</BrokerageName>
          <BrokerageLinkContainer>{`Created: ${data?.created} `}</BrokerageLinkContainer>
        </BrokerageDetails>
      </MainContent>
    </Container>
  );
};

export default OrganizationCard;
