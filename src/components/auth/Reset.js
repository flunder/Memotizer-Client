import React, { Component } from 'react'
import { ResetForm } from '.'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { apiRequestResetPassword } from '../../actions/index.js'

class Reset extends Component {

    componentWillUnmount() {
        if (this.props.errorMessage) {
            this.props.authError(null)
        }
    }

    handleSubmit({ email }) {
        this.props.apiRequestResetPassword(email);
    }

    render() {
        return (
            <ResetForm
                onSubmit={this.handleSubmit.bind(this)}
                errorMessage={this.props.errorMessage}
                location={this.props.location}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        errorMessage: state.auth.error
    }
}

Reset = connect(mapStateToProps, actions)(Reset)

export { Reset }
