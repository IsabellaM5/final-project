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
      store.items = action.payload.altProjects
    },
    setUsers: (store, action) => {
      store.users = action.payload.usersArray
    },
    setNewProject: (store, action) => {
      store.items = [...store.items, action.payload]
    },
    editProject: (store, action) => {
      const findItem = store.items.find(item => item._id === action.payload._id)

      const updatedItem = store.items.map((item) => {
        if (item._id === findItem._id) {
          return {
            title: action.payload.name,
            description: action.payload.description,
            comments: action.payload.comments
          }
        } else {
          return item
        }
      })
      store.items = updatedItem
    },
    deleteProject: (store, action) => {
      const filterItems = store.items.filter(item => item._id !== action.payload.deletedProject._id)
      store.items = filterItems
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    } 
  }
})

export default projects