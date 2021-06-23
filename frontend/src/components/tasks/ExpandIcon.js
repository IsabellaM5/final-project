import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'

import Icon from 'components/reusable/Icon'

const useStyles = makeStyles({
  expand: {
    fontSize: '40px',
    background: '#ffffff',
    borderRadius: '50px',
    border: '1px solid #dfdbe5'
  }
})

const ExpandIcon = ({ moreInfo, toggleExpand }) => {
  const classes = useStyles()

  return (
    <Icon
      icon={moreInfo ?
        <ExpandLessIcon 
          className={classes.expand}
        />
        :
        <ExpandMoreIcon 
          className={classes.expand}
        />
      }
      handleIconClick={toggleExpand}
      apiMethod={moreInfo ? false : true}
      position="absolute"
      bottom="-25px"
      ariaLabel={moreInfo ? 'collapse-project-info' : 'expand-project-info'}
    />
  )
}

export default ExpandIcon