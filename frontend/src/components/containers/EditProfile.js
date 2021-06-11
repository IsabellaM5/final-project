import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Link, useParams } from 'react-router-dom'

import { API_URL, SINGLE_TASK_URL } from 'reusable/urls'

import tasks from 'reducers/tasks'

import InputField from 'components/reusable/InputField'

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

const EditProfileForm = styled.form`
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

const EditProfile = () => {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')

  const info = useSelector(store => store.user.info)

  const accessToken = useSelector(store => store.user.info.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  // const handleFormSubmit = () => {
  //   const config = {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': accessToken
  //     },
  //     body: JSON.stringify({ name: editName, description: taskDesc, comments: taskComments })
  //   }

  //   fetch(API_URL(SINGLE_TASK_URL(projectID, itemID)), config)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       if (data.success) {
  //         dispatch(tasks.actions.editTask(data))
  //         history.push(`/authenticated/${projectID}/tasks`)
  //       } else {
  //         dispatch(tasks.actions.setErrors(data))
  //       }
  //     })
  // }

  return (
    <ModalContainer>
      <ModalSubContainer>
        <EditProfileForm>
          <SubContainer>
            <InputField 
              id="input-name"
              label="Name"
              type="text" 
              value={name}
              handleChange={setName} 
            />
            <InputField 
              id="input-role"
              label="Role"
              type="text" 
              value={role}
              handleChange={setRole} 
            />
            <InputField 
              id="input-bio"
              label="Bio"
              type="textarea" 
              multiline={true}
              value={bio}
              handleChange={setBio} 
            />
          </SubContainer>
        </EditProfileForm>
      </ModalSubContainer>
    </ModalContainer>
  )
}

export default EditProfile