import TableBody, { TableBodyProps } from "./TableBody";

interface TableProps extends TableBodyProps {
  className?: string;
  scrollable?: Boolean;
}

const Table = ({ className, columns, data, scrollable }: TableProps) => (
  <>
    {data.length !== 0 && (
      <div
        className={`table-responsive mt-0${
          scrollable ? " border-bottom scrollable" : ""
        }`}
      >
        <table className={`table rounded${className ? " " + className : ""}`}>
          <TableBody data={data} columns={columns} />
        </table>
      </div>
    )}
  </>
);

export default Table;
