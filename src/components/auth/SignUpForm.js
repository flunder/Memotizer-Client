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

    render() {
        const {handleSubmit} = this.props

        return (
            <form onSubmit={handleSubmit} className="page page-signup">

                {this.renderAlert()}

                <Field
                    type="text"
                    name="email"
                    placeholder="Email address"
                    component={renderTextField}
                />

                <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    component={renderTextField}
                />

                <Field
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Password again"
                    component={renderTextField}
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

    if (values.password !== values.passwordConfirmation) {
        errors.password = 'Passwords must match'
    }

    if (!values.email) {
        errors.email = 'Please enter an email'
    }

    if (!values.password) {
        errors.password = 'Please enter a password'
    }

    if (!values.passwordConfirmation) {
        errors.passwordConfirmation = 'Please confirm your password'
    }

    return errors
}

SignUpForm = reduxForm({ form: 'signup', validate })(SignUpForm)

export { SignUpForm }
