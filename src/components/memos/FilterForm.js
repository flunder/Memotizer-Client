import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCategory, deleteCategory,fetchCategories } from '../../reducers/memo'
import { ConfirmClick } from '../ui/ConfirmClick'

class FilterForm extends Component {

    colors = [
        '#f7e9ff',
        '#e9f7ff',
        '#edefd9'
    ]

    state = {
        categoryName: '',
        selectedColorID: 0
    }

    componentDidMount() {
        this.props.fetchCategories();
    }

    handleCreateCategory = (e) => {
        e.preventDefault();

        this.props.createCategory({
            name: this.state.categoryName,
            color: this.colors[this.state.selectedColorID]
        })

        this.setState({ categoryName: '', color: '' })
    }

    handleDeleteCategory = (catID) => {
        this.props.deleteCategory(catID)
    }

    handleChangeColor = () => {
        this.setState((state) => {
            return {
                selectedColorID: state.selectedColorID + 1 >= this.colors.length ? 0 : state.selectedColorID + 1
            }
        })
    }

    render() {
        const { categories } = this.props;

        return (
            <div className="category-editor">
                <ul>
                    {Object.keys(categories).map(i => (
                        <li key={categories[i]._id}>

                            <ConfirmClick
                                className="delete-catagory-wrap"
                                id={`deleteCategory-${categories[i]._id}`}
                                onClick={() => this.handleDeleteCategory(categories[i]._id) }>

                                <button className="delete">+</button>

                            </ConfirmClick>

                            <div className="title">
                                {categories[i].name}
                            </div>

                            <a
                                className="color"
                                style={{ backgroundColor: categories[i].color }}
                            />
                        </li>
                    ))}
                    <li>
                        <form onSubmit={this.handleCreateCategory} className="create-category-form">

                            <input
                                className="create-category-name"
                                placeholder="Create a new category"
                                onChange={(e) => this.setState({ categoryName: e.currentTarget.value })}
                                value={this.state.categoryName}
                            />

                            <a
                                className="color"
                                style={{ backgroundColor: this.colors[this.state.selectedColorID] }}
                                onClick={this.handleChangeColor}
                            />

                            <input
                                type="submit"
                                className="button button--primary"
                                value="Create"
                            />

                        </form>
                    </li>

                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.memo.categories
    }
}

FilterForm = connect(mapStateToProps, {createCategory, deleteCategory, fetchCategories})(FilterForm);

export { FilterForm }
