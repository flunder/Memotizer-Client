import React from 'react'

export const renderTextField = ({input, type, label, meta: {touched, error}, ...custom}) => (
    <input
        type={type}
        {...input}
        {...custom}
    />
    // {touched && error && <span className="error">{error}</span>}
)
