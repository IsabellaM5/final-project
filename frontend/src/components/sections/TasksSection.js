import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { Route, useParams } from 'react-router-dom'

import { API_URL, SINGLE_PROJECT, TASKS_URL } from 'reusable/urls'

import projects from 'reducers/projects'
import tasks from 'reducers/tasks'

import TasksSectionHeader from 'components/containers/TasksSectionHeader'
import TaskCard from 'components/containers/TaskCard'
import NewTask from 'components/forms/NewTask'
import AddNewTaskContainer from 'components/containers/AddNewTaskContainer'

const Section = styled.section`
  width: 85%;
  padding: 30px 50px 50px 50px;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    width: 100%;
    padding: 25px;
  }
`

const TasksWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 25px;
  max-height: 80%;
  overflow-y: auto;
  padding: 0px 10px;
  margin-top: 40px;
  
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

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-gap: 15px;
    max-height: 90%;
  }
`

const LastContainer = styled.div`

`

const TasksSection = () => {
  const { projectID } = useParams()

  const accessToken = useSelector(store => store.user.info.accessToken)
  const items = useSelector(store => store.tasks.items)

  const [newItemMode, setNewItemMode] = useState(false)

  const dispatch = useDispatch()
  const lastTaskRef = useRef()

  const scrollToBottom = () => {
    lastTaskRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [items, newItemMode])

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
        if (data.success) {
          dispatch(tasks.actions.setTasks(data))
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })

      fetch(API_URL(SINGLE_PROJECT(projectID)), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(projects.actions.setActiveProject(data))

          localStorage.setItem('project', JSON.stringify({
            _id: data._id,
            name: data.name,
            projectOwner: data.projectOwner,
            collaborators: data.collaborators
          }))
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch, projectID])

  return (
    <Section>
      <TasksSectionHeader 
        projectID={projectID}
        newItemMode={newItemMode}
        setNewItemMode={setNewItemMode}
      />
      <TasksWrapper>
        {items.map(item => (
          <TaskCard 
            key={item._id}  
            item={item}
            projectID={projectID}
          />
        ))}
      <LastContainer ref={lastTaskRef}>
        <AddNewTaskContainer
          newItemMode={newItemMode}
          setNewItemMode={setNewItemMode}
        />
      </LastContainer>
      </TasksWrapper>
    </Section>
  )
}

export default TasksSection
