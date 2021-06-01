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
// GET
app.get('/sessions/:userID/projects', authenticateUser)
app.get('/sessions/:userID/projects', async (req, res) => {
  const { userID } = req.params

  try {
    const projects = await Project.find({
      // projectOwner: userID
      $or: [
        { projectOwner: userID }, { collaborators: userID }
      ]
    })

    res.status(200).json({ success: true, projects })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Page not found', error})
  }
})

app.get('/sessions/:projectID/tasks', authenticateUser)
app.get('/sessions/:projectID/tasks', async (req, res) => {
  const { projectID } = req.params
  
  try {
    const tasks = await Task.find({
      taskOwner: projectID
    })

    res.status(200).json({ success: true, tasks })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Page not found', error })
  }
})

app.get('/sessions/:taskID', authenticateUser)
app.get('/sessions/:taskID', async (req, res) => {
  const { taskID } = req.params

  try {
    const task = await Task.findById(taskID)
    res.status(200).json({ success: true, task })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Page not found', error })
  }
})

// POST
app.post('/sessions/:userID/projects', authenticateUser)
app.post('/sessions/:userID/projects', async (req, res) => {
  const { userID } = req.params
  const { name, description, collaborators } = req.body

  const collaborator = await User.findOne({
    username: collaborators
  })

  try {
    const newProject = await new Project({
      name,
      description,
      collaborators: collaborator._id,
      projectOwner: userID
    }).save()

    res.status(201).json({ 
      success: true,
      projectID: newProject._id,
      name: newProject.name, 
      description: newProject.description,
      collaborators: newProject.collaborators,
      projectOwner: newProject.projectOwner
    })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})

app.post('/sessions/:projectID/tasks', authenticateUser)
app.post('/sessions/:projectID/tasks', async (req, res) => {
  const { projectID } = req.params
  const { title, description, comments } = req.body

  try {
    const newTask = await new Task({
      title,
      description,
      taskOwner: projectID,
      comments
    }).save()

    res.status(201).json({
      success: true,
      taskID: newTask._id,
      title: newTask.title,
      description: newTask.description,
      taskOwner: newTask.taskOwner,
      comments: newTask.comments
    })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})


// DELETE
app.delete('/sessions', authenticateUser)



// PATCH
app.patch('/sessions/:userID/profile', authenticateUser)
app.patch('/sessions/:userID/profile', async (req, res) => {
  const { userID } = req.params

  try {
    const updatedUser = await User.findByIdAndUpdate(userID, req.body, { new: true })
    if (updatedUser) {
      res.status(200).json({ success: true, updated: req.body })
    } else {
      res.status(404).json({ success: false, message: 'Could not find user' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request/could not update user', error })
  }
})



// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
