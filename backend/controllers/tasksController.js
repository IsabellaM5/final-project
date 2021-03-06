import { Task } from '../models/models'

export const getTasks = async (req, res) => {
  const { projectID } = req.params
  
  try {
    const tasks = await Task.find({
      taskOwner: projectID
    })

    res.status(200).json({ 
      success: true, 
      tasks 
    })
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Invalid request', 
      error 
    })
  }
}

export const getSingleTask = async (req, res) => {
  const projectID = req.params.projectID
  const taskID = req.params.taskID

  try {
    const task = await Task.findById(taskID)
    res.status(200).json({ 
      success: true, 
      task 
    })
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Invalid request', 
      error 
    })
  }
}

export const newTask = async (req, res) => {
  const { projectID } = req.params
  const { title } = req.body

  try {
    const task = await new Task({
      title,
      taskOwner: projectID
    }).save()

    res.status(201).json({
      success: true,
      task
    })
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Invalid request', 
      error 
    })
  }
}

export const deleteTask = async (req, res) => {
  const projectID = req.params.projectID
  const taskID = req.params.taskID

  try {
    const deletedTask = await Task.findByIdAndDelete(taskID)
    if (deletedTask) {
      res.status(200).json({ 
        success: true, 
        deletedTask 
      })
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Could not find task' 
      })
    }
  } catch (error) {
    res.status(404).json({ 
      success: false, 
      message: 'Invalid request', 
      error 
    })
  }
}

export const patchTask = async (req, res) => {
  const projectID = req.params.projectID
  const taskID = req.params.taskID

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskID, req.body, { new: true })
    if (updatedTask) {
      res.status(200).json({ 
        success: true, 
        _id: taskID,
        updatedTask,
      })
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Could not find task' 
      })
    }
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Invalid request', 
      error 
    })
  }
}

export const patchComments = async (req, res) => {
  const projectID = req.params.projectID
  const taskID = req.params.taskID
  const { username, comment } = req.body

  try {
    if (comment && username) {
      const updatedTask = await Task.findByIdAndUpdate(taskID, { $push: { comments: { username: username, comment: comment } } }, { new: true })
      if (updatedTask) {
        res.status(200).json({ 
          success: true,
          updatedTask
        })
      } else {
        res.status(404).json({ 
          success: false, 
          message: 'Could not find task' 
        })
      }
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Request missing required body'
      })
    }
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Invalid request', 
      error 
    })
  }
}

export const patchComplete = async (req, res) => {
  const projectID = req.params.projectID
  const taskID = req.params.taskID

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskID, { complete: req.body.complete }, { new: true })

    if (updatedTask) {
      res.status(200).json({ 
        success: true,
        updatedTask
      })
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Could not find task' 
      })
    }
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Invalid request', 
      error 
    })
  }
}