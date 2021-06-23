import React, { useState, useEffect } from 'react' 
import { useSelector } from 'react-redux'

import InputField from 'components/reusable/InputField'

const ProjectNameInput = ({ projectName, setProjectName }) => {
  const err = useSelector(store => store.user.errors)

  const [helpText, setHelpText] = useState('')

  useEffect(()=> {
    const handleHelperText = () => {
      if (err & projectName.length === 0 || projectName.length === 0) {
        setHelpText('This field is required')
      } else if (projectName.length > 20) {
        setHelpText('Cannot be longer than 20 characters')
      } else {
        setHelpText('')
      }
    }

    handleHelperText()
  }, [projectName, err])

  return (
    <InputField 
      id="input-project-name"
      label="Project name"
      type="text" 
      value={projectName} 
      handleChange={setProjectName} 
      width="100%"
      error={err || projectName.length > 20}
      helperText={helpText}
    />
  )
}

export default ProjectNameInput