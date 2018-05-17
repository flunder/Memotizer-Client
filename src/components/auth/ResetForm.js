import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { renderTextField } from './form_helpers'
import { AuthFooter } from '.'

class ResetForm extends Component {

    renderAlert() {
        if (this.props.errorMessage) {
            return <div className="alert alert-danger">
                <strong>Oops: </strong>{this.props.errorMessage}
            </div>
        }
    }

    render() {
        const { handleSubmit } = this.props

        return (

            <form onSubmit={handleSubmit} className="page page-reset">

                {this.renderAlert()}

                <Field
                    type="text"
                    name="email"
                    placeholder="Email address"
                    component={renderTextField}
                />

                <input
                    className="button-auth"
                    type="submit"
                    value="Resend Email"
                />

                <AuthFooter
                    location={this.props.location}
                />

            </form>

        )
    }
}

ResetForm = reduxForm({ form: 'signin' })(ResetForm)

export { ResetForm }
