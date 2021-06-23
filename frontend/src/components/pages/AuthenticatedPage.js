import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router'
import { Route } from 'react-router-dom'

import user from 'reducers/user'

import NavbarContainer from 'components/navigation/NavbarContainer'
import ProfileSection from 'components/profile/ProfileSection'
import ProjectsSection from 'components/projects/ProjectsSection'
import TasksSection from 'components/tasks/TasksSection'
import WindowDimensions from 'components/misc/WindowDimensions'
import NavDrawer from 'components/navigation/NavDrawer'

const MainContainer = styled.div`
  height: 100vh;
  background: #dfdbe5;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContentWrapper = styled.div`
  height: 85%;
  width: 85%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 25px;
  box-shadow: 7px 7px 20px 0px rgb(0 0 0 / 20%); 

  @media (max-width: 1439px) {
    width: 95%;
  }

  @media (max-width: 1023px) {
    width: 85%;
  }
  
  @media (max-width: 767px) {
    width: 95%;
    min-height: 95vh;
  }
`

const AuthenticatedPage = () => {
  const { width } = WindowDimensions()

  const dispatch = useDispatch()
  const history = useHistory()

  const accessToken = useSelector(store => store.user.info.accessToken)

  useEffect(() => {
    if (!accessToken) {
      history.push('/signin')
    }
  })

  const handleSignOut = () => {
    batch(() => {
      dispatch(user.actions.setSignOut())
      localStorage.removeItem('user')
      localStorage.removeItem('project')
    })
  }

  return (
    <MainContainer>
      <ContentWrapper>
        {width > 1023 ?
          <NavbarContainer
            onSignOut={handleSignOut}
          />
        :
          <NavDrawer 
            onSignOut={handleSignOut}
          />
        }
        <Route path="/authenticated/profile">
          <ProfileSection />
        </Route>
        <Route path="/authenticated/projects">
          <ProjectsSection />
        </Route>
        <Route path="/authenticated/:projectID/tasks">
          <TasksSection />
        </Route>
      </ContentWrapper>
    </MainContainer>
  )
}

export default AuthenticatedPage