import React from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`

const ImageUserContainer = styled.div`
  
  @media (max-width: 767px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`

const Avatar = styled.img`
  border-radius: 50%;
  overflow: none;
  align-self: center;

  @media (max-width: 767px) {
    order: 2;
  }
`

const Wrapper = styled.div`
  margin: 10px 0;
`

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: 500;
`

const Info = styled.p`
  font-size: 1.6em;
  margin: 0;
`

const UserInfoContainer = ({ info }) => {
  return (
    <Container>
      <ImageUserContainer>
        <Avatar src="https://via.placeholder.com/90"/>
        <Wrapper>
          <Title>Username</Title>
          <Info>{info.username}</Info>
        </Wrapper>
      </ImageUserContainer>

      <Wrapper>
        <Title>Name</Title>
        <Info>{info.name}</Info>
      </Wrapper>
      <Wrapper>
        <Title>Role</Title>
        <Info>{info.role}</Info>
      </Wrapper>
      <Wrapper>
        <Title>Biography</Title>
        <Info>{info.bio}</Info>
      </Wrapper>
    </Container>
  )
}

export default UserInfoContainer