import React, { Component } from 'react'
import { Filter, MemoList, MemoForm } from '../memos'
import { SettingsDropdown } from '../ui'

const Feature = () => (
    <div>
        <header className="mainHead _r">
            <Filter />
            <SettingsDropdown />
        </header>
        <MemoForm />
        <MemoList  />
    </div>
)

export { Feature }
