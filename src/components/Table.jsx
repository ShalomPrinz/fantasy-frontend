import React from "react";
import TableBody from "./TableBody";

const Table = ({ columns, data, scrollable, style }) => (
  <>
    {data.length !== 0 && (
      <div
        className={`table-responsive mt-0 ${
          scrollable && "border-bottom scrollable"
        }`}
      >
        <table className={`table rounded ${style}`}>
          <TableBody data={data} columns={columns} />
        </table>
      </div>
    )}
  </>
);

export default Table;
