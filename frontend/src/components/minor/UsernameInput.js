import React, { useEffect, useState } from 'react' 
import { useSelector } from 'react-redux'

import InputField from 'components/reusable/InputField'

const UsernameInput = ({ username, setUsername, width, signUp }) => {
  const err = useSelector(store => store.user.errors)
  
  const [helpText, setHelpText] = useState('')

  const handleHelperText = () => {
    if (username.length < 3 && username.length > 0) {
      setHelpText('Must be at least 3 characters')
    } else if (username.length > 15) {
      setHelpText('Cannot be longer than 15 characters')
    } else {
      setHelpText('')
    }
  }

  useEffect(()=> {
    handleHelperText()
    console.log('useEffect')
  }, [username])

  console.log(helpText)

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

// err && helpText && signUp === true ? helpText 
// :
// err || err & username.length !== 0 & !helpText & signUp === true ? 'This field is required' 
// :
// err & username.length < 3 || username.length < 3 & username.length !== 0 & !helpText & signUp === true ? 'Must be at least 3 characters' 
// :
// err & username.length > 15 || username.length > 15 & !helpText & signUp === true ? 'Cannot be longer than 15 characters' 
// : 
// ''