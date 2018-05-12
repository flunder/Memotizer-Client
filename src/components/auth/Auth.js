import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import queryString from 'query-string'
import { SignIn, SignUp, Reset } from '.'

class Auth extends Component {

    render() {
        // if (this.props.authenticated) return null;

        const authPage = this.props.location.pathname.replace('/','');

        return (
            <section className="auth" data-active={authPage}>
                <div className="wrapper">
                    <nav className="auth-nav">
                        <Link to="/signin" data-show-page="signin">SIGN IN</Link>
                        <Link to="/signup" data-show-page="signup">SIGN UP</Link>
                        <Link to="/reset" data-show-page="reset">RESET</Link>
                    </nav>
                    <div className="authPages">
                        {authPage === 'signin' && <SignIn location={this.props.location} />}
                        {authPage === 'signup' && <SignUp location={this.props.location} />}
                        {authPage === 'reset' && <Reset location={this.props.location} />}
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

Auth = connect(mapStateToProps, null)(Auth);

export { Auth }
