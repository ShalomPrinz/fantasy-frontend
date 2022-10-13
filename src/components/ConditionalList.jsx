import React, { cloneElement } from 'react';

const ConditionalList = ({ itemCallback, list }) =>
    <>
        {list && typeof list === 'object' && list.map(
            (item, index) => 
                cloneElement(itemCallback(item), { key: index })
        )}
    </>

export default ConditionalList;