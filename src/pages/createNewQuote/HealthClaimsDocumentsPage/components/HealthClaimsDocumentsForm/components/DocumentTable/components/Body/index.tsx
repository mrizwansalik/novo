import moment from "moment";
import { useWatch, useFormContext, Controller } from "react-hook-form";
import Icon from "src/components/Icon";
import SingleSelect from "src/components/SingleSelect";
import {
  getCategoryTypeOptions,
  getYearOptions,
} from "../../../../../../utils";
import { HealthClaimsFormValues } from "../../../../enums";
import { IClaimsDocumentsForm } from "../../../../interfaces";
import InputCell from "../InputCell";
import { EmptyTable } from "./body.styles";

const Body = () => {
  const { control } = useFormContext();
  const documentTable: IClaimsDocumentsForm[] = useWatch({
    control,
    name: HealthClaimsFormValues.CLAIM_DOCUMENTS,
  });

  return (
    <tbody>
      {!documentTable?.length && (
        <EmptyTable>No documents have been added.</EmptyTable>
      )}
      {Array.isArray(documentTable) &&
        documentTable.map(
          (uploadedDocument: IClaimsDocumentsForm, index: number) => {
            return (
              <tr key={index}>
                <InputCell uploadedDocument={uploadedDocument} order={index} />
                <td>
                  <Controller
                    control={control}
                    name={`${HealthClaimsFormValues.CLAIM_DOCUMENTS}[${index}].categoryType`}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <SingleSelect
                        menuPortalTarget={document.querySelector("body")}
                        options={getCategoryTypeOptions()}
                        onChange={onChange}
                        value={uploadedDocument?.categoryType}
                        defaultValue={uploadedDocument?.categoryType}
                      />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    name={`${HealthClaimsFormValues.CLAIM_DOCUMENTS}[${index}].year`}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <SingleSelect
                        menuPortalTarget={document.querySelector("body")}
                        options={getYearOptions()}
                        onChange={onChange}
                        value={uploadedDocument?.year}
                        defaultValue={uploadedDocument?.year}
                      />
                    )}
                  />
                </td>
                <td>{moment(uploadedDocument?.uploadDate).format("LL")}</td>
                <td>
                  <a href={uploadedDocument?.fileUrl}>
                    <Icon iconName="grey-download-tray.png" />
                  </a>
                </td>
              </tr>
            );
          }
        )}
    </tbody>
  );
};

export default Body;
