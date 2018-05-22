import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { renderTextField } from './form_helpers'
import { AuthFooter } from '.'

class SignInForm extends Component {

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
            <form onSubmit={handleSubmit} className="page page-signin">

                {this.renderAlert()}

                <Field
                    type="email"
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

                <input
                    className="button-auth"
                    type="submit"
                    value="Sign In"
                />

                <AuthFooter
                    location={this.props.location}
                />

            </form>
        )
    }
}

SignInForm = reduxForm({ form: 'signin' })(SignInForm)

export { SignInForm }
