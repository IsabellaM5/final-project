import React from 'react'
import styled from 'styled-components/macro'

const Btn = styled.button`
  margin: 5px 0;
  padding: ${props => props.padding ? props.padding : '5px 10px'};
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #ffffff;
  width: ${props => props.width};

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }
`

const Button = ({ btnText, handleClick, disabled, width, padding }) => {
  return (
    <Btn 
      type="button" 
      onClick={handleClick}
      disabled={disabled}
      width={width}
      padding={padding}
    >
      {btnText}
    </Btn>
  )
}

export default Button