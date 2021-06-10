import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import user from 'reducers/user'

const Container = styled.aside`
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
  color: #000000;

  &:hover {
    color: #cccccc;
  }
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

const NavbarContainer = ({ onSignOut }) => {
  const info = useSelector(store => store.user.info)

  return (
    <Container>
      <UserInfoContainer>
        <Avatar src="https://via.placeholder.com/100"/>
        <Username>{info.username}</Username>
      </UserInfoContainer>
      <NavBar>
        <ListParent>
          <ListItem to="/authenticated/profile">Profile</ListItem>
          <ListItem to="/authenticated/projects">Overview</ListItem>
          <ListItem to="/authenticated/projects">New Project</ListItem>
        </ListParent>
      </NavBar>
      <SignOutButton onClick={onSignOut}>SIGN OUT</SignOutButton>
    </Container>
  )
}

export default NavbarContainer