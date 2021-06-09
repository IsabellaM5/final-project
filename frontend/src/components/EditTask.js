import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Link, useParams } from 'react-router-dom'

import { API_URL, SINGLE_TASK_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

const ModalContainer = styled.div`
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

const ModalSubContainer = styled.div`
  background: #ffffff;
  width: 50%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const EditTaskForm = styled.form`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 20px;
  padding: 40px;
  border-radius: 20px;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 1.6em;
  margin-bottom: 5px;
`

const InputField = styled.input`
  margin-bottom: 10px;
  border-radius: 4px;
  height: 30px;
  border: none;
  background: #9c92ac;
`

const Textarea = styled.textarea`
  margin-bottom: 10px;
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  resize: none;
  height: 70px;
`

const ButtonsContainer = styled.div`
  grid-column: 1 / 3;
  display: flex;
  justify-content: flex-end;
`

const SaveButton = styled.button`
  padding: 5px;
  width: 50px;
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #ffffff;
  margin: 5px;
  font-size: 1.4em;

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }
`

const CancelButton = styled(Link)`
  padding: 5px;
  width: 70px;
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #ffffff;
  margin: 5px;
  text-decoration: none;
  text-align: center;
  font-size: 1.4em;

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }
`

const EditTask = ({ item }) => {
  const { projectID, itemID } = useParams()

  const [taskTitle, setTaskTitle] = useState(item.title)
  const [taskDesc, setTaskDesc] = useState(item.description)
  const [taskComments, setTaskComments] = useState(item.comments)

  const accessToken = useSelector(store => store.user.info.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleFormSubmit = () => {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ title: taskTitle, description: taskDesc, comments: taskComments })
    }

    fetch(API_URL(SINGLE_TASK_URL(projectID, itemID)), config)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(tasks.actions.editTask(data))
          history.push(`/authenticated/${projectID}/tasks`)
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })
  }
  


  return (
    <ModalContainer>
      <ModalSubContainer>
        <EditTaskForm>
          <SubContainer>
            <Label htmlFor="input-task-title">Title</Label>
            <InputField 
              id="input-task-title"
              type="text" 
              value={taskTitle} 
              onChange={(e) => setTaskTitle(e.target.value)} 
            />
            <Label htmlFor="input-task-description">Description</Label>
            <InputField 
              id="input-task-description"
              type="text" 
              value={taskDesc} 
              onChange={(e) => setTaskDesc(e.target.value)} 
            />
            <Label htmlFor="input-comments">Comments</Label>
            <InputField 
              id="input-comments"
              type="text" 
              value={taskComments} 
              onChange={(e) => setTaskComments(e.target.value)}
            />
          </SubContainer>
          <ButtonsContainer>
            <SaveButton 
              type="button"
              onClick={handleFormSubmit}
            >
              ADD
            </SaveButton>
            <CancelButton to={`/authenticated/${projectID}/tasks`}>CANCEL</CancelButton>
          </ButtonsContainer>
        </EditTaskForm>
      </ModalSubContainer>
    </ModalContainer>
  )
}

export default EditTask