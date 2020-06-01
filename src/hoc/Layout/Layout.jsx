import React, { useState } from 'react'
import myCSS from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'

const Layout = (props) => {
    const [menu, setMenu] = useState(false)

    const handleToggle = () => {
        setMenu(!menu)
    }
    return (
        <div className={myCSS.Layout}>
            <MenuToggle isOpen={menu} onToggle={handleToggle}/>
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Layout