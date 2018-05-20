import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AuthFooter } from '.'
import * as actions from '../../actions'

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        // Get from somewhere ( url ) ?
        this.userEmail = "larsf2005@gmail.com";

        this.state = {
            pw: ''
        }
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return <div className="alert alert-danger">
                <strong>Oops: </strong>{this.props.errorMessage}
            </div>
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.resetPassword({
            email: this.userEmail,
            password: this.state.pw
        })
    }

    render() {
        return (
            <section className="auth" data-active='resetPassword'>

                <div className="wrapper">
                    <nav className="auth-nav noSelect">
                        <Link to="/resetPassword" className="resetPassword">Reset Password</Link>
                        <div className="customText">
                            for {this.userEmail} ( hideme )
                        </div>
                    </nav>

                    <div className="authPages">

                        <form onSubmit={this.handleSubmit} className="page page-resetPassword">

                            {this.renderAlert()}

                            <input
                                type="text"
                                placeholder="Enter new Password"
                                value={this.state.pw}
                                onChange={(e) => {
                                    this.setState({
                                        pw: e.currentTarget.value
                                    })
                                }}
                            />

                            <input
                                className="button-auth"
                                type="submit"
                                value="Reset Password"
                            />

                            <AuthFooter
                                location={this.props.location}
                            />

                        </form>

                    </div>
                </div>

            </section>
        )
    }
}

ResetPassword = connect(null, actions)(ResetPassword)

export { ResetPassword }
