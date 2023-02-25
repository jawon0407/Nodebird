import React , { useState, useCallback } from 'react';

export default (initialValue = null) => {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback((e) => {
        setValue(e.target.value);
        console.log(setValue);
    }, [value]);
    return [ value, handler , setValue ];
};