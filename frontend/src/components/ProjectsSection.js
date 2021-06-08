import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Link, useHistory } from 'react-router-dom'

import { API_URL, PROJECTS_URL } from 'reusable/urls'

import projects from 'reducers/projects'

import ProjectCard from 'components/ProjectCard'
import Modal from 'components/Modal'

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

const AddProjectButton = styled(Link)`
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

const ProjectsSection = () => {
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [collaborators, setCollaborators] = useState('')
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
          dispatch(projects.actions.setProjects(data))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch, userID])

  // const handleCollaboratorsInput = (e) => {
  //   setCollaborators(e.target.value)

  //   collaboratorsArray = collaborators.split(', ')
  //   console.log(collaboratorsArray)
  // }

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
          dispatch(projects.actions.setNewProject(data))
          history.push('/authenticated/projects')
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }

  return (
    <Section>
      <AddProjectButton to="/authenticated/projects/new">+ ADD</AddProjectButton>
      <Route path="/authenticated/projects/new">
        <Modal
          projectName={projectName}
          setProjectName={setProjectName}
          description={description}
          setDescription={setDescription}
          collaborators={collaborators}
          setCollaborators={setCollaborators}
          // handleCollaboratorsInput={handleCollaboratorsInput}
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