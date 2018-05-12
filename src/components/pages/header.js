import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {
        if (this.props.authenticated) return null;

        return (
            <section className="auth" data-active="signin">
                <div className="wrapper">
                    <nav className="auth-nav">
                        <Link to="/signin" data-show-page="signin">SIGN IN</Link>
                        <Link to="/signup" data-show-page="signup">SIGN UP</Link>
                        <Link to="/reset" data-show-page="reset">RESET</Link>
                    </nav>
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

Header = connect(mapStateToProps, null)(Header);

export { Header }
