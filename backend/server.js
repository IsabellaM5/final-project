import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import listEndpoints from 'express-list-endpoints'

import { User, Project, Task } from './models/models'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/finalprojectAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

// MIDDLEWARES
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' })
    }
  } catch (error) {
    res.status(400).json({ sucess: false, message: 'Invalid request', error })
  }
}

app.use(cors())
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// SIGN UP
app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body

  try {
    const salt = bcrypt.genSaltSync()

    const newUser = await new User({ 
      username, 
      password: bcrypt.hashSync(password, salt),
      email 
    }).save()
    
    res.status(201).json({ 
      success: true,
      userID: newUser._id, 
      username: newUser.username, 
      email: newUser.email,
      accessToken: newUser.accessToken 
    })
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'User already exists', fields: error.keyValue })
    }
    res.status(400).json({ success: false, message: 'Could not create user', error })
  }
})

// SIGN IN
app.post('/signin', async (req, res) => {
  const { usernameOrEmail, password } = req.body

  try {
    const user = await User.findOne({ 
      $or: [
        { username: usernameOrEmail }, { email: usernameOrEmail }
      ]
    })    

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ 
        success: true,
        userID: user._id,
        username: user.username, 
        email: user.email,
        role: user.role,
        name: user.name,
        bio: user.bio,
        image: user.image, 
        accessToken: user.accessToken 
      })
    } else {
      res.status(404).json({ success: false, message: 'Could not find user' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})

// AUTHENTICATED ROUTES
app.get('/sessions', authenticateUser)

// GET

app.post('/sessions', authenticateUser)

// POST

app.delete('/sessions', authenticateUser)

// DELETE

app.patch('/sessions', authenticateUser)

// PATCH

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
