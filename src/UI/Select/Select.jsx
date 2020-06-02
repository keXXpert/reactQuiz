import React from 'react'
import myCSS from './Select.module.css'

const Select = ({label, value, onChange, options}) => {
    const id = label + '-' + Math.random()
    
    return (
        <div className={myCSS.Select}>
            <label htmlFor={id}>{label}</label>
            <select id={id} value={value} onChange={onChange}>
                {options.map((option, index) => 
                    <option key={option.value+index} value={option.value}>{option.text}</option>
                )}
            </select>
        </div>
    )
}

export default Select