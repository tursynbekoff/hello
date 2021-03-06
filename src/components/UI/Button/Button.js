import React from 'react';
import './Button.css';

const button = (props) => {
    const buttonClass = 'Button';
    return(
        <button
            disabled={props.disabled}
            className={[buttonClass,  props.btnType].join(' ')}
            onClick={props.clicked}>{props.children}</button>
    )
};

export default button;