import React from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: #ffffff;
  box-sizing: inherit;
  border: 1px solid #000000;
  border-radius: 5px;
  margin-bottom: 10px;
  height: 70%;
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

  @media (max-width: 767px) {
    height: 150px;
  }
`

const Container = styled.div`
  align-self: ${props => props.alignSelf ? 'flex-end' : 'flex-start'};
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

const TaskCommentWindow = ({ item, info, lastCommentRef }) => {
  return (
    <Wrapper>
      {item.comments.map(c => (
        <>
          {c.comment && (
            <Container
              alignSelf={c.username === info.username}
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
          </Container> 
          )}
        </>
      ))}
      <LastMessageContainer 
        ref={lastCommentRef}
      />
    </Wrapper>
  )
}

export default TaskCommentWindow
