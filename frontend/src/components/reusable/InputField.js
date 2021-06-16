import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  inputField: {
    background: '#ffffff',
    width: (props) => props.width
  }
})

const InputField = (props) => {
  const classes = useStyles(props)

  return (
    <TextField 
      id={props.id}
      label={props.label}
      type={props.type}
      multiline={props.multiline}
      value={props.value}
      onChange={(e) => props.handleChange(e.target.value)}
      variant="outlined" 
      className={classes.inputField}
    />
  )
}

export default InputField