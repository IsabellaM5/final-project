import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL, PROJECTS_URL } from 'reusable/urls'

import projects from 'reducers/projects'

import Button from 'components/reusable/Button'
import ProjectNameInput from 'components/projects/ProjectNameInput'
import ProjectDescInput from 'components/projects/ProjectDescInput'
import SearchField from 'components/projects/SearchField'

const FormWrapper = styled.div`
  width: 50%;

  @media (max-width: 1023px) {
    width: 90%;
  }
`

const NewProjectForm = styled.form`
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

const NewProject = ({ setNewItemMode }) => {
  const user = useSelector(store => store.user.info)

  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCollaborators, setSelectedCollaborators] = useState([])

  const dispatch = useDispatch()

  const handleFormSubmit = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.accessToken
      },
      body: JSON.stringify({ name: projectName, description: description, collaborators: selectedCollaborators })
    }

    fetch(API_URL(PROJECTS_URL(user.userID)), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(projects.actions.setNewProject(data.project))
          setNewItemMode(false)
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }

  const removeCollabs = (collab, url) => {
    const filteredCollabs = selectedCollaborators.filter(c => c !== collab)
    setSelectedCollaborators(filteredCollabs)
  }

  return (
    <FormWrapper>
      <NewProjectForm>
        <NameContainer>
          <ProjectNameInput 
            projectName={projectName}
            setProjectName={setProjectName}
          />
        </NameContainer>
        <DescContainer>
          <ProjectDescInput
            projectDesc={description}
            setProjectDesc={setDescription}
          />
        </DescContainer>
        <SearchField 
          selectedCollaborators={selectedCollaborators}
          setSelectedCollaborators={setSelectedCollaborators}
          onDeleteCollaborator={removeCollabs}
        />
        <ButtonsContainer>
          <Button 
            btnText="ADD"
            handleClick={handleFormSubmit}
            disabled={projectName.length === 0 || projectName.length > 20 || description.length > 40 ? true : false}
          />
          <Button 
            btnText="CANCEL"
            handleClick={() => setNewItemMode(false)}
          />
        </ButtonsContainer>
      </NewProjectForm>
    </FormWrapper>
  )
}

export default NewProject