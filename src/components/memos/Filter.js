import React, { Component } from 'react'
import { connect } from 'react-redux'
import { applyFilter, fetchCategories } from '../../reducers/memo'
import { FilterForm, FilterSelect } from '.'

class Filter extends Component {

    state = {
        showFilterForm: false
    }

    componentWillMount() {
        this.props.fetchCategories();
    }

    handleChange = (e) => {
        this.props.applyFilter(e.target.value);
    }

    toggleFiltersEditor = (e) => {
        e.preventDefault();
        this.setState(state => ({
            showFilterForm: !state.showFilterForm
        }))
    }

    render(){
        const { categories, categoryFilter } = this.props;

        return (
            <div>

                <div className="filterWrap">
                    <form className="filter">
                        <FilterSelect
                            handleChange={this.handleChange}
                            selectedCategory={categoryFilter}
                            categories={categories}
                        />
                    </form>
                    <a href="#" className="toggleFilters" onClick={this.toggleFiltersEditor}>
                        <img src="assets/svg/wrench.svg" />
                    </a>
                </div>

                {this.state.showFilterForm === true &&
                    <FilterForm />
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categoryFilter: state.memo.categoryFilter,
        categories: state.memo.categories
    }
}

Filter = connect(mapStateToProps, {applyFilter, fetchCategories})(Filter)

export { Filter };
