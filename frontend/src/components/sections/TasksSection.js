import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Link, useHistory, useParams } from 'react-router-dom'

import { API_URL, TASKS_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

import TaskCard from 'components/containers/TaskCard'
import EditTask from 'components/containers/EditTask'
import InputField from 'components/reusable/InputField'

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

const CancelButton = styled(Link)`
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

const TasksSection = () => {
  const { projectID } = useParams()

  const [taskTitle, setTaskTitle] = useState('')
  const [description, setDescription] = useState('')
  const [comments, setComments] = useState('')

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

  const handleFormSubmit = () => {
    const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    body: JSON.stringify({ title: taskTitle, description: description, comments: comments })
    }

    fetch(API_URL(TASKS_URL(projectID)), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(tasks.actions.setNewTask(data))
          history.push(`/authenticated/${projectID}/tasks`)
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })
  }

  return (
    <Section>
      <AddTaskButton to={`/authenticated/${projectID}/tasks/new`}>+ ADD</AddTaskButton>
      <Route path="/authenticated/:projectID/tasks/new">
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
                  value={description} 
                  handleChange={setDescription} 
                />
                <InputField 
                  id="input-task-comments"
                  label="Comments"
                  type="text" 
                  multiline={true}
                  value={comments} 
                  handleChange={setComments} 
                />
              </SubContainer>
              <ButtonsContainer>
                <CreateTaskButton type="button" onClick={handleFormSubmit}>ADD</CreateTaskButton>
                <CancelButton to={`/authenticated/${projectID}/tasks`}>CANCEL</CancelButton>
              </ButtonsContainer>
            </NewTaskForm>
          </TaskModal>
        </TaskModalContainer>
      </Route>

        <TasksWrapper>
        {items.map(item => (
          <>
            <TaskCard 
              key={item._id} 
              item={item}
              projectID={projectID} 
            />
            <Route path="/authenticated/:projectID/tasks/task/:itemID">
              <EditTask 
                item={item}
              />
            </Route>
          </>
        ))}
        </TasksWrapper>

    </Section>
  )
}

export default TasksSection