import React from 'react'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

import WindowDimensions from 'components/misc/WindowDimensions'

const useStyles = makeStyles(() => ({
  backdropModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backdropModalMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const ModalContainer = ({ component, editMode, setEditMode }) => {
  const classes = useStyles()

  const { width } = WindowDimensions()

  return (
    <Modal
      open={editMode}
      onBackdropClick={() => setEditMode(false)}
      className={width > 767 ? classes.backdropModal : classes.backdropModalMobile}
    >
      {component}
    </Modal>
  )
}

export default ModalContainer