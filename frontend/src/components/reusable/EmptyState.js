import React from "react"
import styled from 'styled-components/macro'

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => props.height ? props.height : '100%'};
`

const EmptyStateParagraph = styled.p`
  font-size: ${props => props.fontSize ? props.fontSize : '2.0em'};
  color: #303960;
  text-align: center;
  padding: 0 60px;
`

const EmptyState = ({ icon, text, height, fontSize }) => {
  return (
    <EmptyStateContainer
      height={height}
    >
      {icon}
      <EmptyStateParagraph
        fontSize={fontSize}
      >
        {text}
      </EmptyStateParagraph>
    </EmptyStateContainer>
  )
}

export default EmptyState
