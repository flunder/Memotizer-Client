import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

/* ============================================================================
    MEMOS
    - fetch
    - create
    - delete
============================================================================== */


export const apiFetchMemos = (categoryFilter) => {
    const categoryFilterBy = categoryFilter ? `&category=${categoryFilter}` : '';

    return axios.get(`${API_URL}/memos?_sort=id&_order=desc${categoryFilterBy}`, {
        headers: { authorization: localStorage.getItem('token') },
    }).then(res => res.data)
}

export const apiCreateMemo = (memo) => {
    return axios.post(`${API_URL}/memos`, memo, {
        headers: { authorization: localStorage.getItem('token') },
    }).then(res => res.data)
}

export const apiDeleteMemo = (id) => {
    return axios.delete(`${API_URL}/memos/${id}`, {
        headers: { authorization: localStorage.getItem('token') },
    }).then(res => res.data)
}

/* ============================================================================
    NOTES
    - create
    - update
    - delete
============================================================================== */


export const apiCreateNote = (memoID, note) => {
    return axios.post(`${API_URL}/memos/${memoID}/notes`, note, {
        headers: { authorization: localStorage.getItem('token') },
    }).then(res => res.data)
}

export const apiUpdateNote = (noteID, note) => {
    return axios.post(`${API_URL}/note/${noteID}`, note, {
        headers: { authorization: localStorage.getItem('token') },
    }).then(res => res.data)
}

export const apiDeleteNote = (noteID) => {
    return axios.delete(`${API_URL}/note/${noteID}`, {
        headers: { authorization: localStorage.getItem('token') },
    }).then(res => res.data)
}

/* ============================================================================
    CATEGORIES
    - fetch
    - create
    - delete
============================================================================== */

export const apiFetchCategories = () => {
    return axios.get(`${API_URL}/categories`, {
        headers: { authorization: localStorage.getItem('token') },
    }).then(res => res.data)
}

export const apiCreateCategory = (category) => {
    return axios.post(`${API_URL}/categories`, category, {
        headers: { authorization: localStorage.getItem('token') },
    }).then(res => res.data)
}

export const apiDeleteCategory = (id) => {
    return axios.delete(`${API_URL}/category/${id}`, {
        headers: { authorization: localStorage.getItem('token') },
    }).then(res => res.data)
}
