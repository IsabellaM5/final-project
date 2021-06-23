import React, { useState } from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import { useDispatch } from 'react-redux'

import { API_URL, COMPLETE_TASK_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

const TaskComplete = ({ item, accessToken }) => {
  const [checked, setChecked] = useState(item.complete)

  const dispatch = useDispatch()

  const handleChange = () => {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ complete: !checked })
    }

    fetch(API_URL(COMPLETE_TASK_URL(item.taskOwner, item._id)), config)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(tasks.actions.toggleComplete(data))
          setChecked(!checked)
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })
  }

  return (
    <>
      <FormControlLabel 
        label="Complete"
        labelPlacement="top"
        control={
          <Checkbox
            icon={
              <FavoriteBorder 
                fontSize="large"  
              />
            }
            checkedIcon={
              <Favorite 
                fontSize="large"
              />
            }
            checked={checked}
            onChange={handleChange}
            color="default"
            inputProps={{ 'aria-label': 'task complete checkbox' }}
          />
        }
      />
    </>
  )
}

export default TaskComplete