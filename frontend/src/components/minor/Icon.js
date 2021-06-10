import React from 'react'
import styled from 'styled-components'

const Icon = ({ icon, handleIconClick, apiMethod }) => {
  const IconButton = styled.button`
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    padding: 5px;
    
    &:hover {
      background: #EEE6E6;
    }
  `
  
  return (
    <IconButton 
      type="button"
      onClick={() => handleIconClick(apiMethod)}
    >
      {icon}
    </IconButton>
  )
}

export default Icon