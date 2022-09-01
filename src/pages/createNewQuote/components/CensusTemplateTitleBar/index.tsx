import { useHistory } from "react-router-dom";
import Icon from "src/components/Icon";
import { ComponentContainer } from "./censusTemplateTitleBar.style";

const ProfileTitleBar = () => {
  const history = useHistory();

  return (
    <ComponentContainer>
      <div>
        <h1>Build a custom census template</h1>
        <h3>
          Tell us how the below information is stored in your custom census
          format so we can properly import the data.
        </h3>
        <a onClick={() => history.goBack()}>
          <Icon iconName="blue-arrow-right.png" size={18} />
          Back to Census
        </a>
      </div>
    </ComponentContainer>
  );
};
export default ProfileTitleBar;
