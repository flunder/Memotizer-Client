import React from 'react'

const FilterSelect = ({handleChange, categories, selectedCategory}) => (
    <select onChange={handleChange} value={selectedCategory}>
        <option value="">Unassigned</option>
        {Object.keys(categories).map(i => (
            <option
                key={categories[i]._id}
                value={categories[i]._id}>
                {categories[i].name}
            </option>
        ))}
    </select>
)


export { FilterSelect };
