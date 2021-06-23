import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import SearchFieldInput from 'components/projects/SearchFieldInput'
import SearchFieldChips from 'components/projects/SearchFieldChips'

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
  }

  const pushUsersArray = (v) => {
    const pushNewOption = [...availableOptions, v]
    setAvailableOptions(pushNewOption)
  }

  return (
    <>
      <SearchFieldInput 
        availableOptions={availableOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedCollaborators={selectedCollaborators}
        setSelectedCollaborators={setSelectedCollaborators}
        filterUsersArray={filterUsersArray}
        onInputChange={onInputChange}
      />
      <SearchFieldChips 
        selectedCollaborators={selectedCollaborators}
        pushUsersArray={pushUsersArray}
        onDeleteCollaborator={onDeleteCollaborator}
      />
    </>
  )
}

export default SearchField