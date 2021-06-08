import { createSlice } from '@reduxjs/toolkit'

const projects = createSlice ({
  name: 'projects',
  initialState: {
    items: [],
    users: [],
    errors: null,
    loading: false
  },
  reducers: {
    setProjects: (store, action) => {
      store.items = action.payload.projects
    },
    setUsers: (store, action) => {
      store.users = action.payload.usersArray
    },
    setNewProject: (store, action) => {
      store.items = [...store.items, action.payload]
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    } 
  }
})

export default projects