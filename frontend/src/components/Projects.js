import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL, GET_PROJECTS } from 'reusable/urls'

import projects from 'reducers/projects'

const ProjectsWrapper = styled.div`

`

const Projects = () => {
  const userID = useSelector(store => store.user.info.userID)
  const accessToken = useSelector(store => store.user.info.accessToken)

  const dispatch = useDispatch()

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    fetch(API_URL(GET_PROJECTS(userID)), options)
      .then(res => res.json())
      .then(data => {
        console.log(API_URL(GET_PROJECTS(userID)))
        console.log(data)
        if (data.success) {
          dispatch(projects.actions.setProjects(data))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch, userID])

  return (
    <ProjectsWrapper>
      
    </ProjectsWrapper>
  )
}

export default Projects 