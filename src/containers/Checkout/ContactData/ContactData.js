import React, {Component} from 'react';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'express', displayValue: 'Express'},
                        {value: 'standart', displayValue: 'Standart'},
                        {value: 'priority', displayValue: 'Priority'},
                    ]
                },
                value: 'express',
                validation: {
                },
                valid: true
            },
        },
        formIsValid: false,
        loading: false,
    }

    orderHandler = (evt) => {
        evt.preventDefault();
        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        this.setState({loading: true});
        const order = { 
            ingredients: this.props.ingredients,
            price: this.props.price,
            order: formData
        }

        console.log(order);

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error =>{
                this.setState({loading: false});
            });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required && isValid) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
        }

        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChnagedHandler = (event, inputIdnetifier) => {
        const udpatedOrederForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...udpatedOrederForm[inputIdnetifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        udpatedOrederForm[inputIdnetifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputId in udpatedOrederForm) {
            formIsValid = udpatedOrederForm[inputId].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm: udpatedOrederForm, formIsValid: formIsValid})
    }

    render () {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChnagedHandler(event, formElement.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}> Order</Button>
            </form>    
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className='ContactData'>
                <h4>Enter your Contact Data</h4>
                {form}   
            </div>    
        )
    }
}

export default ContactData;