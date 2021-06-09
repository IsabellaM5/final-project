import express, { Router } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import listEndpoints from 'express-list-endpoints'

import { authenticateUser } from './controllers/authenticateUser'
import * as user from './controllers/userController'
import * as projects from './controllers/projectsController'
import * as tasks from './controllers/tasksController'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/finalprojectAPI"
mongoose.connect(mongoUrl, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true 
})
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

const router = new Router()

// MIDDLEWARES
app.use(cors())
app.use(express.json())

app.use('/', router)
router.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// ROUTES - SIGN UP & SIGN IN
router.post('/signup', user.signUp)
router.post('/signin', user.signIn)

// AUTHENTICATED ROUTES
router.use(authenticateUser)

// USER
router.get('/sessions/users', user.getAllUsers)
router.get('/sessions/:userID', user.getUser)
router.delete('/sessions/:userID', user.deleteUser)
router.patch('/sessions/:userID', user.patchUser)

// PROJECTS
router.get('/sessions/:userID/projects', projects.getProjects)
router.post('/sessions/:userID/projects', projects.newProject)
router.delete('/sessions/projects/:projectID', projects.deleteProject)
router.patch('/sessions/projects/:projectID', projects.patchProject)
router.patch('/sessions/projects/:projectID/collaborators', projects.patchCollaborators)
router.patch('/sessions/projects/:projectID/collaborators/delete', projects.deleteCollaborator)

// TASKS
router.get('/sessions/projects/:projectID/tasks', tasks.getTasks)
router.get('/sessions/projects/:projectID/tasks/:taskID', tasks.getSingleTask)
router.post('/sessions/projects/:projectID/tasks', tasks.newTask)
router.delete('/sessions/projects/:projectID/tasks/:taskID', tasks.deleteTask)
router.patch('/sessions/projects/:projectID/tasks/:taskID', tasks.patchTask)

// START THE SERVER
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})