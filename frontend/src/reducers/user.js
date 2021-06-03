import { createSlice } from '@reduxjs/toolkit'

const user = createSlice ({
  name: 'user',
  initialState: {
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
  },
  reducers: {
    // setUsername: (store, action) => {
    //   store.username = action.payload
    // },
    // setAccessToken: (store, action) => {
    //   store.accessToken = action.payload
    //   localStorage.setItem('accessToken', store.accessToken)
    // },
    // setErrors: (store, action) => {
    //   store.errors = action.payload
    // },
    // setSignOut: (store, action) => {
    //   store.username = null
    //   store.accessToken = null
    //   store.errors = null
    //   localStorage.removeItem('accessToken')
    // }
  }
})

export default user