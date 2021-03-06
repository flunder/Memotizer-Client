import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import { Feature, Welcome } from './components/pages'
import { Auth, SignOut, ResetPassword } from './components/auth'

import { PrivateRoute } from './components/auth/require_auth'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact={true} path="/signin" component={Auth} />
                    <Route exact={true} path="/signup" component={Auth} />
                    <Route exact={true} path="/reset" component={Auth} />
                    <Route exact={true} path="/signout" component={SignOut} />
                    <Route path="/resetPassword/:email/:token" component={ResetPassword} />

                    <PrivateRoute path="/" exact={true} component={Feature}/>
                    <PrivateRoute path="/feature" component={Feature}/>
                    <Route render={() => <div>404</div>} />
                </Switch>
            </div>
        )
    }
}

export default App
