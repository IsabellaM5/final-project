import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch, batch } from 'react-redux'

import { API_URL, PROJECTS_URL, SINGLE_USER } from 'reusable/urls'

import user from 'reducers/user'
import projects from 'reducers/projects'

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`

const TotalProjectsWrapper = styled.div`

`

const Avatar = styled.img`
  border-radius: 50%;
  overflow: none;
`

const Title = styled.h2`
  font-size: 1.8em;
`

const Info = styled.p`
  font-size: 1.6em;
`

const Diagram = styled.img`
  border-radius: 50%;
  overflow: none;
`

const CollaboratorsContainer = styled.div`
  width: 100%;
`

const CollabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Collaborator = styled.p`
  margin-left: 10px;
  font-size: 1.6em;
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
  }, [info.accessToken, dispatch, info.userID])

  return (
    <Section>
      <ProfileWrapper>
        <Container>
          <Avatar src="https://via.placeholder.com/150"/>
          <Title>Username</Title>
          <Info>{info.username}</Info>
          <Title>Name</Title>
          <Info>{info.name}</Info>
          <Title>Role</Title>
          <Info>{info.role}</Info>
          <Title>Biography</Title>
          <Info>{info.bio}</Info>
        </Container>
        <Container>
          <TotalProjectsWrapper>
            <Title>Total projects ongoing: {totalProjects.length}</Title>
            <Diagram src="https://via.placeholder.com/200"/>
          </TotalProjectsWrapper>
          <CollaboratorsContainer>
            <Title>Collaborators</Title>
            <CollabContainer>
              <Avatar src="https://via.placeholder.com/40"/>
              <Collaborator>Name</Collaborator>
            </CollabContainer>
          </CollaboratorsContainer>
        </Container>
      </ProfileWrapper>
    </Section>
  )
}

export default ProfileSection