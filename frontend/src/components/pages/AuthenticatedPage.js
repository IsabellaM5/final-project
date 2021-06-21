import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router'
import { Route } from 'react-router-dom'

import user from 'reducers/user'

import NavbarContainer from 'components/containers/NavbarContainer'
import ProfileSection from 'components/sections/ProfileSection'
import ProjectsSection from 'components/sections/ProjectsSection'
import TasksSection from 'components/sections/TasksSection'
import WindowDimensions from 'components/WindowDimensions'
import NavDrawer from 'components/containers/NavDrawer'

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
  box-shadow: 0px 10px 10px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  
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