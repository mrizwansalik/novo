import flatten from "lodash/flatten";
import uniq from "lodash/uniq";
import {
  IAssignedDocument,
  IPhqDocument,
  IPhqDocumentCarrier,
} from "src/interfaces/benefit";
import { IWorker } from "src/interfaces/worker";
import BenefitStore from "src/stores/benefitStore";

export interface IAssignedDocumentsTree {
  owner: IPhqDocumentCarrier;
  documents: IPhqDocument[];
  assigned: IAssignedDocument[];
  worker?: IWorker;
}

export function buildAssignedDocumentsTree(
  benefitStore: BenefitStore
): IAssignedDocumentsTree[] {
  const assignedDocuments = benefitStore?.assignedDocuments || [];
  const userIds: string[][] = Array.isArray(assignedDocuments)
    ? assignedDocuments?.map((assignedDocument: IPhqDocument) => {
        const assigned = assignedDocument?.assigned || [];
        return Array.isArray(assigned)
          ? assigned?.map(
              (assignedDetail: IAssignedDocument) => assignedDetail?.owner?.id
            )
          : [];
      })
    : [];
  const uniqUserIds = uniq(flatten(userIds));
  const usersTree: IAssignedDocumentsTree[] = uniqUserIds?.map(
    (userId: string) => {
      let owner: IPhqDocumentCarrier = {} as IPhqDocumentCarrier;
      let documents: IPhqDocument[] = [];
      const userDocuments: IAssignedDocument[] = assignedDocuments?.map(
        (documentElement: IPhqDocument) => {
          const foundDocument = documentElement?.assigned?.find(
            (assignedDocument: IAssignedDocument) => {
              if (assignedDocument?.owner?.id === userId) {
                owner = assignedDocument?.owner;
                documents = [
                  ...documents,
                  {
                    ...documentElement,
                    ...assignedDocument,
                    assigned: undefined,
                  },
                ];
                return true;
              }
              return false;
            }
          );
          if (foundDocument) {
            return foundDocument;
          }
          return {} as IAssignedDocument;
        }
      );

      const tree: IAssignedDocumentsTree = {
        owner: owner,
        documents,
        assigned: userDocuments,
      };

      return tree;
    }
  );
  return usersTree;
}
