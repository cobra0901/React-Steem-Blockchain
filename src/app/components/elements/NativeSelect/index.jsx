import React from 'react';

const NativeSelect = (props) => {
    const { options, onChange, className } = props;
    const opts = options.map( val => <option value={val.value}>{val.label}</option>)
    return (
        <select onChange={onChange} className={`nativeSelect ${className}`} >
            {opts}
        </select>
    );
};

export default NativeSelect;
