import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxilary'
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return(
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className='Modal'
                style={{
                    transform: props.show ? 'translateY(0)' : 'trnaslateY(-100vh)',
                    display: props.show ? 'block': 'none'
                }}
            >
                {props.children}
            </div>
        </Aux>
    )
};

export default modal;