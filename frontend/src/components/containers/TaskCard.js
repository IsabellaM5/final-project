import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

import { API_URL, SINGLE_TASK_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

import ModalContainer from 'components/reusable/ModalContainer'
import EditTask from 'components/forms/EditTask' 
import Icon from 'components/minor/Icon'

const TaskContainer = styled.div`
  background: #dfdbe5;
  height: 60px;
  width: 100%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  cursor: pointer;
`

const Title = styled.p`
  font-size: 1.8em;
  margin: 0;
  z-index: 1;
  font-weight: 500;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-self: flex-start;
`

const TaskCard = ({ item, projectID }) => {
  const [editMode, setEditMode] = useState(false)

  const accessToken = useSelector(store => store.user.info.accessToken)

  const dispatch = useDispatch()

  console.log(API_URL(SINGLE_TASK_URL(projectID, item._id)))

  const handleDeleteTask = (apiMethod) => {
    const config = {
      method: apiMethod,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    fetch(API_URL(SINGLE_TASK_URL(projectID, item._id)), config)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(tasks.actions.deleteTask(data))
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })
  }

  const handleEditTask = () => {
    setEditMode(true)
  }

  return (
    <>
      <TaskContainer onClick={handleEditTask}>
        <Title>{item.title}</Title>
        <ButtonsContainer>
          <Icon 
            icon={<FaEdit size="15" />}
            handleIconClick={handleEditTask}
          />
          <Icon 
            icon={<FaTrashAlt size="15" />} 
            handleIconClick={handleDeleteTask}
            apiMethod={'DELETE'} 
          />
        </ButtonsContainer>
      </TaskContainer>
      <ModalContainer 
        editMode={editMode}
        setEditMode={setEditMode}
        component={
          <EditTask
            item={item} 
            setEditMode={setEditMode}
          />
        }
      />
    </>
  )
}

export default TaskCard