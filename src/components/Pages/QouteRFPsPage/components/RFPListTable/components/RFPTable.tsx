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

const RFPTable = ({ qouteRFPs }) => {
  const { qouteRFPsStore } = useStore();
  const { deleteQouteRfp } = qouteRFPsStore;
  const history = useHistory();
  const { brokerageId, prospectId } = useParams<IParamTypes>();
  const handleDelete = (id: string) => {
    deleteQouteRfp(prospectId, id);
  };
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
              Underwriter
            </TableHeadContent>
            <TableHeadContent style={{ width: "30%" }}>
              Contacts
            </TableHeadContent>
            <TableHeadContent style={{ width: "10%" }}>Status</TableHeadContent>
            <TableHeadContent style={{ width: "10%" }}>
              Modified
            </TableHeadContent>
            <TableHeadContent style={{ width: "10%" }}>
              Actions
            </TableHeadContent>
            {/* // ))} */}
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {(!Array.isArray(qouteRFPs) || qouteRFPs.length < 1) && (
            <EmptyTableRow colSpan={3}>No RFPs have been added.</EmptyTableRow>
          )}
          {Array.isArray(qouteRFPs) &&
            qouteRFPs.length > 0 &&
            qouteRFPs.map((item) => (
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
                      style={{ cursor: "pointer" }}
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
                      {item?.stop_loss_carrier?.name}
                    </DocumentName>
                  </DocumentNameItem>
                  {/* )} */}
                </TableBodyContent>
                <TableBodyContent>
                  {/* {moment(item.modified).format("MMMM DD, YYYY")} */}
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
                    <DownloadButton
                      iconName="trash-grey.png"
                      size={24}
                      onClick={() => handleDelete(item.id)}
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

export default RFPTable;
