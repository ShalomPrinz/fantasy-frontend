import { useState } from 'react';

import ConditionalList from '../ConditionalList';

import "./TabChoice.css"

interface Tab {
    id: number,
    label: string,
    Component: JSX.Element,
    onClick?: Function
}

interface TabChoiceProps {
    tabs: Tab[],
}

const TabChoice = ({ tabs }: TabChoiceProps) => {

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const tabCallback = (tab: Tab) => {
        const { label, onClick } = tab
        const handleClick = () => {
            setActiveTab(tab);
            if (onClick)
                onClick();
        }

        return (
            <button 
                className="fs-2 bg-default py-2 px-5 tab-choice"
                onClick={handleClick}
                type="button"
            >
                {label}
            </button>
        )
    }
    
    return (
        <>
            <div className="centered-flex py-4">
                <ConditionalList 
                    itemCallback={tabCallback}
                    list={tabs}
                />
            </div>
            {activeTab?.Component}
        </>
    );
}

export default TabChoice;
