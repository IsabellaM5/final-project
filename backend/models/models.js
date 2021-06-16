import mongoose from 'mongoose'
import crypto from 'crypto'

export const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 15
  },
  email: {
    type: String,
    required: true, 
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String
  }, 
  name: {
    type: String
  },
  bio: {
    type: String
  },
  image: {
    type: String
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

export const Project = mongoose.model('Project', {
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  description: {
    type: String,
    maxlength: 40
  },
  collaborators: {
    type: Array
  }, 
  projectOwner: {
    type: String,
    required: true
  }
})

export const Task = mongoose.model('Task', {
  title: {
    type: String, 
    required: true,
    maxlength: 20
  },
  description: {
    type: String
  },
  taskOwner: {
    type: String
  },
  comments: [{
    username: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    postedAt: {
      type: Date, 
      default: Date.now
    } 
  }]
})