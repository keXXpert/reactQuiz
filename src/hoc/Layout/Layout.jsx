import React, { useState } from 'react'
import myCSS from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'

const Layout = (props) => {
    const [menu, setMenu] = useState(false)

    const handleToggle = () => {
        setMenu(!menu)
    }

    const onMenuClose = () => {
        setMenu(false)
    }

    return (
        <div className={myCSS.Layout}>
            <Drawer isOpen={menu} onMenuClose={onMenuClose}/>
            <MenuToggle isOpen={menu} onToggle={handleToggle}/>
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Layout