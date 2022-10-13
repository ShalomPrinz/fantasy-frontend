import React, { useCallback } from "react";

import _ from "lodash";

import ConditionalList from "./ConditionalList";

const TableBody = ({ data, columns }) => {

  const columnCallback = useCallback((item, column) => (
    <td className="align-middle">
      {renderCell(item, column)}
    </td>
  ), []);

  const rowCallback = (item) => (
    <tr>
      <ConditionalList itemCallback={(column) => columnCallback(item, column)} list={columns} />
    </tr>
  );

  return (
    <tbody>
      <ConditionalList itemCallback={rowCallback} list={data} />
    </tbody>
  );
};

const renderCell = (item, column) =>
  column.content ? column.content(item) : _.get(item, column.path);

export default TableBody;
