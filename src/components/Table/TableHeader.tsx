import { ConditionalList } from "../";

import type { TableColumn } from "./";

const headerCallback = ({ path }: TableColumn) => <th>{path}</th>;

interface TableHeaderProps {
  columns: TableColumn[];
}

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        <ConditionalList itemCallback={headerCallback} list={columns} />
      </tr>
    </thead>
  );
};

export default TableHeader;
