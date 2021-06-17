import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

const UserInfoContainer = styled.div`
  padding: 16px;
`

const Avatar = styled.img`
  border-radius: 50%;
  overflow: none;
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
      <Avatar src="https://via.placeholder.com/100"/>
      <Username>{info.username}</Username>
      <Email>{info.email}</Email>
    </UserInfoContainer>
  )
}

export default NavUserInfo