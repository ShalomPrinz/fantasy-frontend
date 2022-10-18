import { useCallback } from "react";

import _ from "lodash";

import ConditionalList from "./ConditionalList";

interface TableColumn {
  path: string,
  content?: Function
}

type TableDataProps = { [key: string]: string }

interface TableData {
  id: number,
  props: TableDataProps
}

export interface TableBodyProps {
  columns: Array<TableColumn>,
  data: Array<TableData>
}

const TableBody = ({ columns, data }: TableBodyProps) => {

  const columnCallback = useCallback((item: TableData, column: TableColumn) => (
    <td className="align-middle">
      {renderCell(item.props, column)}
    </td>
  ), []);

  const rowCallback = (item: TableData) => (
    <tr>
      <ConditionalList itemCallback={(column: TableColumn) => columnCallback(item, column)} list={columns} />
    </tr>
  );

  return (
    <tbody>
      <ConditionalList itemCallback={rowCallback} list={data} />
    </tbody>
  );
};

const renderCell = (props: TableDataProps, column: TableColumn) =>
  column.content ? column.content(props) : _.get(props, column.path);

export default TableBody;
