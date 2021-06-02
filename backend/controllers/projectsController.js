import { User, Project, Task } from '../models/models'

export const getProjects = async (req, res) => {
  const { userID } = req.params

  try {
    const projects = await Project.find({
      $or: [
        { projectOwner: userID }, { collaborators: userID }
      ]
    })

    res.status(200).json({ success: true, projects })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Page not found', error })
  }
}

export const newProject = async (req, res) => {
  const { userID } = req.params
  const { name, description, collaborators } = req.body

  let collaborator = ''

  if (collaborators) {
    collaborator = await User.findOne({
      username: collaborators
    })
  }
  
  try {
    const project = await new Project({
      name,
      description,
      collaborators: collaborator._id,
      projectOwner: userID
    }).save()

    res.status(201).json({ 
      success: true,
      projectID: project._id,
      name: project.name, 
      description: project.description,
      collaborators: project.collaborators,
      projectOwner: project.projectOwner
    })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
}

export const deleteProject = async (req, res) => {
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
}

export const patchProject = async (req, res) => {
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
}

export const patchCollaborators = async (req, res) => {
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
}