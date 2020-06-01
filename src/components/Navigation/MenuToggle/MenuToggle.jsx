import React from 'react'
import myCSS from './MenuToggle.module.css'

const MenuToggle = ({onToggle, isOpen}) => {
    const cls =[
        myCSS.MenuToggle,
        'fa',
        isOpen ? 'fa-times' : 'fa-bars',
        isOpen && myCSS.open
    ]
    return (
        <i className={cls.join(' ')} onClick={onToggle}/>
    )
}

export default MenuToggle