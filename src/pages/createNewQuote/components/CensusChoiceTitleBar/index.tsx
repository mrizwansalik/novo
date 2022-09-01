import { get } from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Icon from "src/components/Icon";
import useProspectDetail from "src/hooks/ProspectDetail";
import routes from "src/routes";
import { ComponentContainer } from "./censusTitleBar.style";
import { handleUpdateOrg } from "./utils";

const ProfileTitleBar = () => {
  const prospectDetail = useProspectDetail();

  const history = useHistory();
  const params = useParams();
  const prospectId: string = get(params, "orgId", "");

  async function handleSkip() {
    await handleUpdateOrg(prospectDetail);

    if (prospectId) {
      history.push(
        routes.dashboard.brokerage.prospects.onBoarding.health.phqs.invite.value(
          prospectId
        )
      );
    } else {
      toast.error("Problem updating org", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }

  return (
    <ComponentContainer>
      <h1>How would you like to add your census?</h1>
      <span>
        Or go to &nbsp;
        <a onClick={handleSkip}>
          assign PHQs <Icon iconName="blue-arrow-right.png" size={18} />
        </a>
      </span>
    </ComponentContainer>
  );
};
export default ProfileTitleBar;
