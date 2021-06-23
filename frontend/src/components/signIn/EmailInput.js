import React, { useState, useEffect } from 'react' 
import { useSelector } from 'react-redux'

import InputField from 'components/reusable/InputField'

const EmailInput = ({ email, setEmail, width, signUp }) => {
  const err = useSelector(store => store.user.errors)

  const [helpText, setHelpText] = useState('')

  const emailRegex = /\S+@\S+\.\S+/

  useEffect(()=> {
    const handleHelperText = () => {
      if (email.length > 0 && signUp) {
        setHelpText('This field is required')
      } else if (email.length > 0 && !emailRegex.test(email)) {
        setHelpText('Email is invalid')
      } else {
        setHelpText('')
      }
    }

    handleHelperText()
    console.log('useEffect')
  }, [email, signUp, emailRegex])

  return (
    <InputField 
      id="input-email"
      label="Email"
      type="email" 
      value={email} 
      handleChange={setEmail}
      width={width < 768 && '100%'}
      error={err || email.length > 0 & !emailRegex.test(email)}
      helperText={helpText} 
    />
  )
}

export default EmailInput