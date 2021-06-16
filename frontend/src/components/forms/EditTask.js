import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch, batch } from 'react-redux'

import { API_URL, SINGLE_TASK_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

import InputField from 'components/reusable/InputField'
import TaskComments from 'components/containers/TaskComments'
import Button from 'components/reusable/Button'

const FormWrapper = styled.div`
  width: 60%;
`

const EditTaskForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 20px;
  padding: 40px;
  border-radius: 15px;
  background: #ffffff;

  &:focus {
    outline: none;
  }
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonsContainer = styled.div`
  grid-column: 1 / 3;
  display: flex;
  justify-content: flex-end;
`

const EditTask = ({ item, setEditMode }) => {
  const [taskTitle, setTaskTitle] = useState(item.title)
  const [taskDesc, setTaskDesc] = useState(item.description)
  const [taskComments, setTaskComments] = useState('')

  const accessToken = useSelector(store => store.user.info.accessToken)

  const dispatch = useDispatch()

  const handleFormSubmit = () => {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ title: taskTitle, description: taskDesc, comments: taskComments })
    }

    fetch(API_URL(SINGLE_TASK_URL(item.taskOwner, item._id)), config)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(tasks.actions.editTask(data))
            setEditMode(false)
          })
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })
  }

  return (
    <FormWrapper>
      <EditTaskForm>
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
        </SubContainer>
        <TaskComments 
          item={item}
          taskComments={taskComments} 
          setTaskComments={setTaskComments}
        />
        <ButtonsContainer>
          <Button 
            btnText="SAVE"
            handleClick={handleFormSubmit}
          />
          <Button 
            btnText="CANCEL"
            handleClick={() => setEditMode(false)}
          />
        </ButtonsContainer>
      </EditTaskForm>
    </FormWrapper>
  )
}

export default EditTask