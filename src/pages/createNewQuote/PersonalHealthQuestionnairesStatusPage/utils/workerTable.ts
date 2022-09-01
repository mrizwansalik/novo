import { IOption } from "src/interfaces/common";

export function extractSignatureState(signature: string): string {
  const signatureOption: IOption[] = [
    {
      label: "Signed",
      value: "fully_signed",
    },
    {
      label: "Unsigned",
      value: "needs_signatures",
    },
  ];

  const foundOption = signatureOption?.find(
    (option) => option.value === signature
  );

  return foundOption?.label;
}

export function extractDocumentStatus(status: string): string {
  const defaultOption: IOption = {
    label: "Requires Action",
    value: undefined,
  };

  const options: IOption[] = [
    {
      label: "Submitted",
      value: "submitted",
    },
    {
      label: "Accepted",
      value: "accepted",
    },
    {
      label: "Rejected",
      value: "rejected",
    },
  ];

  const foundOption =
    options?.find((option) => option.value === status) || defaultOption;
  return foundOption?.label;
}
