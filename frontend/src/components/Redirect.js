import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Redirect = () => {
  const history = useHistory()

  useEffect(() => {
    history.push('/signin')
  }, [history])

  return (
    <>
      HEY
    </>
  )
}

export default Redirect