import { IAssignedDocumentsTree } from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import { SetValue } from "src/types/hookForm";

export function handleChangeCheckbox(
  users: IAssignedDocumentsTree[],
  setValue: SetValue,
  checked: boolean
): void {
  users?.forEach((user: IAssignedDocumentsTree) => {
    setValue(`workers[${user?.worker?.id}]`, checked);
  });
}
