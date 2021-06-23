import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { API_URL, SINGLE_PROJECT, TASKS_URL } from 'reusable/urls'

import projects from 'reducers/projects'
import tasks from 'reducers/tasks'

import BackButton from 'components/navigation/BackButton'
import TasksSectionHeader from 'components/tasks/TasksSectionHeader'
import TaskCard from 'components/tasks/TaskCard'
import AddNewTaskContainer from 'components/tasks/AddNewTaskContainer'

const Section = styled.section`
  width: 85%;
  padding: 30px 50px 50px 50px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1023px) {
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

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    max-height: 90%;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const LastContainer = styled.div`

`

const ErrorMessage = styled.p`
  font-size: 3.2em;
  color: #000000;
  margin: 0;
  text-align: center;

  @media (max-width: 767px) {
    font-size: 2.0em;
  }
`

const TasksSection = () => {
  const { projectID } = useParams()

  const accessToken = useSelector(store => store.user.info.accessToken)
  const items = useSelector(store => store.tasks.items)
  const error = useSelector(store => store.user.errors)

  const [newItemMode, setNewItemMode] = useState(false)

  const dispatch = useDispatch()
  const lastTaskRef = useRef()

  const scrollToBottom = () => {
    lastTaskRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [items, newItemMode])

  useEffect(() => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    Promise.all([
      fetch(API_URL(TASKS_URL(projectID)), config),
      fetch(API_URL(SINGLE_PROJECT(projectID)), config)
    ])
      .then((res) => {
        return Promise.all(res.map(r => r.json()))
      })
      .then((data) => {
        if (data[0].success && data[1].success) {
          dispatch(tasks.actions.setTasks(data[0]))
          dispatch(projects.actions.setActiveProject(data[1]))

          localStorage.setItem('project', JSON.stringify({
            _id: data._id,
            name: data.name,
            projectOwner: data.projectOwner,
            collaborators: data.collaborators
          }))
        } else {
          dispatch(tasks.actions.setErrors(data))
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch, projectID])

  return (
    <Section>
      <BackButton 
        path={'/authenticated/projects'}
      />
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
      {error && <ErrorMessage>Opps, something went wrong...</ErrorMessage>}
    </Section>
  )
}

export default TasksSection
