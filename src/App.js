import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Feature, Welcome } from './components/pages'
import { Auth, SignIn, SignUp, SignOut } from './components/auth'

import { PrivateRoute } from './components/auth/require_auth'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {

    shouldComponentUpdate(){
        return false;
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Route path="/signin" component={Auth} />
                        <Route path="/signup" component={Auth} />
                        <Route path="/reset" component={Auth} />
                        <Route path="/signout" component={SignOut} />

                        <PrivateRoute path="/" exact={true} component={Feature}/>
                        <PrivateRoute path="/feature" component={Feature}/>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App
