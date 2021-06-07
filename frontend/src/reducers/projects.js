import { createSlice } from '@reduxjs/toolkit'

const projects = createSlice ({
  name: 'projects',
  initialState: {
    items: [],
    errors: null,
    loading: false
  },
  reducers: {
    setProjects: (store, action) => {
      store.items = action.payload.projects
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    } 
  }
})

export default projects