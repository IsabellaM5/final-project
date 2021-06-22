import React from 'react'
import styled from 'styled-components/macro'

const Btn = styled.button`
  margin: ${props => props.margin ? props.margin : '5px 5px 0 0'};
  padding: ${props => props.padding ? props.padding : '10px 15px'};
  font-family: "Montserrat";
  border-radius: ${props => props.borderRadius ? props.borderRadius : '4px'};
  border: none;
  background: ${props => props.background ? props.background : '#9c92ac'};
  color: ${props => props.color ? props.color : '#ffffff'};
  width: ${props => props.width};
  height: ${props => props.height};
  font-weight: ${props => props.fontWeight};

  &:disabled {
    opacity: ${props => props.disabled ? '0.4' : ''};
  }

  &:hover {
    background: ${props => props.backgroundHover ? props.backgroundHover : props.disabled ? '' : '#c3bdcd'};
    cursor: ${props => props.disabled ? '' : 'pointer'};
    color: ${props => props.disabled ? '' : '#000000'};
  }
  `

  const Button = ({ btnText, handleClick, disabled, width, height, padding, background, color, backgroundHover, borderRadius, margin, fontWeight }) => {
    return (
      <Btn 
        type="button" 
        onClick={handleClick}
        disabled={disabled}
        width={width}
        height={height}
        padding={padding}
        background={background}
        color={color}
        backgroundHover={backgroundHover}
        borderRadius={borderRadius}
        margin={margin}
        fontWeight={fontWeight}
      >
        {btnText}
      </Btn>
    )
  }

export default Button