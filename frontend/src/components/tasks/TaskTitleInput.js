import React from 'react' 

import InputField from 'components/reusable/InputField'

const TaskTitleInput = ({ taskTitle, setTaskTitle }) => {
  return (
    <InputField 
      id="input-task-title"
      label="Task title"
      type="text" 
      value={taskTitle} 
      handleChange={setTaskTitle}
      error={taskTitle.length === 0 || taskTitle.length > 20}
      helperText={
        taskTitle.length === 0 ? 'This field is required' :
        taskTitle.length > 20 ? 'Cannot be longer than 20 characters' : ''
      } 
    />
  )
}

export default TaskTitleInput