import { User, Project, Task } from '../models/models'

export const getProjects = async (req, res) => {
  const { userID } = req.params

  let altProjects = []

  try {
    const projects = await Project.find({
      $or: [
        { projectOwner: userID }, { collaborators: userID }
      ]
    })

    for (const project of projects) {
      let collabs = []
      for (const id of project.collaborators) {
        const user = await User.findById({_id: id})
        collabs.push(user.username)
      }
      altProjects.push({ 
        _id: project._id, 
        name: project.name, 
        description: project.description, 
        collaborators: collabs, 
        projectOwner: project.projectOwner 
      })
    }

    res.status(200).json({ success: true, altProjects })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Page not found', error })
  }
}

export const getSingleProject = async (req, res) => {
  const { projectID } = req.params

  try {
    const project = await Project.findById(projectID)
    const collabs = []
    for (const id of project.collaborators) {
      const user = await User.findById({_id: id})
      collabs.push(user.username)
    }
    const projectOwner = await User.findById(project.projectOwner)

    res.status(200).json({
      success: true, 
      _id: project._id, 
      name: project.name, 
      description: project.description, 
      collaborators: collabs, 
      projectOwner: projectOwner.username 
    })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Page not found', error })
  }
}

export const newProject = async (req, res) => {
  const { userID } = req.params
  const { name, description, collaborators } = req.body

  let collaboratorsArray = []

  try {
    if (collaborators) { 
      for (const username of collaborators) {      
        const collaborator = await User.findOne({ username })
        collaboratorsArray.push(collaborator._id.toString())
      }
    }

    const project = await new Project({
      name,
      description,
      collaborators: collaboratorsArray,
      projectOwner: userID
    }).save()
  
    res.status(201).json({ 
      success: true,
      project
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
    const collabs = []
    for (const id of updatedProject.collaborators) {
      const user = await User.findById({_id: id})
      collabs.push(user.username)
    }
    const projectOwner = await User.findById(updatedProject.projectOwner)

    if (updatedProject) {
      res.status(200).json({ 
        success: true, 
        _id: updatedProject._id, 
        name: updatedProject.name, 
        description: updatedProject.description, 
        collaborators: collabs, 
        projectOwner: projectOwner.username 
      })
    } else {
      res.status(404).json({ success: false, message: 'Could not find project' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request/could not update project', error })
  }
}

export const patchCollaborators = async (req, res) => {
  const { projectID } = req.params

  try {
    const collaboratorsArray = []
    
    for (const username of req.body.collaborators) {      
      const collaborator = await User.findOne({ username })
      collaboratorsArray.push(collaborator._id.toString())
    }

    const updatedProject = await Project.findByIdAndUpdate(projectID, { $push: { collaborators: collaboratorsArray } }, { new: true })

    const collabs = []
    for (const id of updatedProject.collaborators) {
      const user = await User.findById({_id: id})
      collabs.push(user.username)
    }
    const projectOwner = await User.findById(updatedProject.projectOwner)

    if (updatedProject) {
      res.status(200).json({ 
        success: true, 
        _id: updatedProject._id, 
        name: updatedProject.name, 
        description: updatedProject.description, 
        collaborators: collabs, 
        projectOwner: projectOwner.username 
      })
    } else {
      res.status(404).json({ success: false, message: 'Could not find project' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request/could not update project', error })
  }
}

export const deleteCollaborator = async (req, res) => {
  const { projectID } = req.params
  
  try {
    let newCollaboratorsArray = []
    const getProject = await Project.findById(projectID)
    const collaborator = await User.findOne({ username: req.body.collaborators })
    const selectedCollaborator = collaborator._id.toString()

    for (const collab of getProject.collaborators) {
      if (collab !== selectedCollaborator) {
        newCollaboratorsArray.push(collab)
      }
    }

    const updatedCollaborators = await Project.findByIdAndUpdate(projectID, { collaborators: newCollaboratorsArray }, { new: true })

    const collabs = []
    for (const id of updatedCollaborators.collaborators) {
      const user = await User.findById({_id: id})
      collabs.push(user.username)
    }
    const projectOwner = await User.findById(updatedCollaborators.projectOwner)

    if (updatedCollaborators) {
      res.status(200).json({ 
        success: true, 
        _id: updatedCollaborators._id, 
        name: updatedCollaborators.name, 
        description: updatedCollaborators.description, 
        collaborators: collabs, 
        projectOwner: projectOwner.username       
      })
    } else {
      res.status(404).json({ success: false, message: 'Could not find project' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request/could not update project', error })
  }
}