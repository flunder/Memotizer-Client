import {
    apiCreateMemo,
    apiUpdateMemo, apiCreateNote, apiUpdateNote, apiDeleteNote,
    apiDeleteMemo,
    apiFetchMemos,
    apiFetchCategories,
    apiCreateCategory,
    apiDeleteCategory
} from '../lib/memoServices'

const initialState = {
    memos: {},
    categories: {},
    categoryFilter: false,
    confirmDialogID: false, // Track open 'alerts'
    editingDialogID: false, // Track edit/create forms
}

// ACTION-NAMES

const MEMOS_LOAD = 'MEMOS_LOAD'
const MEMO_ADD = 'MEMO_ADD'
const MEMO_REMOVE = 'MEMO_DELETE'
const MEMO_APPLYFILTER = 'MEMO_APPLYFILTER'
const MEMO_UPDATE = 'MEMO_UPDATE'

const CATEGORIES_LOAD = 'CATEGORIES_LOAD'

const CONFIRM_DIALOG_SHOW = 'CONFIRM_DIALOG_SHOW'
const EDIT_MEMO_DIALOG_SHOW = 'EDIT_MEMO_SHOW'

// ACTION CREATORS

const loadMemos = (memos) => (
    { type: MEMOS_LOAD, payload: memos }
)

const addMemo = (memo) => (
    { type: MEMO_ADD, payload: memo }
)

const removeMemo = (id) => (
    { type: MEMO_REMOVE, payload: { id } }
)

const updateMemo = (memoID, memo) => (
    { type: MEMO_UPDATE, payload: { memoID, memo } }
)

export const applyFilter = (val) => (
    { type: MEMO_APPLYFILTER, payload: { val } }
)

export const loadCategories = (categories) => (
    { type: CATEGORIES_LOAD, payload: { categories } }
)

export const showConfirmDialog = (id) => (
    { type: CONFIRM_DIALOG_SHOW, payload: { id } }
)

export const showEditMemoDialog = (id) => (
    { type: EDIT_MEMO_DIALOG_SHOW, payload: { id } }
)

// ASYNC ACTION CREATORS

export const fetchMemos = () => {
    return (dispatch, getState) => {
        const categoryFilter = getState().memo.categoryFilter;
        apiFetchMemos(categoryFilter)
            .then(memos => {
                let memosForState = {}
                memos.forEach(memo => {
                    memosForState[memo._id] = memo
                })
                dispatch(loadMemos(memosForState))
            })
    }
}

export const createMemo = ({title, url, category}) => {
    return (dispatch) => {
        const newMemo = { title, url, category, notes: {} }
        apiCreateMemo(newMemo)
            .then(res => dispatch(addMemo(res)))
    }
}

export const deleteMemo = (id) => {
    return (dispatch) => {
        apiDeleteMemo(id)
            .then(dispatch(removeMemo(id)))
    }
}

export const fetchCategories = () => {
    return (dispatch) => {
        apiFetchCategories()
            .then(categories => {
                const categoriesForState = {};
                categories.forEach(c => categoriesForState[c._id] = c)

                dispatch(loadCategories(categoriesForState))
            })
    }
}

export const createCategory = (category) => {
    return (dispatch, getState) => {
        const categories = getState().memo.categories;
        apiCreateCategory(category)
            .then(res => {
                console.log(res);
                const categoriesForState = { ...categories, [res._id]: { ...res } };
                dispatch(loadCategories(categoriesForState))
            })
    }
}

export const deleteCategory = (id) => {
    return (dispatch, getState) => {
        let categories = getState().memo.categories;
        apiDeleteCategory(id)
            .then(res => {
                delete categories[id];
                dispatch(loadCategories({...categories}))
            })
    }
}

export const addNote = ({memoID, noteValue}) => {
    return (dispatch, getState) => {

        // The new note, there might be more fields added here
        // lateron

        const note = {
            desc: noteValue
        }

        apiCreateNote(memoID, note)
            .then(res => {

                // Construct the new updated memo with the
                // data we received back from the api

                const memo = getState().memo.memos[memoID];

                const updatedMemo = {
                    ...memo,
                    notes: [
                        ...memo.notes, {
                            _id: res._id,
                            desc: res.desc,
                            memo: res.memo
                        }
                    ]
                }

                dispatch(updateMemo(memoID, updatedMemo))
            })
    }
}


export const updateNote = ({memoID, noteID, noteValue}) => {

    // no need for memoID here anymore

    return (dispatch, getState) => {

        const note = {
            desc: noteValue
        }

        apiUpdateNote(noteID, note)
            .then(res => {

                const memo = getState().memo.memos[memoID];

                // Loop through the Memo's notes and
                // apply the change when

                const notes = memo.notes.reduce((acc, note) => {
                    if (note._id === noteID) {
                        acc.push( { _id: note._id, desc: noteValue } )
                    } else {
                        acc.push(note)
                    }

                    return acc;
                }, [])

                const updatedMemo = { ...memo, notes }

                dispatch(updateMemo(memoID, updatedMemo))

            })
    }

}

export const deleteNote = ({memoID, noteID}) => {
    return (dispatch, getState) => {
        console.log(memoID, noteID);

        apiDeleteNote(noteID)
            .then(res => {
                const memo = getState().memo.memos[memoID];
                const notes = memo.notes.filter(note => note._id !== noteID);
                const updatedMemo = { ...memo, notes: notes }

                dispatch(updateMemo(memoID, updatedMemo))
            })
    }
}

// REDUCER

export default (state = initialState, action) => {

    switch (action.type) {

        case MEMOS_LOAD:
            return { ...state, memos: action.payload }

        case MEMO_ADD:
            return { ...state, memos: { ...state.memos, [action.payload._id]: action.payload } }

        case MEMO_REMOVE:
            return {
                ...state,
                memos: {
                    ...Object.keys(state.memos).reduce((acc, i) => {
                        if (state.memos[i]._id !== action.payload.id) {
                            acc[i] = state.memos[i]
                        }
                        return acc;
                    }, [])
                }
            }

        case MEMO_APPLYFILTER:
            return { ...state, categoryFilter: action.payload.val }

        case MEMO_UPDATE:
            return { ...state, memos: { ...state.memos, [action.payload.memoID]: action.payload.memo } }

        case CATEGORIES_LOAD:
            return { ...state, categories: action.payload.categories }

        case CONFIRM_DIALOG_SHOW:
            return { ...state, confirmDialogID: action.payload.id }

        case EDIT_MEMO_DIALOG_SHOW: {
            return { ...state, editingDialogID: action.payload.id }
        }

        default:
            return state

    }

}
