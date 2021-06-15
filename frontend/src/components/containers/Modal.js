import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { API_URL, PROJECTS_URL } from 'reusable/urls'

import projects from 'reducers/projects'

import InputField from 'components/reusable/InputField'
import SearchField from 'components/reusable/SearchField'

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

const ModalSubContainer = styled.div`
  background: #ffffff;
  width: 50%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
`

const NewProjectForm = styled.form`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 20px;
  padding: 40px;
  border-radius: 20px;
  height: 100%;
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

const CreateProjectButton = styled.button`
  padding: 5px;
  width: 50px;
  height: 30px;
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #ffffff;
  margin: 5px;
  font-size: 1.4em;

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }
`

const CancelButton = styled(Link)`
  padding: 5px;
  width: 70px;
  height: 30px;
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #ffffff;
  margin: 5px;
  text-decoration: none;
  text-align: center;
  font-size: 1.4em;

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }
`

const Modal = () => {
  const user = useSelector(store => store.user.info)

  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCollaborators, setSelectedCollaborators] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

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
          history.push('/authenticated/projects')
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
    <ModalContainer>
      <ModalSubContainer>
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
            <CreateProjectButton 
              type="button"
              onClick={handleFormSubmit}
            >
              ADD
            </CreateProjectButton>
            <CancelButton to="/authenticated/projects">CANCEL</CancelButton>
          </ButtonsContainer>
        </NewProjectForm>
      </ModalSubContainer>
    </ModalContainer>
  )
}

export default Modal