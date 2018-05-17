import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SignIn, SignUp, Reset } from '.'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class Auth extends Component {

    render() {
        // if (this.props.authenticated) return null;

        const authPage = this.props.location.pathname.replace('/','');

        return (
            <section className="auth" data-active={authPage}>

                <div className="wrapper">
                    <nav className="auth-nav noSelect">
                        <Link to="/signin" className="signIn">SIGN IN</Link>
                        <Link to="/signup" className="signUp">SIGN UP</Link>
                        <Link to="/reset" className="reset">RESET</Link>
                    </nav>

                    <div className="authPages">
                        <TransitionGroup>
                            <CSSTransition
                                key={authPage}
                                timeout={850}
                                classNames='auth'
                                // unmountOnExit
                                >
                                <div>
                                    {authPage === 'signin' && <SignIn location={this.props.location} />}
                                    {authPage === 'signup' && <SignUp location={this.props.location} />}
                                    {authPage === 'reset' && <Reset location={this.props.location} />}
                                </div>
                            </CSSTransition>
                        </TransitionGroup>
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
