import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  TableContainer,
  Table,
  TableHead,
  TableHeadContent,
  TableHeadRow,
  Checkbox,
  TableBodyRow,
  TableBody,
  TableBodyContent,
  DocumentNameItem,
  DocumentName,
  UploadDateAndDownloadComponent,
  DownloadButton,
  EmptyTableRow,
} from "../../../../QouteProposalUpdate/components/Tabs/Proposals/style";

const DocumentTable = ({ qouteRFPs }) => {
  const { qouteRFPsStore } = useStore();
  const { qouteOrg } = qouteRFPsStore;
  const history = useHistory();
  const { brokerageId, prospectId } = useParams<IParamTypes>();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeadRow>
            {/* {headerList.map((item, index) => ( */}
            <TableHeadContent style={{ width: "40%" }}>
              {/* {index === 0 && ( */}
              <Checkbox
              // checked={isSelectAll}
              // onClick={(e) => {
              //   onSelectAll(e.currentTarget.checked);
              //   setIsSelectAll(e.currentTarget.checked);
              // }}
              />
              {/* )} */}
              Name
            </TableHeadContent>
            <TableHeadContent style={{ width: "10%" }}>
              Shared With
            </TableHeadContent>
            <TableHeadContent style={{ width: "10%" }}>
              Modified
            </TableHeadContent>
            <TableHeadContent style={{ width: "40%" }}>
              Category
            </TableHeadContent>
            {/* // ))} */}
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {(!Array.isArray(qouteOrg.generic_field_responses.plan_documents) ||
            qouteOrg.generic_field_responses.plan_documents.length < 1) && (
            <EmptyTableRow colSpan={3}>
              No documents have been added.
            </EmptyTableRow>
          )}
          {Array.isArray(qouteOrg.generic_field_responses.plan_documents) &&
            qouteOrg.generic_field_responses.plan_documents.length > 0 &&
            qouteOrg.generic_field_responses.plan_documents.map((item) => (
              <TableBodyRow>
                <TableBodyContent>
                  <DocumentNameItem>
                    <Checkbox
                    // checked={selectedDocuments[item.id]}
                    // onClick={(e) =>
                    //   onSelectDocument(item.id, e.currentTarget.checked)
                    // }
                    />
                    <DocumentName
                      onClick={() => {
                        history.push(
                          routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps.proposalRequestUpdate.getValue(
                            brokerageId,
                            prospectId,
                            item.id
                          )
                        );
                      }}
                    >
                      {item.name}
                    </DocumentName>
                  </DocumentNameItem>
                  {/* )} */}
                </TableBodyContent>

                <TableBodyContent>
                  {/* {moment(item.modified).format("MMMM DD, YYYY")} */}
                </TableBodyContent>
                <TableBodyContent>
                  {moment(item.modified).format("MMMM DD, YYYY")}
                </TableBodyContent>
                <TableBodyContent>
                  <UploadDateAndDownloadComponent>
                    <DownloadButton
                      iconName="grey-download-tray.png"
                      size={24}
                      // onClick={() =>
                      //   downloadFileFromUrl(item.file, item.name)
                      // }
                    />
                  </UploadDateAndDownloadComponent>
                </TableBodyContent>
              </TableBodyRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentTable;
