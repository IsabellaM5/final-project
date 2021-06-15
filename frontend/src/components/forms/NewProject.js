import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { API_URL, PROJECTS_URL } from 'reusable/urls'

import projects from 'reducers/projects'

import Button from 'components/reusable/Button'
import InputField from 'components/reusable/InputField'
import SearchField from 'components/reusable/SearchField'

const NewProjectForm = styled.form`
  width: 50%;
  background: #ffffff;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 20px;
  padding: 40px;
  border-radius: 20px;

  &:focus {
    outline: none;
  }
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`

const ButtonsContainer = styled.div`
  grid-column: 1 / 3;
  align-self: end;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
    <NewProjectForm>
      <SubContainer>
        <InputField 
          id="input-project-name"
          label="Project name"
          type="text" 
          value={projectName} 
          handleChange={setProjectName} 
        />
        <InputField
          id="input-project-description"
          label="Description"
          type="text"
          value={description} 
          multiline={true}
          handleChange={setDescription} 
        />
      </SubContainer>
      <SearchField 
        selectedCollaborators={selectedCollaborators}
        setSelectedCollaborators={setSelectedCollaborators}
        onDeleteCollaborator={removeCollabs}
      />
      <ButtonsContainer>
        <Button 
          btnText="ADD"
          handleClick={handleFormSubmit}
        />
        <Button 
          btnText="CANCEL"
          handleClick={() => setNewItemMode(false)}
        />
      </ButtonsContainer>
    </NewProjectForm>
  )
}

export default NewProject