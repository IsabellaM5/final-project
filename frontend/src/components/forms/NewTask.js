import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API_URL, TASKS_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

import InputField from 'components/reusable/InputField'
import Button from 'components/reusable/Button'

const TaskModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(000, 000, 000, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const TaskModal = styled.div`
  background: #ffffff;
  width: 50%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const NewTaskForm = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px;
  border-radius: 20px;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonsContainer = styled.div`

`

const CreateTaskButton = styled.button`
  padding: 5px;
  width: 50px;
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #ffffff;
  margin-bottom: 25px;

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }
`

const NewTask = () => {
  const { projectID } = useParams()

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskComments, setTaskComments] = useState('')

  const accessToken = useSelector(store => store.user.info.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

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
          history.push(`/authenticated/${projectID}/tasks`)
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })
  }

  return (
    <TaskModalContainer>
      <TaskModal>
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
            <CreateTaskButton type="button" onClick={handleFormSubmit}>ADD</CreateTaskButton>
            <Link to={`/authenticated/${projectID}/tasks`}>
              <Button 
                btnText="CANCEL"
              />
            </Link>
          </ButtonsContainer>
        </NewTaskForm>
      </TaskModal>
    </TaskModalContainer>
  )
}

export default NewTask