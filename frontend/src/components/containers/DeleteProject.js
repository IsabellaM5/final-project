import React from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL, SINGLE_PROJECT } from 'reusable/urls'

import projects from 'reducers/projects'

const DeleteProjectButton = styled.button`

`

const DeleteProject = ({ projectID }) => {
  const accessToken = useSelector(store => store.user.info.accessToken)
  const dispatch = useDispatch()

  const handleDeleteProject = () => {
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    fetch(API_URL(SINGLE_PROJECT(projectID)), config)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(projects.actions.deleteProject(data))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }
  return (
    <DeleteProjectButton 
      type="button" 
      onClick={handleDeleteProject}
    >
      DELETE PROJECT
    </DeleteProjectButton>
  )
}

export default DeleteProject