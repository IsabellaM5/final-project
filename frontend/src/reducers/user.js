import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user') ? 
  {
    info: {
      username: JSON.parse(localStorage.getItem('user')).username,
      email: null,
      accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
      role: null,
      name: null,
      bio: null,
      image: null,
    }, 
    errors: null,
    loading: false
  }
  : 
  {
    info: {
      username: null,
      email: null,
      accessToken: null,
      role: null,
      name: null,
      bio: null,
      image: null,
    }, 
    errors: null,
    loading: false
  }

const user = createSlice ({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (store, action) => {
      store.info.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.info.accessToken = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    setSignOut: (store, action) => {
      store.info.username = null
      store.info.accessToken = null
      store.errors = null
    }
  }
})

export default user