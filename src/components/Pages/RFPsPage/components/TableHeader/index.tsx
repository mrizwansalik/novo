import { TableCell, TableHead, TableRow } from "@material-ui/core";
import { observer } from "mobx-react";

const TableHeader = () => {
  return (
    <TableHead style={{ backgroundColor: "#E1E9EC" }}>
      <TableRow>
        <TableCell>Company</TableCell>
        <TableCell>Broker</TableCell>
        <TableCell>Effective Date</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Last Modified</TableCell>
        <TableCell>Shared With</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default observer(TableHeader);
