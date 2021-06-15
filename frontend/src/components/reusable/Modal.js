import React from 'react'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  backdropModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const ModalContainer = ({ component, editMode, setEditMode }) => {
  const classes = useStyles()

  return (
    <Modal
      open={editMode}
      onBackdropClick={() => setEditMode(false)}
      className={classes.backdropModal}
    >
      {component}
    </Modal>
  )
}

export default ModalContainer