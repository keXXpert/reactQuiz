import React from 'react'
import myCSS from './Input.module.css'

const isInvalid = ({valid, touched, shouldValidate}) => {
    return !valid && touched && shouldValidate

}

const Input = ({type, label, value, onChange, errorMessage, ...props}) => {
    const inputType = type || 'text'
    const cls = [ myCSS.Input ]
    const htmlFor = `${inputType}-${Math.random()}`

    if (isInvalid(props)) cls.push(myCSS.invalid)

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{label}</label>
            <input type={inputType} id={htmlFor} value={value} onChange={onChange}></input>
            {isInvalid(props) && <span>{errorMessage || 'Enter valid value'}</span>}
        </div>
    )
}

export default Input