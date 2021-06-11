import React from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

import { API_URL, SINGLE_USER } from 'reusable/urls'

import user from 'reducers/user'

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

const ButtonsContainer = styled.div`
  grid-column: 1 / 3;
  display: flex;
  justify-content: flex-end;
`

const SaveButton = styled.button`
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

const EditProfile = ({ info, name, setName, role, setRole, bio, setBio, email, setEmail }) => {
  const accessToken = useSelector(store => store.user.info.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleFormSubmit = () => {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ name, role, bio, email }) // change code here once it's fixed on backend
    }

    fetch(API_URL(SINGLE_USER(info.userID)), config)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          batch(() => {           
            dispatch(user.actions.editUser(data))
            history.push('/authenticated/profile')

            localStorage.setItem('user', JSON.stringify({
              name: data.name,
              role: data.role,
              bio: data.bio,
              email: data.email
            }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
  }

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
              id="input-email"
              label="Email"
              type="email" 
              multiline={true}
              value={email}
              handleChange={setEmail} 
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
          <ButtonsContainer>
            <SaveButton 
              type="button"
              onClick={handleFormSubmit}
            >
              ADD
            </SaveButton>
            <CancelButton to={'/authenticated/profile'}>CANCEL</CancelButton>
          </ButtonsContainer>
        </EditProfileForm>
      </ModalSubContainer>
    </ModalContainer>
  )
}

export default EditProfile