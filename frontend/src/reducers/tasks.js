import { createSlice } from '@reduxjs/toolkit'

const tasks = createSlice ({
  name: 'tasks',
  initialState: {
    items: []
  },
  reducers: {
    setTasks: (store, action) => {
      store.items = action.payload.tasks
    },
    setNewTask: (store, action) => {
      store.items = [...store.items, action.payload]
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default tasks