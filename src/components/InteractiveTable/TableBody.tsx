import { get } from "lodash";

import { ConditionalList } from "../";
import type { TableColumn } from "./types";

interface TableData {
  [key: string]: any;
}

export interface TableBodyProps {
  columns: TableColumn[];
  data: TableData[];
  onRowClick: (item: TableData) => void;
}

const TableBody = ({ columns, data, onRowClick }: TableBodyProps) => {
  const columnCallback = (item: TableData, column: TableColumn) => (
    <td className="align-middle">{renderCell(item, column)}</td>
  );

  const rowCallback = (item: TableData) => (
    <tr className="clickable" onClick={() => onRowClick(item)}>
      <ConditionalList
        itemCallback={(column: TableColumn) => columnCallback(item, column)}
        list={columns}
      />
    </tr>
  );

  return (
    <tbody>
      <ConditionalList itemCallback={rowCallback} list={data} />
    </tbody>
  );
};

const renderCell = (item: TableData, column: TableColumn) =>
  column.content ? column.content(item) : get(item, column.path!);

export default TableBody;
