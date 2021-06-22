import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  inputField: {
    width: props => props.width,
    margin: props => props.margin ? props.margin : '0 0 20px 0',
    '& textarea': {
      height: props => props.height ? props.height + `!important` : '90px !important'
    }
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
      error={props.error}
      helperText={props.helperText}
      autoComplete={props.autoComplete}
    />
  )
}

export default InputField