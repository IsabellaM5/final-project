import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

const UserInfoContainer = styled.div`
  
  @media (max-width: 767px) {
    padding: 16px;
  }
`

const Avatar = styled.img`
  border-radius: 50%;
  overflow: none;
  height: 100px;
  width: 100px;

  @media (max-width: 767px) {
    height: 70px;
    width: 70px;
  }
`

const Username = styled.p`
  font-size: 1.6em;
`

const Email = styled.p`
  font-size: 1.4em;
`


const NavUserInfo = () => {
  const info = useSelector(store => store.user.info)

  return (
    <UserInfoContainer>
      <Avatar src={info.image}/>
      <Username>{info.username}</Username>
      <Email>{info.email}</Email>
    </UserInfoContainer>
  )
}

export default NavUserInfo