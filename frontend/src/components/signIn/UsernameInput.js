import React, { useEffect, useState } from 'react' 
import { useSelector } from 'react-redux'

import InputField from 'components/reusable/InputField'

const UsernameInput = ({ username, setUsername, width, signUp }) => {
  const err = useSelector(store => store.user.errors)
  
  const [helpText, setHelpText] = useState('')

  useEffect(()=> {
    const handleHelperText = () => {
      if (username.length < 3 && username.length > 0 && signUp) {
        setHelpText('Must be at least 3 characters')
      } else if (username.length > 15 && signUp) {
        setHelpText('Cannot be longer than 15 characters')
      } else {
        setHelpText('')
      }
    }

    handleHelperText()
  }, [username, signUp])

  return (
    <InputField 
      id="input-username"
      label="Username"
      type="text" 
      value={username}
      handleChange={setUsername}
      width={width < 768 && '100%'}
      error={err || signUp & username.length < 3 & username.length !== 0 || signUp & username.length > 15}
      helperText={helpText} 
    />
  )
}

export default UsernameInput