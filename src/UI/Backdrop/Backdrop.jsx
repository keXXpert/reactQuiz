import React from 'react'
import myCSS from './Backdrop.module.css'

const Backdrop = ({onClick}) => 
    <div className={myCSS.Backdrop} onClick={onClick}></div>
    
export default Backdrop