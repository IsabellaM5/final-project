import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch, batch } from 'react-redux'

import { API_URL, PROJECTS_URL, SINGLE_USER } from 'reusable/urls'

import user from 'reducers/user'
import projects from 'reducers/projects'

import UserInfoContainer from 'components/containers/UserInfoContainer'
import ProjectsCollabsContainer from 'components/containers/ProjectsCollabsContainer'

const Section = styled.section`
  width: 85%;
  padding: 50px;
`

const ProfileWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
  padding: 0px 10px;
`

const ProfileSection = () => {
  const info = useSelector(store => store.user.info)
  const totalProjects = useSelector(store => store.projects.items)

  const dispatch = useDispatch()

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': info.accessToken
      }
    }

    fetch(API_URL(SINGLE_USER(info.userID)), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setRole(data.singleUser.role))
            dispatch(user.actions.setName(data.singleUser.name))
            dispatch(user.actions.setBio(data.singleUser.bio))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })

    fetch(API_URL(PROJECTS_URL(info.userID)), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(projects.actions.setProjects(data))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [info.accessToken, dispatch, info.userID])

  return (
    <Section>
      <ProfileWrapper>
        <UserInfoContainer 
          info={info}
        />
        <ProjectsCollabsContainer
          totalProjects={totalProjects}
        />
      </ProfileWrapper>
    </Section>
  )
}

export default ProfileSection