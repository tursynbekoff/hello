import React from 'react';
import menuIcon from '../../../../assets/images/menu.png'; 
import './DrawerToggle.css';

const drawerToggle = (props) => {
    return(
        <div className='DrawerToggle' 
            onClick={props.menuToggle}>
            <div></div>
            <div></div>
            <div></div>        
        </div>
    )
}

export default drawerToggle;