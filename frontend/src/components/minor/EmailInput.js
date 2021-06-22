import React from 'react' 
import { useSelector } from 'react-redux'

import InputField from 'components/reusable/InputField'

const EmailInput = ({ email, setEmail, width }) => {
  const err = useSelector(store => store.user.errors)

  return (
    <InputField 
      id="input-email"
      label="Email"
      type="text" 
      value={email} 
      handleChange={setEmail}
      width={width < 768 && '100%'}
      error={err}
      helperText={err && email.length !== 0 ? 'This field is required' : ''} 
      autoComplete="off"
    />
  )
}

export default EmailInput