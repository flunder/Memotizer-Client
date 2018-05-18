import React, { Component } from 'react'

class AuthFooter extends Component {

    constructor(props){
        super(props);

        this.footers = [
            <div>Proudly made by <a href="http://www.larsattacks.co.uk">LA</a></div>,
            <div>Thanks for visiting Memotizer!</div>,
            <div>Take care of your time!</div>,
        ]
    }

    randomNumberBetween = (min, max) => {
        return Math.floor(Math.random() * max) + min;
    }

    render() {
        let x = this.randomNumberBetween(0, this.footers.length);

        return (
            <div className="auth-footer" key={this.props.location.pathname}>
                {this.footers[x]}
            </div>
        )
    }
}

export { AuthFooter }
