import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Link, useHistory } from 'react-router-dom'

import { API_URL, PROJECTS_URL } from 'reusable/urls'

import projects from 'reducers/projects'

import ProjectCard from 'components/ProjectCard'

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
  max-height: 600px;
  overflow-y: scroll;
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

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(000, 000, 000, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const Modal = styled.div`
  background: #ffffff;
  width: 50%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const NewProjectForm = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px;
  border-radius: 20px;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 1.6em;
  margin-bottom: 5px;
`

const InputField = styled.input`
  margin-bottom: 10px;
  border-radius: 4px;
  height: 30px;
  border: none;
  background: #9c92ac;
`

const ButtonsContainer = styled.div`

`

const CreateProjectButton = styled.button`
  padding: 5px;
  width: 50px;
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

const CancelButton = styled(Link)`
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
        console.log(API_URL(PROJECTS_URL(userID)))
        console.log(data)
        if (data.success) {
          dispatch(projects.actions.setProjects(data))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch, userID])

  const handleCollaboratorsInput = (e) => {
    setCollaborators(e.target.value)

    collaboratorsArray = collaborators.split(', ')
    console.log(collaboratorsArray)
  }

  const handleFormSubmit = () => {
      const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ name: projectName, description: description, collaborators: collaboratorsArray })
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
        <ModalContainer>
          <Modal>
            <NewProjectForm>
              <SubContainer>
                <Label htmlFor="input-project-name">Project name</Label>
                <InputField 
                  id="input-project-name"
                  type="text" 
                  value={projectName} 
                  onChange={(e) => setProjectName(e.target.value)} 
                />
                <Label htmlFor="input-description">Description</Label>
                <InputField 
                  id="input-description"
                  type="text" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                />
                <Label htmlFor="input-collaborators">Collaborators</Label>
                <InputField 
                  id="input-collaborators"
                  type="text" 
                  value={collaborators} 
                  onChange={handleCollaboratorsInput} 
                />
              </SubContainer>
              <ButtonsContainer>
                <CreateProjectButton 
                  type="button"
                  onClick={handleFormSubmit}
                >
                  ADD
                </CreateProjectButton>
                <CancelButton to="/authenticated/projects">CANCEL</CancelButton>
              </ButtonsContainer>
            </NewProjectForm>
          </Modal>
        </ModalContainer>
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