import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from 'components/reusable/Button'

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

const ButtonContainer = styled.div`
  margin-top: auto;
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
          <ListItem to="/authenticated/projects/new">New Project</ListItem>
        </ListParent>
      </NavBar>
      <ButtonContainer>
        <Button
          handleClick={onSignOut} 
          btnText="SIGN OUT"
        />
      </ButtonContainer>
    </Container>
  )
}

export default NavbarContainer