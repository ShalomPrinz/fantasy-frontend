import { get } from "lodash";

import ConditionalList from "./ConditionalList";

interface TableDataColumn {
  id: number;
  path: string;
}

interface TableCallbackColumn {
  id: number;
  content: Function;
}

type TableColumn = TableDataColumn | TableCallbackColumn;

interface TableData {
  [key: string]: string | number;
}

export interface TableBodyProps {
  columns: TableColumn[];
  data: TableData[];
}

const TableBody = ({ columns, data }: TableBodyProps) => {
  const columnCallback = (item: TableData, column: TableColumn) => (
    <td className="align-middle">{renderCell(item, column)}</td>
  );

  const rowCallback = (item: TableData) => (
    <tr>
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
  "content" in column ? column.content(item) : get(item, column.path);

export default TableBody;
