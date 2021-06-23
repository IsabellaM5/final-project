import React, { useState, useEffect } from 'react' 
import { useSelector } from 'react-redux'

import InputField from 'components/reusable/InputField'

const RepeatPasswordInput = ({ password, repeatPassword, setRepeatPassword, width, signUp }) => {
  const err = useSelector(store => store.user.errors)

  const [helpText, setHelpText] = useState('')

  useEffect(()=> {
    const handleHelperText = () => {
      if (repeatPassword.length > 0 && signUp) {
        setHelpText('This field is required')
      } else if (repeatPassword !== password && repeatPassword.length !== 0) {
        setHelpText('Passwords does not match')
      } else {
        setHelpText('')
      }
    }

    handleHelperText()
    console.log('useEffect')
  }, [repeatPassword, password, signUp])

  return (
    <InputField 
      id="input-repeat-password"
      label="Repeat password"
      type="password" 
      value={repeatPassword} 
      handleChange={setRepeatPassword}
      width={width < 768 && '100%'} 
      error={err || repeatPassword !== password & repeatPassword.length !== 0}
      helperText={helpText} 
    />
  )
}

export default RepeatPasswordInput