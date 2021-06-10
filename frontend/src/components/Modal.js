import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import SearchField from 'components/SearchField'

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
`

const NewProjectForm = styled.form`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 20px;
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

const Textarea = styled.textarea`
  margin-bottom: 10px;
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  resize: none;
  height: 70px;
`

const ButtonsContainer = styled.div`
  grid-column: 1 / 3;
  display: flex;
  justify-content: flex-end;
`

const CreateProjectButton = styled.button`
  padding: 5px;
  width: 50px;
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

const Modal = ({ projectName, setProjectName, description, setDescription, selectedCollaborators, setSelectedCollaborators, handleFormSubmit }) => {
  return (
    <ModalContainer>
      <ModalSubContainer>
        <NewProjectForm>
          <SubContainer>
            <Label htmlFor="input-project-name">Project name</Label>
            <InputField 
              id="input-project-name"
              type="text" 
              value={projectName} 
              onChange={(e) => setProjectName(e.target.value)} 
            />
            <Label htmlFor="input-project-description">Description</Label>
            <Textarea 
              id="input-project-description"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </SubContainer>
          <SearchField 
            selectedCollaborators={selectedCollaborators}
            setSelectedCollaborators={setSelectedCollaborators}
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