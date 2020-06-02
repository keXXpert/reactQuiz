import React from 'react'
import myCSS from './Drawer.module.css'

const links = [ 1, 2, 3 ]

const Drawer = ({isOpen}) => {
    const cls = [myCSS.Drawer]

    if (!isOpen) cls.push(myCSS.close)
    
    return (
        <nav className={cls.join(' ')}>
            <ul>
                {links.map( (link, index) => <li key={index}><a>Link {link}</a></li>)}
            </ul>

        </nav>
    )
}

export default Drawer