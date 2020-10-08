import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'; 
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => {
    return(
    <header className='Toolbar'>

        <DrawerToggle 
            menuToggle={props.menuToggle}/>
        <div className='ToolbarLogo'>    
            <Logo />
        </div>    
        <nav className='DesktopOnly'>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>   
    </header>
    );
}

export default toolbar;