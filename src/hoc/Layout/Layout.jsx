import React, { useState } from 'react'
import myCSS from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'

const Layout = (props) => {
    const [menu, setMenu] = useState(false)

    const handleToggle = () => {
        setMenu(!menu)
    }
    return (
        <div className={myCSS.Layout}>
            <Drawer isOpen={menu} />
            <MenuToggle isOpen={menu} onToggle={handleToggle}/>
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Layout