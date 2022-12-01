import TableBody, { TableBodyProps } from "./TableBody";

const Table = ({ columns, data }: TableBodyProps) => (
  <table className="table rounded bg-white">
    <TableBody data={data} columns={columns} />
  </table>
);

export default Table;
