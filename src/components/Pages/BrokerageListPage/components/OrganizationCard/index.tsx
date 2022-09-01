import { get } from "lodash";
import { useHistory } from "react-router-dom";
import routes from "../../../../../routes";
import {
  Container,
  MainContent,
  BrokerageThumbnail,
  BrokerageDetails,
  BrokerageName,
  BrokerageLinkContainer,
  BrokerageLink,
} from "./styles";
const OrganizationCard = (props) => {
  const { data } = props;
  const history = useHistory();
  const orgName = get(data, "name", "");

  return (
    <Container md={6} lg={4}>
      <MainContent>
        <BrokerageThumbnail>{orgName.trim().slice(0, 1)}</BrokerageThumbnail>
        <BrokerageDetails>
          <BrokerageName>{orgName}</BrokerageName>
          <BrokerageLinkContainer>
            {`› `}
            <BrokerageLink
              onClick={() =>
                history.push(
                  "/dashboard/brokerage/" + data.id + "/prospects/list"
                )
              }
            >
              Quotes
            </BrokerageLink>
            {`› `}
            <BrokerageLink
              onClick={() =>
                history.push(
                  routes.dashboard.brokerage.teamMembers.getValue(data.id)
                )
              }
            >
              Team member
            </BrokerageLink>
          </BrokerageLinkContainer>
        </BrokerageDetails>
      </MainContent>
    </Container>
  );
};

export default OrganizationCard;
