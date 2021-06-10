import React from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
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

const UserInfoContainer = ({ info }) => {
  return (
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
  )
}

export default UserInfoContainer