import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch, batch } from 'react-redux'

import { API_URL, SINGLE_USER } from 'reusable/urls'

import user from 'reducers/user'

import InputField from 'components/reusable/InputField'
import Button from 'components/reusable/Button'

const EditProfileForm = styled.form`
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
`

const ButtonsContainer = styled.div`
  grid-column: 1 / 3;
  display: flex;
  justify-content: flex-end;
`

const EditProfile = ({ setEditMode }) => {
  const accessToken = useSelector(store => store.user.info.accessToken)
  const info = useSelector(store => store.user.info)

  const [name, setName] = useState(info.name)
  const [role, setRole] = useState(info.role)
  const [bio, setBio] = useState(info.bio)

  const dispatch = useDispatch()

  const handleFormSubmit = () => {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ name, role, bio })
    }

    fetch(API_URL(SINGLE_USER(info.userID)), config)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {           
            dispatch(user.actions.editUser(data))
            setEditMode(false)

            localStorage.setItem('user', JSON.stringify({
              name: data.name,
              role: data.role,
              bio: data.bio
            }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
  }

  return (
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
          type="text" 
          multiline={true}
          value={bio}
          handleChange={setBio} 
        />
      </SubContainer>
      <ButtonsContainer>
        <Button 
          btnText="ADD"
          handleClick={handleFormSubmit}
        />
        <Button
          btnText="CANCEL"
          handleClick={() => setEditMode(false)}
      />            
      </ButtonsContainer>
    </EditProfileForm>
  )
}

export default EditProfile