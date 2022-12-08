import TableBody, { TableBodyProps } from "./TableBody";
import TableHeader from "./TableHeader";

interface TableProps extends TableBodyProps {
  showTableHeader?: boolean;
}

const Table = ({ columns, data, showTableHeader }: TableProps) => (
  <table className="table rounded bg-white">
    {showTableHeader && <TableHeader columns={columns} />}
    <TableBody data={data} columns={columns} />
  </table>
);

export default Table;
