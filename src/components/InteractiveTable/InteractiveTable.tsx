import TableBody, { TableBodyProps } from "./TableBody";
import TableHeader from "./TableHeader";

import "./InteractiveTable.css";

const Table = ({ columns, data, onRowClick }: TableBodyProps) => (
  <table className="table rounded bg-white table-hover">
    <TableHeader columns={columns} />
    <TableBody data={data} columns={columns} onRowClick={onRowClick} />
  </table>
);

export default Table;
