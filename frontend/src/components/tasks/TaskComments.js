import React, { useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL, COMMENT_TASK_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

import TaskCommentWindow from 'components/tasks/TaskCommentWindow'
import TaskCommentInput from 'components/tasks/TaskCommentInput'
import WindowDimensions from 'components/misc/WindowDimensions'

const Wrapper = styled.div`
  padding: 15px;
  border: 1px solid #000000;
  background: #f2eff6;
  border-radius: 5px;
  box-sizing: content-box;
  max-height: 400px;

  @media (max-width: 767px) {
    max-height: 300px;
  }
`

const TaskComments = ({ item, taskComments, setTaskComments }) => {
  const info = useSelector(store => store.user.info)

  const dispatch = useDispatch()
  const lastCommentRef = useRef()

  const { width } = WindowDimensions()

  const scrollToBottom = () => {
    lastCommentRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [item.comments])

  const handleFormSubmit = () => {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': info.accessToken
      },
      body: JSON.stringify({ username: info.username, comment: taskComments })
    }

    fetch(API_URL(COMMENT_TASK_URL(item.taskOwner, item._id)), config)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(tasks.actions.addComment(data))
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })
  }

  return (
    <Wrapper>
      <TaskCommentWindow 
        item={item}
        info={info}
        lastCommentRef={lastCommentRef}
      />
      <TaskCommentInput 
        width={width}
        taskComments={taskComments}
        setTaskComments={setTaskComments}
        handleFormSubmit={handleFormSubmit}
      />
    </Wrapper>
  )
}

export default TaskComments