import { TabChoice } from "../../../components";
import { useWindowWidth } from "../../../hooks";
import { FIELD_LAYOUT_MIN_WIDTH } from "../constants";

import { TeamLayout, TeamList } from "./";

function TeamTabChoice() {
  const width = useWindowWidth();
  const isSmallLayout = () => width < FIELD_LAYOUT_MIN_WIDTH;

  const tabs = [
    {
      id: 0,
      disabled: {
        condition: isSmallLayout,
        toast: "Your screen is too small",
      },
      label: "Field",
      Component: <TeamLayout />,
    },
    {
      id: 1,
      label: "List",
      Component: <TeamList />,
    },
  ];

  return <TabChoice tabs={tabs} />;
}

export default TeamTabChoice;
