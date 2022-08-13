import React, { useState } from 'react'
import { Box } from '@mui/system'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux'
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
} from '../redux/action'
const SelectFild = (props) => {
  const { label, options } = props
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setValue(e.target.value)
    switch (label) {
      case 'Category':
        dispatch(handleCategoryChange(e.target.value))
        break
      case 'Difficulty':
        dispatch(handleDifficultyChange(e.target.value))
        break
      case 'Type':
        dispatch(handleTypeChange(e.target.value))
        break
      default:
        return
    }
  }
  return (
    <Box mt={3} width='100%'>
      <FormControl size='small' fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {options.map(({ id, name }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectFild
