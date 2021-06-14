import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user') ?
  {
    info: {
      userID: JSON.parse(localStorage.getItem('user')).userID,
      username: JSON.parse(localStorage.getItem('user')).username,
      email: '',
      accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
      role: JSON.parse(localStorage.getItem('user')).role,
      name: JSON.parse(localStorage.getItem('user')).name,
      bio: JSON.parse(localStorage.getItem('user')).bio,
      image: '',
    }, 
    errors: null,
    loading: false
  }
  :
  {
    info: {
      userID: '',
      username: '',
      email: '',
      accessToken: '',
      role: '',
      name: '',
      bio: '',
      image: '',
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
    setEmail: (store, action) => {
      store.info.email = action.payload
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
    editUser: (store, action) => {
      store.info.email = action.payload.email
      store.info.name = action.payload.name
      store.info.role = action.payload.role
      store.info.bio = action.payload.bio
      store.info.image = action.payload.image
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    setSignOut: (store, action) => {
      store.info.username = null
      store.info.accessToken = null
      store.errors = null
      store.info.email = null
      store.info.name = null
      store.info.role = null
      store.info.bio = null
      store.info.image = null
    }
  }
})

export default user