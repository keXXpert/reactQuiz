import React, { useState } from 'react'
import myCSS from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { connect } from 'react-redux'

const Layout = ({isAuthed, children}) => {
    const [menu, setMenu] = useState(false)

    const handleToggle = () => {
        setMenu(!menu)
    }

    const onMenuClose = () => {
        setMenu(false)
    }

    return (
        <div className={myCSS.Layout}>
            <Drawer isOpen={menu} onMenuClose={onMenuClose} isAuthed={isAuthed}/>
            <MenuToggle isOpen={menu} onToggle={handleToggle}/>
            <main>
                {children}
            </main>
        </div>
    )
}

function mapStateToProps(state) {
    return { isAuthed: !!state.auth.token };
  }
export default connect(mapStateToProps)(Layout)