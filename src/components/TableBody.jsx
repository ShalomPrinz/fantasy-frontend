import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data && data.map((item) => (
        <tr key={item.id}>
          {columns && columns.map((column) => (
            <td className="align-middle" key={createKey(item, column)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const renderCell = (item, column) =>
  column.content ? column.content(item) : _.get(item, column.path);

const createKey = (item, column) => item.id + column.path;

export default TableBody;
