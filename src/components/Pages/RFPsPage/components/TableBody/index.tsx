import { TableBody, TableCell, TableRow } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { observer } from "mobx-react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import routes from "src/routes";
import { AddButton, IconSection, Avatarstyle } from "./style";

const Tablebody = ({ data, index }) => {
  const history = useHistory();
  const statusBackgrond = (status) => {
    if (data?.status === "draft") {
      return (
        <TableCell>
          <AddButton className="text-light text-center bg-warning">
            {status}{" "}
          </AddButton>
        </TableCell>
      );
    }
    if (data?.status === "closed") {
      return (
        <TableCell>
          <AddButton className="text-light text-center bg-danger">
            {status}{" "}
          </AddButton>
        </TableCell>
      );
    }
    if (data?.status === "active") {
      return (
        <TableCell>
          <AddButton className="text-light text-center bg-success">
            {status}{" "}
          </AddButton>
        </TableCell>
      );
    }
    return (
      <TableCell>
        <AddButton className="text-light text-center bg-info">
          {status}{" "}
        </AddButton>
      </TableCell>
    );

    return;
  };

  const stringAvatar = (name: string) => {
    // if (name !== undefined) {
    return {
      children: `${
        name && name.split(" ")[0] && name?.split(" ")[0][0]
          ? name?.split(" ")[0][0]
          : ""
      }${
        name && name.split(" ")[1] && name?.split(" ")[1][0]
          ? name?.split(" ")[1][0]
          : ""
      }`,
    };
    // }
  };

  return (
    <TableBody>
      <TableRow>
        <TableCell
          style={{ cursor: "pointer" }}
          onClick={() =>
            history.push(
              routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps.rfpList.getValue(
                data?.brokerage?.id,
                data.org.id
              )
            )
          }
        >
          {data?.org?.name}
        </TableCell>
        <TableCell>{data?.brokerage.name}</TableCell>
        <TableCell>
          {(data?.org?.effective_date &&
            moment(data?.org?.effective_date).format("MMM DD, YYYY")) ||
            ""}
        </TableCell>
        {statusBackgrond(data.status)}
        <TableCell>
          {(data.modified && moment(data.modified).format("MMM DD, YYYY")) ||
            ""}
        </TableCell>
        <TableCell>
          <Avatarstyle>
            {Array.isArray(data.rfps) &&
              data?.rfps?.map((item) => (
                <IconSection
                  onClick={() =>
                    history.push(
                      routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps.proposalRequestUpdate.getValue(
                        data.brokerage.id,
                        data.org.id,
                        data?.rfps[0]?.id
                      )
                    )
                  }
                  {...stringAvatar(item?.stop_loss_carrier?.name)}
                />
              ))}
          </Avatarstyle>
        </TableCell>
        <TableCell>
          <VisibilityIcon
            onClick={() =>
              history.push(
                routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps.rfpList.getValue(
                  data.brokerage.id,
                  data.org.id
                )
              )
            }
            style={{ cursor: "pointer" }}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default observer(Tablebody);
