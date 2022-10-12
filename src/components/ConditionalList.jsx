import React from 'react';

const ConditionalList = ({ itemCallback, list }) => 
    <>
        {list && typeof list === 'object' && list.map(itemCallback)}
    </>

export default ConditionalList;