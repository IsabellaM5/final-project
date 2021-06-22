import React from 'react' 
import { useSelector } from 'react-redux'

import InputField from 'components/reusable/InputField'

const PasswordInput = ({ password, setPassword, width, helpText, signUp }) => {
  const err = useSelector(store => store.user.errors)

  return (
    <InputField 
      id="input-password"
      label="Password"
      type="password" 
      value={password} 
      handleChange={setPassword}
      width={width < 768 && '100%'} 
      error={err || signUp & password.length < 6 & password.length !== 0}
      helperText={err && helpText ? helpText :
        err || err & password.length !== 0 & !helpText ? 'This field is required' :
        err & password.length < 6 || password.length < 6 & password.length !== 0 & !helpText ? 'Must be at least 6 characters' : ''
      } 
    />
  )
}

export default PasswordInput