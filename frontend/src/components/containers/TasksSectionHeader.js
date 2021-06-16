import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

import ModalContainer from 'components/reusable/ModalContainer'
import EditProject from 'components/forms/EditProject'
import NewTask from 'components/forms/NewTask'
import DeleteProject from 'components/containers/DeleteProject'
import Button from 'components/reusable/Button'

const HeaderWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: start;
  justify-items: start;
  border-bottom: 1px solid #DFDBE5;
  padding-bottom: 20px;
`

const ProjectBtnsContainer = styled.div`
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  grid-column: 4 / 5;
`

const TaskBtnsContainer = styled.div`
  grid-column: 5 / 6;
  justify-self: end;
`

const ProjectName = styled.h2`
  /* grid-column: 3 / 4; */
  font-weight: 500;
  font-size: 2.4em;
  text-align: center;
  margin: 0;
`

const DescriptionText = styled.h3`
  font-weight: 400;
  font-size: 1.8em;
  text-align: center;
  margin: 0;
`


const ProjectInfoContainer = styled.div`
  //grid-column: 2 / 3;
`

const Heading = styled.p`
  font-size: 1.8em;
  font-weight: 500;
  margin: 2px;
`

const Username = styled.p`
  font-size: 1.8em;
  margin: 2px;
`

const TasksSectionHeader = ({ projectID }) => {
  const project = useSelector(store => store.projects.activeProject)

  const [editMode, setEditMode] = useState(false)
  const [newItemMode, setNewItemMode] = useState(false)

  return (
    <>
      <HeaderWrapper>
        <ProjectInfoContainer>
          <Heading>
            Project Manager
          </Heading>
          <Username>
            {project.projectOwner}
          </Username>
        </ProjectInfoContainer>
        <ProjectInfoContainer>
          <Heading>
            Collaborators
          </Heading>
          {project.collaborators && (
            project.collaborators.map(collab => (
              <Username key={collab}>{collab}</Username>
            )))}
        </ProjectInfoContainer>
        <ProjectInfoContainer>
          <ProjectName>
            {project.name}
          </ProjectName>
          <DescriptionText>
            {project.description}
          </DescriptionText>
        </ProjectInfoContainer>
        <ProjectBtnsContainer>
          <Button 
            btnText="EDIT PROJECT"
            handleClick={() => setEditMode(true)}  
          />
          <DeleteProject 
            projectID={projectID}
          />
        </ProjectBtnsContainer>
        <TaskBtnsContainer>
          <Button 
            btnText="NEW TASK"
            handleClick={() => setNewItemMode(true)}
          />
        </TaskBtnsContainer>
      </HeaderWrapper>
      <ModalContainer 
        editMode={editMode}
        setEditMode={setEditMode}
        component={
          <EditProject 
            projectID={projectID}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        }
      />
      <ModalContainer 
        editMode={newItemMode}
        setEditMode={setNewItemMode}
        component={
          <NewTask 
            newItemMode={newItemMode}
            setNewItemMode={setNewItemMode}
          />
        }
      />
        
    </>
  )
}

export default TasksSectionHeader