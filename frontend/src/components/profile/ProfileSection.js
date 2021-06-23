import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch, batch } from 'react-redux'

import { API_URL, PROJECTS_URL, SINGLE_USER } from 'reusable/urls'

import user from 'reducers/user'
import projects from 'reducers/projects'

import BackButton from 'components/navigation/BackButton'
import UserInfoContainer from 'components/profile/UserInfoContainer'
import ProjectsCollabsContainer from 'components/profile/ProjectsCollabsContainer'
import ModalContainer from 'components/reusable/ModalContainer'
import EditProfile from 'components/profile/EditProfile'
import Button from 'components/reusable/Button'

const Section = styled.section`
  width: 85%;
  padding: 50px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1023px) {
    width: 100%;
    padding: 25px;
  }
`

const ProfileWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  row-gap: 20px;
  padding: 0px 10px;
  max-height: 80%;
  overflow-y: auto;
  margin-top: 20px;
  
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f3f3;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #dfdbe5;
    border-radius: 5px;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-gap: 15px;
    max-height: 90%;
  }
`

const ButtonContainer = styled.div`
  align-self: flex-end;

  @media (max-width: 767px) {
    align-self: flex-start;
  }
`

const ProfileSection = () => {
  const totalProjects = useSelector(store => store.projects.items)
  const info = useSelector(store => store.user.info)

  const [editMode, setEditMode] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': info.accessToken
      }
    }

    Promise.all([
      fetch(API_URL(SINGLE_USER(info.userID)), options),
      fetch(API_URL(PROJECTS_URL(info.userID)), options)
    ])
      .then((res) => {
        return Promise.all(res.map(r => r.json()))
      })
      .then((data) => {
        if (data[0].success && data[1].success) {
          batch(() => {
            dispatch(user.actions.setRole(data[0].role))
            dispatch(user.actions.setName(data[0].name))
            dispatch(user.actions.setBio(data[0].bio))
            dispatch(projects.actions.setProjects(data[1].altProjects))
          })
        } else {
          dispatch(user.actions.setErrors(data))
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [info.accessToken, dispatch, info.userID])

  return (
    <Section>
      <BackButton 
        path={'/authenticated/projects'}
      />
      <ButtonContainer>
        <Button 
          btnText="EDIT PROFILE"
          handleClick={() => setEditMode(true)}
        />
      </ButtonContainer>
      <ProfileWrapper>
        <UserInfoContainer 
          info={info}
        />
        <ProjectsCollabsContainer
          info={info}
          totalProjects={totalProjects}
        />
      </ProfileWrapper>
      <ModalContainer 
        editMode={editMode}
        setEditMode={setEditMode}
        component={
          <EditProfile 
            setEditMode={setEditMode}
          />
        }
      />
    </Section>
  )
}

export default ProfileSection