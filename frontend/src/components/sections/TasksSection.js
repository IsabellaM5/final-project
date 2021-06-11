import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Link, useParams, useHistory } from 'react-router-dom'

import { API_URL, TASKS_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

import TaskCard from 'components/containers/TaskCard'
import EditTask from 'components/containers/EditTask' 
import NewTask from 'components/containers/NewTask'
import DeleteProject from 'components/containers/DeleteProject'

const Section = styled.section`
  width: 85%;
  padding: 50px;
  display: flex;
  flex-direction: column;
`

const TasksWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 25px;
  max-height: 80%;
  overflow-y: auto;
  padding: 0px 10px;
  
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f3f3;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #dfdbe5;
    border-radius: 5px;
  }
`

const AddTaskButton = styled(Link)`
  align-self: flex-end;
  padding: 5px;
  width: 70px;
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

const ButtonsContainer = styled.div`

`

const EditProjectButton = styled.button`

`

const TasksSection = () => {
  const { projectID } = useParams()

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskComments, setTaskComments] = useState('')

  const accessToken = useSelector(store => store.user.info.accessToken)
  const items = useSelector(store => store.tasks.items)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    fetch(API_URL(TASKS_URL(projectID)), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(tasks.actions.setTasks(data))
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch, projectID])
  
  const handleEditProject = () => {
    history.push(`/authenticated/project/${projectID}`)
  }

  return (
    <Section>
      <ButtonsContainer>
        <EditProjectButton
          type="button"
          onClick={handleEditProject}  
        >
          EDIT PROJECT
        </EditProjectButton>
        <DeleteProject 
          projectID={projectID}
        />
        <AddTaskButton to={`/authenticated/${projectID}/tasks/new`}>NEW TASK</AddTaskButton>
      </ButtonsContainer>
      <Route path="/authenticated/:projectID/tasks/new">
        <NewTask />
      </Route>
      <TasksWrapper>
        {items.map(item => (
          <TaskCard 
            key={item._id} 
            item={item}
            projectID={projectID}
            setTaskTitle={setTaskTitle}
            setTaskDesc={setTaskDesc}
            setTaskComments={setTaskComments}
          />
        ))}
        <Route path="/authenticated/:projectID/tasks/task/:itemID">
          <EditTask 
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            taskDesc={taskDesc}
            setTaskDesc={setTaskDesc}
            taskComments={taskComments}
            setTaskComments={setTaskComments}
          />
      </Route>
      </TasksWrapper>
    </Section>
  )
}

export default TasksSection

/* 
  taskTitle={taskTitle}
  setTaskTitle={setTaskTitle}
  taskDesc={taskDesc}
  setTaskDesc={setTaskDesc}
  taskComments={taskComments}
  setTaskComments={setTaskComments}*/