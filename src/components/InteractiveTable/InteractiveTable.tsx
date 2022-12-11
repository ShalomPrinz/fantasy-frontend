import TableBody, { TableBodyProps } from "./TableBody";
import TableHeader from "./TableHeader";

import "./InteractiveTable.css";

const Table = ({ columns, ...tableBodyProps }: TableBodyProps) => (
  <table className="table rounded bg-white table-hover fs-5 text-center">
    <TableHeader columns={columns} />
    <TableBody columns={columns} {...tableBodyProps} />
  </table>
);

export default Table;
