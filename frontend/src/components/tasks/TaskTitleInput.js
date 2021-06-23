import React, { useState, useEffect } from 'react' 

import InputField from 'components/reusable/InputField'

const TaskTitleInput = ({ taskTitle, setTaskTitle }) => {
  const [helpText, setHelpText] = useState('')

  useEffect(()=> {
    const handleHelperText = () => {
      if (taskTitle.length === 0) {
        setHelpText('This field is required')
      } else if (taskTitle.length > 30) {
        setHelpText('Cannot be longer than 30 characters')
      } else {
        setHelpText('')
      }
    }

    handleHelperText()
  }, [taskTitle])

  return (
    <InputField 
      id="input-task-title"
      label="Task title"
      type="text" 
      value={taskTitle} 
      handleChange={setTaskTitle}
      error={taskTitle.length === 0 || taskTitle.length > 30}
      helperText={helpText} 
    />
  )
}

export default TaskTitleInput