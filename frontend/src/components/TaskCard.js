import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

const TaskContainer = styled.div`
  background: #dfdbe5;
  height: 60px;
  width: 100%;
  border-radius: 15px;
  display: flex;
  align-items: center;
`

const Title = styled.p`
  font-size: 1.8em;
  margin: 0;
  z-index: 1;
  font-weight: 500;
`

const TaskLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`

const TaskCard = ({ item, projectID }) => {
  return (
    <TaskLink to={`/authenticated/${projectID}/${item._id}`}>
      <TaskContainer>
        <Title>{item.title}</Title>
      </TaskContainer>
    </TaskLink>
  )
}

export default TaskCard