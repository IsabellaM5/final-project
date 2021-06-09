import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user') ? 
  {
    info: {
      userID: JSON.parse(localStorage.getItem('user')).userID,
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
      userID: null,
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
    setUserID: (store, action) => {
      store.info.userID = action.payload
    },
    setUsername: (store, action) => {
      store.info.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.info.accessToken = action.payload
    },
    setRole: (store, action) => {
      store.info.role = action.payload
    },
    setName: (store, action) => {
      store.info.name = action.payload
    },
    setBio: (store, action) => {
      store.info.bio = action.payload
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