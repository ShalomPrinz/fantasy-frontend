import { useState } from "react";

import { toast } from "react-toastify";

import { ConditionalList } from "../";

import "./TabChoice.css";

interface Tab {
  id: number;
  disabled?: {
    condition: () => boolean;
    toast: string;
  };
  label: string;
  Component: JSX.Element;
}

interface TabChoiceProps {
  tabs: Tab[];
}

const TabChoice = ({ tabs }: TabChoiceProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const tabCallback = (tab: Tab) => {
    const { disabled, label } = tab;
    const handleClick = () => {
      if (disabled?.condition()) toast.warn(disabled.toast);
      else setActiveTab(tab);
    };

    return (
      <button
        className="fs-2 bg-default py-2 px-5 tab-choice"
        onClick={handleClick}
        type="button"
      >
        {label}
      </button>
    );
  };

  return (
    <>
      <div className="centered-flex py-4">
        <ConditionalList itemCallback={tabCallback} list={tabs} />
      </div>
      {activeTab?.Component}
    </>
  );
};

export default TabChoice;
