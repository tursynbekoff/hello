import React, {Component} from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxilary'
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
            return nextProps.show !== this.props.show || nextProps.children !== this.props.childern;
    }

    componentWillUpdate () {
        
    }

    render() {
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className='Modal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'trnaslateY(-100vh)',
                        display: this.props.show ? 'block': 'none'
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        )
    }
};

export default Modal;