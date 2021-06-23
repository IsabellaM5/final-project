import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL, SINGLE_TASK_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

import ModalContainer from 'components/reusable/ModalContainer'
import TaskCardMenu from 'components/tasks/TaskCardMenu'
import EditTask from 'components/tasks/EditTask' 

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
  font-size: 1.4em;
  margin: 0;
  z-index: 1;
  font-weight: 500;

  @media (max-width: 767px) {
    font-size: 1.4em;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  align-self: center;
`

const TaskCard = ({ item, projectID }) => {
  const [editMode, setEditMode] = useState(false)

  const accessToken = useSelector(store => store.user.info.accessToken)

  const dispatch = useDispatch()

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
    <React.Fragment key={item._id}>
      <TaskContainer>
        <Title>{item.title}</Title>
        <ButtonsContainer>
          <TaskCardMenu 
            _id={item._id}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
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
    </React.Fragment>
  )
}

export default TaskCard