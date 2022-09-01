import { useWatch, useFormContext } from "react-hook-form";
import { Input } from "reactstrap";
import { onCheckDeleteAll } from "src/pages/createNewQuote/HealthClaimsDocumentsPage/utils";
import { HealthClaimsFormValues } from "../../../../enums";
import { IClaimsDocumentsForm } from "../../../../interfaces";
import { NameHeader, CategoryType } from "./header.styles";

const Header = () => {
  const { control, reset } = useFormContext();
  const documentTable: IClaimsDocumentsForm[] = useWatch({
    control,
    name: HealthClaimsFormValues.CLAIM_DOCUMENTS,
  });

  return (
    <thead>
      <NameHeader>
        <th>
          <Input
            onChange={(value) =>
              onCheckDeleteAll(value?.target?.checked, documentTable, reset)
            }
            type="checkbox"
          />
          <span>Name</span>
        </th>
        <CategoryType>Category Type</CategoryType>
        <th>Year</th>
        <th>Upload Date</th>
        <th></th>
      </NameHeader>
    </thead>
  );
};

export default Header;
