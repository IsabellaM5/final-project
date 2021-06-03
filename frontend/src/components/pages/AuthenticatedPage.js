import React from 'react'
import styled from 'styled-components/macro'

const MainContainer = styled.div`
  height: 100vh;
  background: #dfdbe5;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Section = styled.section`
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
  width: 200px;
  height: 100%;
  border-radius: 25px 0px 0px 25px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`

const UserInfoContainer = styled.div`
  
`

const Avatar = styled.img`
  border-radius: 50%;
  overflow: none;
`

const Username = styled.p`

`


const NavBar = styled.nav`

`

const ListParent = styled.ul`
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`

`

const SignOutButton = styled.button`
  margin-top: auto;
  width: 75%;
`


const AuthenticatedPage = () => {
  return (
    <MainContainer>
      <Section>
        <NavbarContainer>
          <UserInfoContainer>
            <Avatar src="https://via.placeholder.com/100"/>
            <Username>Name</Username>
          </UserInfoContainer>
          <NavBar>
            <ListParent>
              <ListItem>Profile</ListItem>
              <ListItem>Overview</ListItem>
              <ListItem>New Project</ListItem>
            </ListParent>
          </NavBar>
          <SignOutButton>SIGN OUT</SignOutButton>
        </NavbarContainer>
      </Section>
    </MainContainer>
  )
}

export default AuthenticatedPage