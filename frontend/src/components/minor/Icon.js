import React from 'react'
import styled from 'styled-components'

const IconButton = styled.button`
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    padding: 5px;
    position: ${props => props.position};
    top: ${props => props.top};
    right: ${props => props.right};
    
    &:hover {
      background: #EEE6E6;
    }
  `

const Icon = ({ icon, handleIconClick, apiMethod, position, top, right }) => {
  return (
    <IconButton 
      type="button"
      onClick={() => handleIconClick(apiMethod)}
      position={position}
      top={top}
      right={right}
    >
      {icon}
    </IconButton>
  )
}

export default Icon