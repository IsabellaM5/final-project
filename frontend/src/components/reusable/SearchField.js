import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import Autocomplete from "@material-ui/lab/Autocomplete"

import { EDIT_COLLAB, DELETE_COLLAB } from 'reusable/urls'

const AutocompleteContainer = styled.div`
  grid-area: search;
`

const ChipsContainer = styled.div`
  grid-area: collabs;
`

const Label = styled.p`
  font-size: 1.6em;
  margin: 0 0 10px 0;
  align-self: flex-start;
`

const SearchField = ({ selectedCollaborators, setSelectedCollaborators, onInputChange, onDeleteCollaborator }) => {
  const users = useSelector(store => store.projects.users)
  const [availableOptions, setAvailableOptions] = useState(users)

  useEffect(() => {
    setAvailableOptions(users)

    if (selectedCollaborators.length !== 0) {
      const filteredOptions = availableOptions.filter(collab => !selectedCollaborators.includes(collab))
      setAvailableOptions(filteredOptions)
    } 
  }, [users])

  const [selectedOption, setSelectedOption] = useState('')

  const filterUsersArray = (v) => {
    const filteredOptions = availableOptions.filter(c => c !== v)
    setAvailableOptions(filteredOptions)
    console.log('onChange funktion')
  }

  const pushUsersArray = (v) => {
    const pushNewOption = availableOptions.push(v)
    setAvailableOptions(pushNewOption)
  }

  return (
    <>
        <AutocompleteContainer>
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
        </AutocompleteContainer>
      
      <ChipsContainer>
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
      </ChipsContainer>
    </>
  )
}

export default SearchField