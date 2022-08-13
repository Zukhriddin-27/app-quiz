import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleScoreChange, handleAmountChange } from '../redux/action'
const FinalSecrem = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { score } = useSelector((state) => state)

  const handleToSetting = () => {
    dispatch(handleScoreChange(0))
    dispatch(handleAmountChange(50))
    return navigate('/')
  }
  setTimeout(() => {
    dispatch(handleScoreChange(0))
    dispatch(handleAmountChange(50))
    return navigate('/')
  }, 4000)

  return (
    <Box mt={30}>
      <Typography variant='h3' fontWeight='bold' mb={3}>
        Final Score {score}
      </Typography>
      <Button onClick={handleToSetting}>Back to Saetting!</Button>
    </Box>
  )
}

export default FinalSecrem
