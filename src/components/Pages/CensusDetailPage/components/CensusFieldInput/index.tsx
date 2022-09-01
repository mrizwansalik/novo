import { observer } from "mobx-react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NumberInput from "src/components/NumberInput";
import { ICensusHuman } from "src/interfaces/census";
import { IParamTypes } from "src/types";
import { updateHuman } from "src/utils/humanCensus";
import useStore from "src/utils/useStore";
import {
  AdditionalData,
  ErrorComponent,
  ErrorMessage,
  StyledDateInput,
  StyledInput,
  StyledSelect,
} from "./censusFieldInput.style";
import { checkHasMissingField, IFieldInfo } from "./utils";

interface ICensusFieldInputProps {
  censusHuman: ICensusHuman;
  fieldName: string;
  onChange: any;
}

const genderOptions = [
  {
    value: "Male",
    label: "M",
  },
  {
    value: "Female",
    label: "F",
  },
];

const coverageType = [
  {
    label: "Employee",
    value: "employee",
  },
  {
    label: "Employee & Spouse",
    value: "employee_spouse",
  },
  {
    label: "Employee & Children",
    value: "employee_children",
  },
  {
    label: "Employee & Family",
    value: "employee_family",
  },
  {
    label: "Waived",
    value: "waived",
  },
];

const CensusFieldInput = (props: ICensusFieldInputProps) => {
  const { censusHuman, fieldName, onChange } = props;

  const { censusDetailsStore } = useStore();
  const { fields, numDependents } = censusDetailsStore;

  const { prospectId } = useParams<IParamTypes>();
  const fieldInfo: IFieldInfo = fields.find(
    (field) => field.accessor === fieldName
  );

  const additionalFieldData =
    censusHuman.additional_data[fieldInfo.field.mapping];

  async function preUploading(censusHuman, field, value) {
    let computedValue = value;
    if (field.mapping === "postal" && isNaN(Number(value))) {
      return false;
    }

    if (field.mapping === "birthday") {
      computedValue = moment(value).format("yyyy-MM-DD");
    }

    if (field.mapping === "gender" || field.mapping === "coverage_type") {
      computedValue = value.value;
    }

    try {
      toast.info("Updating census info...");
      await onChange(prospectId, censusHuman, field, computedValue);
      let updatedHumans = censusDetailsStore.censusHumans;
      updateHuman(updatedHumans, censusHuman.id);
      censusDetailsStore.updateCensusHumans(updatedHumans);
      toast.success("Census info updated.");
    } catch (err) {
      toast.error("There was a problem updating the census info.");
    }
  }

  function renderInputComponent() {
    switch (fieldName) {
      case "postal":
        return (
          <NumberInput
            customInput={StyledInput}
            format="#####"
            mask="_"
            allowEmptyFormatting
            onChange={(e) =>
              preUploading(censusHuman, fieldInfo.field, e.target.value)
            }
          />
        );
      case "birthday":
        return (
          <StyledDateInput
            dateFormat="yyyy/MM/DD"
            placeholderText=""
            showYearDropdown
            onChange={(date) =>
              preUploading(censusHuman, fieldInfo.field, date)
            }
          />
        );
      case "gender":
        return (
          <StyledSelect
            options={genderOptions}
            placeholder=""
            onChange={(selected) =>
              preUploading(censusHuman, fieldInfo.field, selected)
            }
          />
        );
      case "coverage_type":
        return (
          <StyledSelect
            options={coverageType}
            placeholder=""
            onChange={(selected) =>
              preUploading(censusHuman, fieldInfo.field, selected)
            }
          />
        );
      default:
        return "";
    }
  }

  if (fieldInfo.dependentOnly && numDependents === 0) {
    return;
  }

  //Show as normal table
  if (!checkHasMissingField(censusHuman, fieldInfo)) {
    return <>{censusHuman[fieldName]}</>;
  }

  //Show field as form, update onchange
  return (
    <ErrorComponent>
      <ErrorMessage>Required</ErrorMessage>
      {renderInputComponent()}
      {additionalFieldData && (
        <AdditionalData>
          Was:&nbsp;
          <span>{censusHuman.additional_data[fieldInfo.field.mapping]}</span>
        </AdditionalData>
      )}
    </ErrorComponent>
  );
};
export default observer(CensusFieldInput);
