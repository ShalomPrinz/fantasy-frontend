import React, { useState } from 'react';

import "./TabChoice.css"

const TabChoice = ({ tabs, defaultTab }) => {

    const [view, setView] = useState(defaultTab.Component);
    
    return (
        <>
            <div className="centered-flex py-4">
                {Object.entries(tabs).map(([name, props], index) => (
                    <button 
                        className="fs-2 bg-default py-2 px-5 tab-choice"
                        key={index}
                        onClick={() => {
                            setView(props.Component);
                            if (props.OnClick)
                                props.OnClick();
                        }}
                        type="button"
                    >
                        {name}
                    </button>
                ))} 
            </div>
            {view}
        </>
    );
}

export default TabChoice;
