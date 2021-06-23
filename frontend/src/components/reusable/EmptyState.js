import React from "react"
import styled from 'styled-components/macro'
import { BsFillInboxFill } from "react-icons/bs"

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const EmptyStateParagraph = styled.p`
  font-size: 2.0em;
  color: #303960;
  text-align: center;
  padding: 0 60px;
`

const EmptyState = ({ icon, text }) => {
  return (
    <EmptyStateContainer>
      {icon}
      <EmptyStateParagraph>{text}</EmptyStateParagraph>
    </EmptyStateContainer>
  )
}

export default EmptyState
