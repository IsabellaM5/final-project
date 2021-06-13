import React from 'react'
import styled from 'styled-components/macro'
import { Route, Link, useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import DeleteProject from 'components/containers/DeleteProject'


const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #DFDBE5;
`

const ProjectBtnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const TaskBtnsContainer = styled.div`
  
`

const ProjectName = styled.h2`

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

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }
`

const EditProjectButton = styled.button`

`

const TasksSectionHeader = ({ projectID, handleEditProject }) => {
  const items = useSelector(store => store.projects.items)

  const project = items.find(item => item._id === projectID)
  console.log(items)

  return (
    <HeaderWrapper>
      <ProjectName>
        {}
      </ProjectName>
      <ProjectBtnsContainer>
        <EditProjectButton
          type="button"
          onClick={handleEditProject}  
        >
          EDIT PROJECT
        </EditProjectButton>
        <DeleteProject 
          projectID={projectID}
        />
      </ProjectBtnsContainer>
      <TaskBtnsContainer>
        <AddTaskButton to={`/authenticated/${projectID}/tasks/new`}>NEW TASK</AddTaskButton>
      </TaskBtnsContainer>
    </HeaderWrapper>
  )
}

export default TasksSectionHeader