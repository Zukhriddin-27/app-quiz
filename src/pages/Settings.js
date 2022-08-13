import { Button, CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import TextFieldComp from '../components/TextFieldComp'
import SelectFild from '../components/SelectFild'
import useAxios from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'
const Settings = () => {
  const { response, error, loading } = useAxios({ url: '/api_category.php' })
  const navigate = useNavigate()

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography variant='h6' mt={20} color='red'>
        Some Went Wrong!
      </Typography>
    )
  }
  const diffucultOptions = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ]

  const typeOptions = [
    { id: 'multiple', name: 'Multiple Choise' },
    { id: 'boolean', name: 'True or False' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/questions')
  }

  return (
    <form onSubmit={handleSubmit}>
      <SelectFild options={response.trivia_categories} label='Category' />
      <SelectFild options={diffucultOptions} label='Difficulty' />
      <SelectFild options={typeOptions} label='Type' />
      <TextFieldComp />
      <Box mt={3} width='100%'>
        <Button fullWidth variant='contained' type='submit'>
          Get Started
        </Button>
      </Box>
    </form>
  )
}

export default Settings
