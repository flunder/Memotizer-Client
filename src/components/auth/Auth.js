import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SignIn, SignUp, Reset } from '.'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class Auth extends Component {

    constructor(props){
        super(props);

        this.state = {
            mounted: false
        }

    }

    componentDidMount() {
        this.setState({
            mounted: true
        })
    }

    render() {

        console.log(this.state);
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

                        {/* This css transition really isn't happy atall */}

                        <TransitionGroup>
                            <CSSTransition
                                in={this.state.mounted}
                                key={authPage}
                                timeout={1000}
                                classNames='auth'
                                unmountOnExit
                                onExited={() => {
                                      this.setState({
                                          mounted: false,
                                      });
                                }}
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
