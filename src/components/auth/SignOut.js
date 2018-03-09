import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Link } from 'react-router-dom'

class SignOut extends Component {

    componentWillMount() {
        this.props.signoutUser()
    }

    render() {
        return (
            <div>
                <div>Bye Bye</div>
                <Link to="/signin">Sign In</Link>
            </div>
        )
    }
}

SignOut = connect(null, actions)(SignOut)

export { SignOut }
