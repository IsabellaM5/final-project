import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import Button from 'components/reusable/Button'
import NavUserInfo from 'components/navigation/NavUserInfo'

const Container = styled.aside`
  background: #f2eff6;
  width: 15%;
  height: 100%;
  border-radius: 25px 0px 0px 25px;
  display: flex;
  flex-direction: column;
  padding: 20px;
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
  return (
    <Container>
      <NavUserInfo />
      <NavBar>
        <ListParent>
          <ListItem to="/authenticated/profile">Profile</ListItem>
          <ListItem to="/authenticated/projects">Overview</ListItem>
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