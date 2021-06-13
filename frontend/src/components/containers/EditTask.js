import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { API_URL, SINGLE_TASK_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

import InputField from 'components/reusable/InputField'

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

const CancelButton = styled.button`
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

const EditTask = ({ taskTitle, setTaskTitle, taskDesc, setTaskDesc, taskComments, setTaskComments, setEditMode }) => {
  const { projectID, itemID } = useParams()

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

    fetch(API_URL(SINGLE_TASK_URL(projectID, itemID)), config)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(tasks.actions.editTask(data))
          setEditMode(false)
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
            <SaveButton 
              type="button"
              onClick={handleFormSubmit}
            >
              SAVE
            </SaveButton>
            <CancelButton onClick={() => setEditMode(false)}>CANCEL</CancelButton>
          </ButtonsContainer>
        </EditTaskForm>
      </ModalSubContainer>
    </ModalContainer>
  )
}

export default EditTask