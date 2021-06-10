import React from 'react'
import TextField from '@material-ui/core/TextField'

const InputField = ({ id, label, type, multiline, value, handleChange }) => {

  return (
    <TextField 
      id={id}
      label={label}
      type={type}
      multiline={multiline}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      variant="outlined" 
    />
  )
}

export default InputField