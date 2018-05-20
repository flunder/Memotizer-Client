import React from 'react'

export const renderTextField = ({input, type, label, meta, ...custom}) => console.log(meta) || (
    <div className="authField">
        <input
            type={type}
            {...input}
            {...custom}
            autoCorrect="off"
            autoCapitalize="none"
        />
        {meta.touched && meta.error &&
            <span className="error">
                {meta.error}
            </span>
        }
    </div>
)
