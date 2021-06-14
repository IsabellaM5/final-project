import React from 'react'
import styled from 'styled-components/macro'

const Btn = styled.button`
  /* width: 75%; */
  margin: 5px 0;
  padding: 5px 10px;
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #ffffff;

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }
`

const Button = ({ btnText, handleClick, disabled }) => {
  return (
    <Btn 
      type="button" 
      onClick={handleClick}
      disabled={disabled}
    >
      {btnText}
    </Btn>
  )
}

export default Button