import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import listEndpoints from 'express-list-endpoints'

import { User, Project, Task } from './models/models'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/finalprojectAPI"
mongoose.connect(mongoUrl, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true 
})
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
        { username: usernameOrEmail }, 
        { email: usernameOrEmail }
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
// USER
app.get('/sessions/:userID/projects', authenticateUser)
app.get('/sessions/:userID/projects', async (req, res) => {
  const { userID } = req.params

  try {
    const projects = await Project.find({
      $or: [
        { projectOwner: userID }, { collaborators: userID }
      ]
    })

    res.status(200).json({ success: true, projects })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Page not found', error})
  }
})

app.delete('/sessions/:userID', authenticateUser)
app.delete('/sessions/:userID', async (req, res) => {
  const { userID } = req.params

  try {
    const deletedUser = await User.findByIdAndDelete(userID)

    if (deletedUser) {
      const deletedProjects = await Project.findOneAndDelete({ projectOwner: userID }, { useFindAndModify: false } )

      if (deletedProjects) {
        const deletedTasks = await Task.deleteMany({ taskOwner: deletedProjects._id })

        if (deletedTasks) {
          res.status(200).json({ success: true, deletedUser, deletedProjects, deletedTasks })
        } else {
          res.status(400).json({ success: false, message: 'Tasks related to project could not be deleted' })
        }
      } else {
        res.status(400).json({ success: false, message: 'Projects related to user could not be deleted' })
      }
    } else {
      res.status(400).json({ success: false, message: 'Could not find user' })
    }
  } catch (error) {
    res.status(404).json({ success: false, message: 'Invalid request/Could not delete user', error })
  }
})

app.patch('/sessions/:userID', authenticateUser)
app.patch('/sessions/:userID', async (req, res) => {
  const { userID } = req.params

  try {
    const updatedUser = await User.findByIdAndUpdate(userID, req.body, { new: true })
    if (updatedUser) {
      res.status(200).json({ success: true, updated: req.body })
    } else {
      res.status(404).json({ success: false, message: 'Could not find user' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request/could not update user', error })
  }
})

// PROJECTS
app.get('/sessions/projects/:projectID/tasks', authenticateUser)
app.get('/sessions/projects/:projectID/tasks', async (req, res) => {
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

app.post('/sessions/:userID/projects', authenticateUser)
app.post('/sessions/:userID/projects', async (req, res) => {
  const { userID } = req.params
  const { name, description, collaborators } = req.body

  let collaborator = ''

  if (collaborators) {
    collaborator = await User.findOne({
      username: collaborators
    })
  }
  
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

app.delete('/sessions/projects/:projectID', authenticateUser)
app.delete('/sessions/projects/:projectID', async (req, res) => {
  const { projectID } = req.params

  try {
    const deletedProject = await Project.findByIdAndDelete(projectID)

    if (deletedProject) {
      const deletedTasks = await Task.deleteMany({ taskOwner: projectID })

      if (deletedTasks) {
        res.status(200).json({ success: true, deletedProject, deletedTasks })
      } else {
        res.status(400).json({ success: false, message: 'Tasks related to project could not be deleted.' })
      }
    } else {
      res.status(404).json({ success: false, message: 'Could not find project' })
    }
  } catch (error) {
    res.status(404).json({ success: false, message: 'Invalid request', error })
  }
})

app.patch('/sessions/projects/:projectID', authenticateUser)
app.patch('/sessions/projects/:projectID', async (req, res) => {
  const { projectID } = req.params

  try {
    const updatedProject = await Project.findByIdAndUpdate(projectID, req.body, { new: true })

    if (updatedProject) {
      res.status(200).json({ success: true, updated: req.body })
    } else {
      res.status(404).json({ success: false, message: 'Could not find project' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request/could not update project', error })
  }
})

app.patch('/sessions/projects/:projectID/collaborators', authenticateUser)
app.patch('/sessions/projects/:projectID/collaborators', async (req, res) => {
  const { projectID } = req.params

  let collaborator = ''

  if (req.body.collaborators) {
    collaborator = await User.findOne({
      username: req.body.collaborators
    })
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(projectID, { collaborators: collaborator._id }, { new: true })

    if (updatedProject) {
      res.status(200).json({ success: true, updated: req.body })
    } else {
      res.status(404).json({ success: false, message: 'Could not find project' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request/could not update project', error })
  }
})

// TASKS
app.get('/sessions/projects/:projectID/tasks/:taskID', authenticateUser)
app.get('/sessions/projects/:projectID/tasks/:taskID', async (req, res) => {
  const projectID = req.params.projectID
  const taskID = req.params.taskID

  try {
    const task = await Task.findById(taskID)
    res.status(200).json({ success: true, task })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Page not found', error })
  }
})

app.post('/sessions/projects/:projectID/tasks', authenticateUser)
app.post('/sessions/projects/:projectID/tasks', async (req, res) => {
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

app.delete('/sessions/projects/:projectID/tasks/:taskID', authenticateUser)
app.delete('/sessions/projects/:projectID/tasks/:taskID', async (req, res) => {
  const projectID = req.params.projectID
  const taskID = req.params.taskID

  try {
    const deletedTask = await Task.findByIdAndDelete(taskID)
    if (deletedTask) {
      res.status(200).json({ success: true, deletedTask })
    } else {
      res.status(404).json({ success: false, message: 'Could not find task' })
    }
  } catch (error) {
    res.status(404).json({ success: false, message: 'Invalid request', error })
  }
})

app.patch('/sessions/projects/:projectID/tasks/:taskID', authenticateUser)
app.patch('/sessions/projects/:projectID/tasks/:taskID', async (req, res) => {
  const projectID = req.params.projectID
  const taskID = req.params.taskID

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskID, req.body, { new: true })
    if (updatedTask) {
      res.status(200).json({ success: true, updated: req.body })
    } else {
      res.status(404).json({ success: false, message: 'Could not find task' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request/could not update task', error })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
