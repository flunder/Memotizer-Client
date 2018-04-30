import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NoteForm, Notes } from '.'
import { ConfirmClick } from '../ui'
import { deleteMemo, fetchCategories } from '../../reducers/memo'

class Memo extends Component {

    constructor(props){
        super(props);

        this.state = {
            categories: false
        }
    }

    handleDeleteMemo = (e) => {
        if (e) e.preventDefault();
        this.props.deleteMemo(this.props._id)
    }

    componentWillMount(){
        // Load Categories if not already loaded
        if (Object.keys(this.props.categories).length === 0) {
            this.props.fetchCategories();
        }
    }

    render() {
        const { _id, title, color, categories, url, notes = [], orderOfNotes } = this.props;

        const categoryID = this.props.category;
        const category = (typeof categories[categoryID] !== 'undefined') ? categories[categoryID] : false

        const totalNotes = Object.keys(notes).length;

        return (
            <div className="memo">

                <header className="_r">
                    <h2>{title}</h2>
                    <h3 className="memo-url">{url}</h3>

                    <ConfirmClick
                        className="delete-button-wrap"
                        id={`deleteMemo-${_id}`}
                        onClick={this.handleDeleteMemo}>

                        <button className="delete-button">+</button>

                    </ConfirmClick>
                </header>

                <main>

                    <Notes
                        category={category}
                        notes={notes}
                        memoID={_id}
                        orderOfNotes={orderOfNotes}
                    />

                    <NoteForm
                        memoID={_id}
                        id={`createNote-${_id}-${totalNotes}`}
                        totalNotes={totalNotes}
                    />
                </main>

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    categories: state.memo.categories
})

Memo = connect(mapStateToProps, {deleteMemo, fetchCategories})(Memo)

export { Memo }
