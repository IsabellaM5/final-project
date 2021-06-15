import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch, batch } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'

import { API_URL, PROJECTS_URL, SINGLE_USER } from 'reusable/urls'

import user from 'reducers/user'
import projects from 'reducers/projects'

import UserInfoContainer from 'components/containers/UserInfoContainer'
import ProjectsCollabsContainer from 'components/containers/ProjectsCollabsContainer'
import EditProfile from 'components/forms/EditProfile'

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
  const totalProjects = useSelector(store => store.projects.items)

  const info = useSelector(store => store.user.info)

  const dispatch = useDispatch()
  const history = useHistory()

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
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setRole(data.role))
            dispatch(user.actions.setName(data.name))
            dispatch(user.actions.setBio(data.bio))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })

    fetch(API_URL(PROJECTS_URL(info.userID)), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(projects.actions.setProjects(data.altProjects))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [info.accessToken, dispatch, info.userID])

  const handleEditProfile = () => {
    history.push('/authenticated/profile/edit')
  }

  return (
    <Section>
      <ProfileWrapper>
        <UserInfoContainer 
          handleEditProfile={handleEditProfile}
          info={info}
        />
        <ProjectsCollabsContainer
          totalProjects={totalProjects}
        />
      </ProfileWrapper>
      <Route path="/authenticated/profile/edit">
        <EditProfile />
      </Route>
    </Section>
  )
}

export default ProfileSection