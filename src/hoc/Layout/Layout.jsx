import React from 'react'
import myCSS from './Layout.module.css'

const Layout = (props) => {
    return (
        <div className={myCSS.Layout}>
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Layout