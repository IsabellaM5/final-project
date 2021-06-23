import React, { useState, useEffect } from 'react' 
import { useSelector } from 'react-redux'

import InputField from 'components/reusable/InputField'

const NewTaskTitleInput = ({ taskTitle, setTaskTitle }) => {
  const err = useSelector(store => store.user.errors)

  const [helpText, setHelpText] = useState('')

  useEffect(()=> {
    const handleHelperText = () => {
      if (taskTitle.length > 30) {
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
      error={err || taskTitle.length > 30}
      helperText={helpText} 
    />
  )
}

export default NewTaskTitleInput