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
    bottom: ${props => props.bottom};
    left: ${props => props.left};
    z-index: ${props => props.zIndex};
    
    &:hover {
      background: #EEE6E6;
    }
  `

const Icon = ({ icon, handleIconClick, apiMethod, position, top, right, bottom, left, zIndex, ariaLabel }) => {
  return (
    <IconButton 
      type="button"
      onClick={() => handleIconClick(apiMethod)}
      position={position}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      zIndex={zIndex}
      aria-label={ariaLabel}
    >
      {icon}
    </IconButton>
  )
}

export default Icon