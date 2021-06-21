import React, { useRef } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL, EDIT_AVATAR } from 'reusable/urls'

import user from 'reducers/user'

const EditAvatarForm = styled.form`

`

const ImageInput = styled.input`

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
        console.log(data)
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
      <ImageInput 
        type="file"
        ref={fileInput}
        onChange={handleInputChange}
      />
    </EditAvatarForm>
  )
}

export default EditAvatar