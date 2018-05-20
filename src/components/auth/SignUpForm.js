import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { renderTextField } from './form_helpers'
import { AuthFooter } from '.'

class SignUpForm extends Component {

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops: </strong>{this.props.errorMessage}
                </div>
            )
        }
    }

    shouldComponentUpdate(newProps) {
        if (this.props.errorMessage !== newProps.errorMessage) return true;     // Allow Error Message Changes
        return false;                                                           // Stop reender for each <Field />
    }

    render({ handleSubmit } = this.props) {

        return (
            <form onSubmit={handleSubmit} className="page page-signup">

                {this.renderAlert()}

                <Field
                    type="email"
                    name="signupEmail"
                    placeholder="Email address"
                    component={renderTextField}
                    autoComplete="off"
                />

                <Field
                    type="password"
                    name="signupPassword"
                    placeholder="Password"
                    component={renderTextField}
                    autoComplete="off"
                />

                <Field
                    type="password"
                    name="signupPasswordConfirmation"
                    placeholder="Password again"
                    component={renderTextField}
                    autoComplete="off"
                />

                <input
                    type="submit"
                    value="Sign Up"
                    className="button-auth"
                />

                <AuthFooter
                    location={this.props.location}
                />

            </form>
        )
    }
}

const validate = values => {
    const errors = {}
    if (values.signupPassword !== values.signupPasswordConfirmation) { errors.signupPassword = 'Passwords must match' }
    if (!values.signupEmail) { errors.signupEmail = 'Please enter an email' }
    if (!values.signupPassword) { errors.signupPassword = 'Please enter a password' }
    if (!values.signupPasswordConfirmation) { errors.signupPasswordConfirmation = 'Please confirm your password' }
    return errors
}

SignUpForm = reduxForm({
    form: 'signup',
    validate
})(SignUpForm)

export { SignUpForm }
