import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router'
import { Route, Link } from 'react-router-dom'

import user from 'reducers/user'

import ProjectsSection from 'components/ProjectsSection'
import TasksSection from 'components/TasksSection'

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
`

const NavbarContainer = styled.aside`
  background: #f2eff6;
  width: 15%;
  height: 100%;
  border-radius: 25px 0px 0px 25px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const UserInfoContainer = styled.div`
  
`

const Avatar = styled.img`
  border-radius: 50%;
  overflow: none;
`

const Username = styled.p`
  font-size: 1.6em;
`


const NavBar = styled.nav`

`

const ListParent = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`

const ListItem = styled(Link)`
  font-size: 1.6em;
  text-decoration: none;
  margin-bottom: 5px;
`

const SignOutButton = styled.button`
  margin-top: auto;
  width: 75%;
  padding: 5px;
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #ffffff;

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }

`

const AuthenticatedPage = () => {
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
        <NavbarContainer>
          <UserInfoContainer>
            <Avatar src="https://via.placeholder.com/100"/>
            <Username>Name</Username>
          </UserInfoContainer>
          <NavBar>
            <ListParent>
              <ListItem to="/authenticated/profile">Profile</ListItem>
              <ListItem to="/authenticated/projects">Overview</ListItem>
              <ListItem to="/authenticated/projects">New Project</ListItem>
            </ListParent>
          </NavBar>
          <SignOutButton onClick={handleSignOut}>SIGN OUT</SignOutButton>
        </NavbarContainer>
        <Route exact path="/authenticated/projects">
          <ProjectsSection />
        </Route>
        <Route path="/authenticated/projects/:projectID/tasks">
          <TasksSection />
        </Route>
      </ContentWrapper>
    </MainContainer>
  )
}

export default AuthenticatedPage