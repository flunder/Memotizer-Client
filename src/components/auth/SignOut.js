import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../actions'

class SignOut extends Component {

    componentWillMount() {
        this.props.signoutUser()
    }

    render() {
        return <Redirect to={{ pathname: 'signin' }}/>
    }
}

SignOut = connect(null, actions)(SignOut)

export { SignOut }
