import React from 'react'
import styled from 'styled-components/macro'
import TextField from '@material-ui/core/TextField'
import Autocomplete from "@material-ui/lab/Autocomplete"

import { EDIT_COLLAB } from 'reusable/urls'

const Container = styled.div`
  grid-area: search;
`

const SearchFieldInput = ({ availableOptions, selectedOption, setSelectedOption, selectedCollaborators, setSelectedCollaborators, filterUsersArray, onInputChange }) => {
  return (
    <Container>
      <Autocomplete
        id="autocomplete"
        value={selectedOption || ''}
        onChange={(event, v) => {
          if (!v) {
            return
          }
          setSelectedOption(v)
          setSelectedCollaborators([...selectedCollaborators, v])
          filterUsersArray(v)

          if (onInputChange) {
            onInputChange(v, EDIT_COLLAB)
          }
        }}
        options={availableOptions}
        style={{ width: 250, marginBottom: 'auto' }}
        renderInput={(params) => (
          <TextField {...params} label="Users" variant="outlined" />
        )}
      />
    </Container>
  )
}

export default SearchFieldInput