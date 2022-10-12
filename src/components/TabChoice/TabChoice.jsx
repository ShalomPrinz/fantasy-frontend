import React, { useCallback, useState } from 'react';

import ConditionalList from '../ConditionalList';

import "./TabChoice.css"

const TabChoice = ({ tabs, defaultTab }) => {

    const [view, setView] = useState(defaultTab?.Component);

    const tabCallback = useCallback(([name, {Component, OnClick}], index) => (
        <button 
            className="fs-2 bg-default py-2 px-5 tab-choice"
            key={index}
            onClick={() => {
                setView(Component);
                if (OnClick)
                    OnClick();
            }}
            type="button"
        >
            {name}
        </button>
    ), []);
    
    return (
        <>
            <div className="centered-flex py-4">
                <ConditionalList 
                    itemCallback={tabCallback}
                    list={Object.entries(tabs)}
                />
            </div>
            {view}
        </>
    );
}

export default TabChoice;
