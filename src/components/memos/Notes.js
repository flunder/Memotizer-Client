import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
import Color from 'color'
import { Note } from '.'
import { updateNoteOrder } from '../../reducers/memo.js'

const orderByOrderOfNotes = (notes, orderOfNotes) => {

    // For quicker handling i convert the array to an Object
    // by _id

    const notesWithIdAsKey = {};

    notes.forEach(note => {
        notesWithIdAsKey[note._id] = note;
    })

    // And create an array that is ordered by orderOfNotes

    return orderOfNotes.reduce((acc, _id) => {
        if (typeof notesWithIdAsKey[_id] !== 'undefined') acc.push(notesWithIdAsKey[_id]);
        return acc;
    }, [])

}

class Notes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notes: orderByOrderOfNotes(props.notes, props.orderOfNotes),
        }

        this.dragColor = Color(props.category.color).rotate(60);
        console.log(this.dragColor);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            notes: orderByOrderOfNotes(newProps.notes, newProps.orderOfNotes),
        })
    }

    // A little function to help us with reordering the result

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        this.props.updateOrder({
            memoID: this.props.memoID,
            noteOrder: result.map(note => note._id)
        })

        return result;
    };

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const notes = this.reorder(
            this.state.notes,
            result.source.index,
            result.destination.index
        );

        this.setState({
            notes
        });
    }

    getItemStyle = (isDragging, categoryColor) => (
        isDragging ? this.dragColor : categoryColor
    );

    render({category, memoID} = this.props) {

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="vertical">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                            {Object.keys(this.state.notes).map(index => {
                                const item = this.state.notes[index]

                                return (
                                    <Draggable key={item._id} draggableId={item._id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                <Note
                                                    key={item._id}
                                                    memoID={memoID}
                                                    noteID={item._id}
                                                    desc={item.desc}
                                                    color={
                                                        this.getItemStyle(
                                                            snapshot.isDragging,
                                                            category.color
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )

    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateOrder: ({memoID, noteOrder}) => {
            dispatch(updateNoteOrder(memoID, noteOrder))
        }
    }
}

Notes = connect(null, mapDispatchToProps)(Notes)

export { Notes }
