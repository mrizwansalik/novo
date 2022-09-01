import { DocumentStatus } from "src/constants/enum/document";
import { IOption } from "src/interfaces/common";

export const getWorkerOptions = (documentStatus: DocumentStatus) => {
  const workerOptions: IOption[] = [];

  if (
    documentStatus === DocumentStatus.SUBMITTED ||
    documentStatus === DocumentStatus.ACCEPTED ||
    documentStatus === DocumentStatus.REJECTED
  ) {
    return [
      ...workerOptions,
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
  }

  return [
    ...workerOptions,
    {
      label: "Requires Action",
      value: undefined,
    },
    {
      label: "Submitted",
      value: "submitted",
    },
  ];
};
