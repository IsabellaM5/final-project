import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Route, Link, useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import EditProject from 'components/containers/EditProject'
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
  grid-column: 3 / 4;
  font-weight: 400;
  font-size: 2.4em;
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
  const [projectName, setProjectName] = useState(project.name)
  const [projectDesc, setProjectDesc] = useState(project.description)
  const [projectCollabs, setProjectCollabs] = useState(project.collaborators)

  console.log(projectName)

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
              <Username>{collab}</Username>
            )))}
        </ProjectInfoContainer>
        <ProjectName>
          {project.name}
        </ProjectName>
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
          setEditProject={setEditProject}
          projectName={projectName}
          setProjectName={setProjectName}
          projectDesc={projectDesc}
          setProjectDesc={setProjectDesc}
          projectCollabs={projectCollabs}
          setProjectCollabs={setProjectCollabs}
        />
      )}
    </>
  )
}

export default TasksSectionHeader