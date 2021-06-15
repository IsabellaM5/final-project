import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import EditProject from 'components/forms/EditProject'
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

  const [editProject, setEditProject] = useState(false)

  const handleEditProject = () => {
    setEditProject(true)
  }

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
            handleClick={handleEditProject}  
          />
          <DeleteProject 
            projectID={projectID}
          />
        </ProjectBtnsContainer>
        <TaskBtnsContainer>
          <Link to={`/authenticated/${projectID}/tasks/new`}>
            <Button 
              btnText="NEW TASK"
            />
          </Link>
        </TaskBtnsContainer>
      </HeaderWrapper>
      {editProject && (
        <EditProject 
          projectID={projectID}
          editProject={editProject}
          setEditProject={setEditProject}
        />
      )}
    </>
  )
}

export default TasksSectionHeader