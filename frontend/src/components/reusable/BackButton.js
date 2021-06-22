import React from 'react'
import { useHistory } from 'react-router-dom'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import Icon from 'components/minor/Icon'

const BackButton = ({ path }) => {
  const history = useHistory()

  const handleButtonClick = (path) => {
    history.push(path)
  } 

  return (
    <Icon
      icon={
        <KeyboardBackspaceIcon 
          fontSize="large"  
        />
      } 
      handleIconClick={handleButtonClick}
      apiMethod={path}
      position="fixed"
      zIndex="1"
    />
  )
}

export default BackButton