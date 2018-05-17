import React, { Component } from 'react'

class AuthFooter extends Component {

    constructor(props){
        super(props);

        this.footers = [
            <div>Proudly made by <a href="http://www.larsattacks.co.uk">LA</a></div>,
            <div>Thanks for visiting Memotizer!</div>,
            <div>Take care of your time!</div>,
        ]
        console.log('now');
    }

    randomNumberBetween = (min, max) => {
        return Math.floor(Math.random() * max) + min;
    }

    componentWillUpdate(x) {
        // console.log('updating', x);
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props.location.pathname, nextProps.location.pathname);
    }

    shouldComponentUpdate(props) {
        // console.log(this.props.location.pathname, props.location.pathname);
        return false;
    }

    render() {
        let x = this.randomNumberBetween(0, this.footers.length);
        // console.log(x);
        return (
            <div className="auth-footer" key={this.props.location.pathname}>
                {this.footers[x]}
            </div>
        )
    }
}

export { AuthFooter }
