import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const UserDropdown = () => (
    <div className="dropdown dropdown--user dropdown--fade-scale-top sharewrap isVisible">
        <div>
            <Link to="/signout">Sign Out</Link>
        </div>
    </div>
)

class SettingsDropdown extends Component {

    constructor(props){
        super(props)

        this.state = {
            isVisible: false,
        }
    }

    toggleDropdown = () => {
        this.setState(state => {
            return {
                isVisible: !state.isVisible
            }
        })
    }

    render() {
        return (
            <div className="userDropdown _r noSelect">
                <div className="avatar" onClick={this.toggleDropdown}>
                    ME
                </div>
                {this.state.isVisible &&
                    <UserDropdown />
                }
            </div>
        )
    }
}

export { SettingsDropdown }
