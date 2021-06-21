import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, batch, useDispatch } from 'react-redux'

import { API_URL, SINGLE_PROJECT } from 'reusable/urls'

import projects from 'reducers/projects'

import InputField from 'components/reusable/InputField'
import SearchField from 'components/reusable/SearchField'
import Button from 'components/reusable/Button'

const FormWrapper = styled.div`
  width: 50%;

  @media (max-width: 767px) {
    width: 90%;
  }
`

const ProjectForm = styled.form`
  width: 100%;
  background: #ffffff;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 
    "project search"
    "desc collabs"
    ". buttons";
  grid-gap: 20px;
  padding: 40px;
  border-radius: 20px;

  &:focus {
    outline: none;
  }

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const NameContainer = styled.div`
  grid-area: project;
  width: 100%;
`

const DescContainer = styled.div`
  grid-area: desc;
  width: 100%;
`

const ButtonsContainer = styled.div`
  align-self: end;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-area: buttons;
`

const EditProject = ({ projectID, setEditMode }) => {
  const project = useSelector(store => store.projects.activeProject)
  const accessToken = useSelector(store => store.user.info.accessToken)

  const dispatch = useDispatch()

  const [projectName, setProjectName] = useState(project.name)
  const [projectDesc, setProjectDesc] = useState(project.description)
  const [projectCollabs, setProjectCollabs] = useState(project.collaborators)

  const handleFormSubmit = () => {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ name: projectName, description: projectDesc })
    }

    fetch(API_URL(SINGLE_PROJECT(projectID)), config)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {           
            dispatch(projects.actions.setActiveProject(data))
            setEditMode(false)
          })
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }

  const handleInputChange = (v, endpoint) => {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ collaborators: [v] })
    }

    fetch(API_URL(endpoint(projectID)), config)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(projects.actions.setActiveProject(data))
          setProjectCollabs(data.collaborators)
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }

  return (
    <FormWrapper>
      <ProjectForm>
        <NameContainer>
          <InputField 
            id="input-project-name"
            label="Project name"
            type="text" 
            value={projectName} 
            handleChange={setProjectName} 
            width="100%"
          />
        </NameContainer>
        <DescContainer>
          <InputField
            id="input-project-description"
            label="Description"
            type="text"
            value={projectDesc} 
            multiline={true}
            handleChange={setProjectDesc} 
            width="100%"
          />
        </DescContainer>
        <SearchField 
          selectedCollaborators={projectCollabs}
          setSelectedCollaborators={setProjectCollabs}
          onInputChange={handleInputChange}
          onDeleteCollaborator={handleInputChange}
        />
        <ButtonsContainer>
          <Button 
            btnText="SAVE"
            handleClick={handleFormSubmit}
          />
          <Button 
            btnText="CANCEL"
            handleClick={() => setEditMode(false)}
          />
        </ButtonsContainer>
      </ProjectForm>
    </FormWrapper>
  )
}

export default EditProject