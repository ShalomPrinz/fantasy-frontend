import { cloneElement } from "react";

interface ConditionalListProps {
  /** Warning: Use only when list is fixed */
  indexAsKey?: boolean;
  itemCallback: Function;
  list: any[];
}

const ConditionalList = ({
  indexAsKey,
  itemCallback,
  list,
}: ConditionalListProps) => (
  <>
    {list.map((item, index) => {
      if (!indexAsKey && !item.hasOwnProperty("id"))
        console.error("No unique id found for item", item);
      return cloneElement(itemCallback(item), { key: item.id || index });
    })}
  </>
);

export default ConditionalList;
