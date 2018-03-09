import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Feature, Header, Welcome } from './components/pages'
import { SignIn, SignUp, SignOut } from './components/auth'

import { PrivateRoute } from './components/auth/require_auth'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
    render() {
        return (
            <div className="App">

                <Router>
                    <MuiThemeProvider>
                        <div>
                            <Link to={'/feature'}>
                                {/* <img src="/assets/images/logo.png" className="logo" alt="Logo" /> */}
                            </Link>
                            <Header />
                            <PrivateRoute path="/" exact={true} component={Feature}/>
                            <Route path="/test" component={Welcome}/>
                            <Route path="/signin" component={SignIn}/>
                            <Route path="/signout" component={SignOut}/>
                            <Route path="/signup" component={SignUp}/>
                            <PrivateRoute path="/feature" component={Feature}/>
                        </div>
                    </MuiThemeProvider>
                </Router>
            </div>
        )
    }
}

export default App
