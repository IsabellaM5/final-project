import React from 'react' 
import { useSelector } from 'react-redux'

import InputField from 'components/reusable/InputField'

const RepeatPasswordInput = ({ password, repeatPassword, setRepeatPassword, width }) => {
  const err = useSelector(store => store.user.errors)

  return (
    <InputField 
      id="input-repeat-password"
      label="Repeat password"
      type="password" 
      value={repeatPassword} 
      handleChange={setRepeatPassword}
      width={width < 768 && '100%'} 
      error={err || repeatPassword !== password & repeatPassword.length !== 0}
      helperText={
        err || err & repeatPassword.length !== 0 ? 'This field is required' :
        err || repeatPassword !== password & repeatPassword.length !== 0 ? 'Passwords does not match' : ''
      } 
      autoComplete="off"
    />
  )
}

export default RepeatPasswordInput