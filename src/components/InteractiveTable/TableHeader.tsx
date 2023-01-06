import { ConditionalList } from "../";
import type { TableColumn } from "./types";

const headerCallback = ({ label, labelComponent }: TableColumn) => (
  <th className="p-3">{labelComponent ? labelComponent : label}</th>
);

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
