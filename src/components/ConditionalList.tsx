import { cloneElement } from "react";

interface ConditionalListProps {
  itemCallback: Function;
  list: any[];
}

const ConditionalList = ({ itemCallback, list }: ConditionalListProps) => (
  <>
    {list.map((item, index) => {
      if (!item.hasOwnProperty("id"))
        console.error("No unique id found for item", item);
      return cloneElement(itemCallback(item), { key: item.id || index });
    })}
  </>
);

export default ConditionalList;
