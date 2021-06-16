import React, { useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL, COMMENT_TASK_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

import InputField from 'components/reusable/InputField'
import Button from 'components/reusable/Button'

const Wrapper = styled.div`
  padding: 15px;
  border: 1px solid #000000;
  background: #f2eff6;
  border-radius: 5px;
  box-sizing: content-box;
  max-height: 400px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: #ffffff;
  box-sizing: inherit;
  border: 1px solid #000000;
  border-radius: 5px;
  margin-bottom: 10px;
  max-height: 75%;
  overflow-y: auto;
  
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

const CommentContainer = styled.div`
  align-self: ${props => props.align ? 'flex-end' : 'flex-start'};
  max-width: 50%;
  box-sizing: inherit;
  margin: 10px 0; 
`

const CommentWrapper = styled.div`
  border-radius: 10px;
  padding: 5px;
  background: ${props => props.color ? '#9c92ac' : '#c2c2c2'};
`

const CommentText = styled.p`
  margin: 0;
  font-size: 1.6em;
  color: ${props => props.color ? '#ffffff' : '#000000'};
`

const Name = styled.p`
  margin: 0;
`

const LastMessageContainer = styled.div`

`

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const TaskComments = ({ item, taskComments, setTaskComments }) => {
  const info = useSelector(store => store.user.info)

  const dispatch = useDispatch()
  const lastCommentRef = useRef()

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
      <Container>
        {item.comments.map(c => (
          <>
            {c.comment && (
              <CommentContainer
                align={c.username === info.username}
              >
              <Name>{c.username}</Name>
              <CommentWrapper
                color={c.username === info.username}
              >
                <CommentText
                  color={c.username === info.username}
                >
                  {c.comment}
                </CommentText>
              </CommentWrapper>
            </CommentContainer> 
            )}
          </>
        ))}
        <LastMessageContainer 
          ref={lastCommentRef}
        />
      </Container>
      <InputContainer>
        <InputField 
          id="input-task-comments"
          label="Comments"
          type="text" 
          multiline={true}
          value={taskComments} 
          handleChange={setTaskComments} 
          width="75%"
        />
        <Button 
          btnText="SEND"
          handleClick={handleFormSubmit}
        />
      </InputContainer>
    </Wrapper>
  )
}

export default TaskComments