import React, { Component } from 'react'

class AuthFooter extends Component {

    constructor(props){
        super(props);

        this.footers = [
            <div key="1">Proudly made by <a href="http://www.larsattacks.co.uk">LA</a></div>,
            <div key="2">Thanks for visiting Memotizer!</div>,
            <div key="3">Take care of your time!</div>,
        ]
    }

    shouldComponentUpdate(){
         // don't update this component whenever
         // the parent component re-renders
        return false;
    }

    randomNumberBetween = (min, max) => {
        return Math.floor(Math.random() * max) + min;
    }

    render() {
        return (
            <div className="auth-footer" key={this.props.location.pathname}>
                {this.footers[this.randomNumberBetween(0, this.footers.length)]}
            </div>
        )
    }
}

export { AuthFooter }
