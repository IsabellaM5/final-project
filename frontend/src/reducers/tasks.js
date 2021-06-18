import { createSlice } from '@reduxjs/toolkit'

const tasks = createSlice ({
  name: 'tasks',
  initialState: {
    items: [],
    editMode: false
  },
  reducers: {
    setTasks: (store, action) => {
      store.items = action.payload.tasks
    },
    setNewTask: (store, action) => {
      store.items = [...store.items, action.payload]
    },
    editTask: (store, action) => {
      const findItem = store.items.find(item => item._id === action.payload.updatedTask._id)

      const updatedItem = store.items.map((item) => {
        if (item._id === findItem._id) {
          return {
            ...item,
            title: action.payload.updatedTask.title,
            description: action.payload.updatedTask.description
          }
        } else {
          return item
        }
      })
      store.items = updatedItem
    },
    addComment: (store, action) => {
      const findItem = store.items.find(item => item._id === action.payload.updatedTask._id)

      const updatedItem = store.items.map((item) => {
        if (item._id === findItem._id) {
          return {
            ...item,
            comments: action.payload.updatedTask.comments
          }
        } else {
          return item
        }
      })
      store.items = updatedItem
    },
    deleteTask: (store, action) => {
      const filterItems = store.items.filter(item => item._id !== action.payload.deletedTask._id)
      store.items = filterItems
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default tasks