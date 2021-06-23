import React, { useRef } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL, EDIT_AVATAR } from 'reusable/urls'

import user from 'reducers/user'

const EditAvatarForm = styled.form`
  grid-area: input;
  justify-self: center;

  @media (max-width: 767px) {
    justify-self: start;
  }
`

const Label = styled.label`
  padding: 10px 15px;
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #000000;
  font-size: 1.4em;
  line-height: 45px;

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
    color: #000000;
  }

  @media (max-width: 767px) {
    line-height: 40px;
  }
`

const ImageInput = styled.input`
  display: none;
`

const EditAvatar = () => {
  const info = useSelector(store => store.user.info)

  const fileInput = useRef()
  const dispatch = useDispatch()

  const handleInputChange = () => {
    const formData = new FormData()
    formData.append('image', fileInput.current.files[0])

    const config = {
      method: 'PATCH',
      headers: {
        'Authorization': info.accessToken
      },
      body: formData 
    }

    fetch(API_URL(EDIT_AVATAR(info.userID)), config)
      .then(res => res.json())
      .then(data => {
        if (data.success) {         
          dispatch(user.actions.editAvatar(data))

          localStorage.setItem('user', JSON.stringify({
            image: data.profileImage.url
          }))
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
  }

  return (
    <EditAvatarForm>
      <Label htmlFor="input-file">UPLOAD IMAGE</Label>
      <ImageInput
        id="input-file" 
        type="file"
        ref={fileInput}
        onChange={handleInputChange}
      />
    </EditAvatarForm>
  )
}

export default EditAvatar