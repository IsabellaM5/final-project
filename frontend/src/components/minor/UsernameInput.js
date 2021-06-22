import React from 'react' 
import { useSelector } from 'react-redux'

import InputField from 'components/reusable/InputField'

const UsernameInput = ({ username, setUsername, width, helpText, signUp }) => {
  const err = useSelector(store => store.user.errors)

  return (
    <InputField 
      id="input-username"
      label="Username"
      type="text" 
      value={username}
      handleChange={setUsername}
      width={width < 768 && '100%'}
      error={err || signUp & username.length < 3 & username.length !== 0 || signUp & username.length > 15}
      helperText={err && helpText ? helpText :
        err || err & username.length !== 0 & !helpText ? 'This field is required' :
        err & username.length < 3 || username.length < 3 & username.length !== 0 & !helpText ? 'Must be at least 3 characters' :
        err & username.length > 15 || username.length > 15 & !helpText ? 'Cannot be longer than 15 characters' : ''
      } 
      autoComplete="off"
    />
  )
}

export default UsernameInput