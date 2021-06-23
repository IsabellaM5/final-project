import React from 'react'
import styled from 'styled-components/macro'
import Chip from '@material-ui/core/Chip'

import { DELETE_COLLAB } from 'reusable/urls'

const Container = styled.div`
  grid-area: collabs;
`

const Label = styled.p`
  font-size: 1.6em;
  margin: 0 0 10px 0;
  align-self: flex-start;
`

const SearchFieldChips = ({ selectedCollaborators, pushUsersArray, onDeleteCollaborator }) => {
  return (
    <Container>
      <Label>Collaborators</Label>
      {selectedCollaborators.length !== 0 && (
        <>
          {selectedCollaborators.map(collab => (
            <Chip
              key={collab}
              label={collab}
              size="medium"
              onDelete={() => {
                pushUsersArray(collab)
                onDeleteCollaborator(collab, DELETE_COLLAB)
              }}
            />
          ))}
        </>  
      )}
    </Container>
  )
}

export default SearchFieldChips