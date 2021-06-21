import React from 'react'
import styled from 'styled-components/macro'

import EditAvatar from 'components/forms/EditAvatar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`

const ImageUserContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 
    "img ."
    "input ."
    "text .";

  @media (max-width: 767px) {
    grid-template-areas: 
    "text img"
    ". input";

    width: 100%;
  }
`

const Avatar = styled.img`
  border-radius: 50%;
  overflow: none;
  align-self: center;
  height: 150px;
  width: 150px;
  grid-area: img;

  @media (max-width: 767px) {
    order: 2;
    height: 90px;
    width: 90px;
    justify-self: end;
  }
`

const Wrapper = styled.div`
  margin: 10px 0;
  grid-area: text;
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
        <Avatar src={info.image}/>
        <EditAvatar />
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
    </Container>
  )
}

export default UserInfoContainer