import React, { useState, useEffect } from 'react' 
import { useSelector } from 'react-redux'

import InputField from 'components/reusable/InputField'

const PasswordInput = ({ password, setPassword, width, signUp }) => {
  const err = useSelector(store => store.user.errors)

  const [helpText, setHelpText] = useState('')

  useEffect(()=> {
    const handleHelperText = () => {
      if (password.length < 6 && password.length > 0 && signUp) {
        setHelpText('Must be at least 6 characters')
      } else {
        setHelpText('')
      }
    }

    handleHelperText()
  }, [password, signUp])

  return (
    <InputField 
      id="input-password"
      label="Password"
      type="password" 
      value={password} 
      handleChange={setPassword}
      width={width < 768 && '100%'} 
      error={err || signUp & password.length < 6 & password.length !== 0}
      helperText={helpText} 
    />
  )
}

export default PasswordInput