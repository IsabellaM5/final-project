import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API_URL, TASKS_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

import InputField from 'components/reusable/InputField'
import Button from 'components/reusable/Button'

const NewTaskForm = styled.form`
  width: 50%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px;
  border-radius: 20px;

  &:focus {
    outline: none;
  }
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonsContainer = styled.div`

`

const NewTask = ({ newItemMode, setNewItemMode }) => {
  const { projectID } = useParams()

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskComments, setTaskComments] = useState('')

  const accessToken = useSelector(store => store.user.info.accessToken)

  const dispatch = useDispatch()

  const handleFormSubmit = () => {
    const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    body: JSON.stringify({ title: taskTitle, description: taskDesc, comments: taskComments })
    }

    fetch(API_URL(TASKS_URL(projectID)), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(tasks.actions.setNewTask(data.task))
          setNewItemMode(false)
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })
  }

  return (
    <NewTaskForm>
      <SubContainer>
        <InputField 
          id="input-task-title"
          label="Task title"
          type="text" 
          value={taskTitle} 
          handleChange={setTaskTitle} 
        />
        <InputField 
          id="input-task-description"
          label="Description"
          type="text" 
          multiline={true}
          value={taskDesc} 
          handleChange={setTaskDesc} 
        />
        <InputField 
          id="input-task-comments"
          label="Comments"
          type="text" 
          multiline={true}
          value={taskComments} 
          handleChange={setTaskComments} 
        />
      </SubContainer>
      <ButtonsContainer>
        <Button 
          btnText="ADD" 
          handleClick={handleFormSubmit} 
        />
        <Button 
          btnText="CANCEL"
          handleClick={() => setNewItemMode(false)}
        />
      </ButtonsContainer>
    </NewTaskForm>
  )
}

export default NewTask