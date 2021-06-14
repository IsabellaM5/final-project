import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Link, useHistory } from 'react-router-dom'

import { API_URL, PROJECTS_URL } from 'reusable/urls'

import projects from 'reducers/projects'

import ProjectCard from 'components/containers/ProjectCard'
import Modal from 'components/containers/Modal'
import Button from 'components/reusable/Button'

const Section = styled.section`
  width: 85%;
  padding: 50px;
  display: flex;
  flex-direction: column;
`

const ProjectsWrapper = styled.div`
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

const AddProject = styled(Link)`
  align-self: flex-end;
`

const ProjectsSection = () => {
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCollaborators, setSelectedCollaborators] = useState([])

  let collaboratorsArray = []

  const userID = useSelector(store => store.user.info.userID)
  const accessToken = useSelector(store => store.user.info.accessToken)
  const items = useSelector(store => store.projects.items)

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

    fetch(API_URL(PROJECTS_URL(userID)), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(projects.actions.setProjects(data.altProjects))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch, userID])

  const handleFormSubmit = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ name: projectName, description: description, collaborators: selectedCollaborators })
    }

    console.log(collaboratorsArray)

    fetch(API_URL(PROJECTS_URL(userID)), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(projects.actions.setNewProject(data.project))
          history.push('/authenticated/projects')
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }

  return (
    <Section>
      <AddProject to="/authenticated/projects/new">
        <Button 
          btnText="ADD"
        />
      </AddProject>
      <Route path="/authenticated/projects/new">
        <Modal
          projectName={projectName}
          setProjectName={setProjectName}
          description={description}
          setDescription={setDescription}
          selectedCollaborators={selectedCollaborators}
          setSelectedCollaborators={setSelectedCollaborators}
          handleFormSubmit={handleFormSubmit}
        />
      </Route>
      <ProjectsWrapper>
        {items.map(item => (
          <ProjectCard 
            key={item._id} 
            item={item} 
          />
        ))}
      </ProjectsWrapper>
    </Section>
  )
}

export default ProjectsSection 