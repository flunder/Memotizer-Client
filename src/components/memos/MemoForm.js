import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMemo } from '../../reducers/memo'

class MemoForm extends Component {

    state = {
        title: '',
        url: '',
        category: false
    }

    componentWillMount(){
        if (this.props.selectedCategory) {
            this.setState({
                category: this.props.selectedCategory
            })
        }
    }

    componentWillReceiveProps(newProps) {

        // Inherit Memo Category from Main Filter

        if (newProps.selectedCategory) {
            this.setState({
                category: newProps.selectedCategory
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createMemo({...this.state});
        this.clearState();
    }

    clearState = () => {
        this.setState({ title: '', url: '', category: false })
    }

    render() {
        const { category } = this.state;

        return (
            <section className="create-memo">

                <form className="memo" onSubmit={this.handleSubmit}>

                    <header>

                        <input
                            type="text"
                            value={this.state.title}
                            onChange={(e) => this.setState({ title: e.currentTarget.value })}
                            placeholder="Title"
                            className="create-memo-title h2"
                            required
                        />

                        <input
                            type="text"
                            value={this.state.url}
                            onChange={(e) => this.setState({ url: e.currentTarget.value })}
                            placeholder="Url"
                            className="create-memo-url h3 memo-url"
                            required
                        />

                        <input
                            type="submit"
                            className="button button--primary create-memo-button"
                        />

                    </header>

                </form>

            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedCategory: state.memo.categoryFilter
    }
}

MemoForm = connect(mapStateToProps, { createMemo })(MemoForm)

export { MemoForm }
