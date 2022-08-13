import React from 'react'
import { Box } from '@mui/system'
import { Button, CircularProgress, Typography } from '@mui/material'
import useAxios from '../hooks/useAxios'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleScoreChange, handleAmountChange } from '../redux/action'
import { decode } from 'html-entities'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const getRandomInit = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const Question = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    question_category,
    question_diffucult,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state)
  let apiUrl = `/api.php?amount=${amount_of_question}`
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`)
  }
  if (question_diffucult) {
    apiUrl = apiUrl.concat(`&difficulty=${question_diffucult}`)
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`)
  }

  const { response, loading } = useAxios({ url: apiUrl })
  const [questionIndex, setQuestionIndex] = useState(1)
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex]
      let answers = [...question.incorrect_answers]
      answers.splice(
        getRandomInit(question.incorrect_answers.length),

        0,
        question.correct_answer
      )
      setOptions(answers)
    }
  }, [response, questionIndex])

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    )
  }

  const handleQuestions = (e) => {
    setQuestionIndex(parseInt(e.target.value))
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex]
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1))
      toast.success('Right answers')
    } else {
      toast.error('Wrong answers')
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1)
    } else {
      navigate('/final')
    }
  }
  const handleNext = (e) => {
    const question = response.results[questionIndex]
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1))
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1)
    } else {
      navigate('/final')
    }
  }
  const handlePrev = (e) => {
    const question = response.results[questionIndex]
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1))
    }

    if (questionIndex + 1 < response.results.length) {
      if (questionIndex === 0) {
        setQuestionIndex(0)
      } else {
        setQuestionIndex(questionIndex - 1)
      }
    } else {
      navigate('/final')
    }
  }

  const handleFinish = (e) => {
    dispatch(handleAmountChange(50))
    navigate('/final')
  }

  return (
    <Box>
      <ToastContainer />
      {options ? (
        <>
          <Box>
            {response.results.map((num, ind) => {
              return (
                <Button
                  value={ind}
                  onClick={handleQuestions}
                  variant='outlined'
                  size='small'
                  color='primary'
                  key={ind}
                >
                  {ind + 1}
                </Button>
              )
            })}
          </Box>
          <Typography variant='h4'>Questions {questionIndex}</Typography>
          <Typography mt={5}>
            {decode(response.results[questionIndex].question)}
          </Typography>

          {options.map((data, id) => {
            return (
              <Box mb={2} key={id}>
                <Button
                  onClick={handleClickAnswer}
                  variant='contained'
                  fullWidth
                >
                  {decode(data)}
                </Button>
              </Box>
            )
          })}
          <Box mt={5}>
            <Box textAlign='start'>
              <Button variant='outlined' mar onClick={handlePrev}>
                Previos
              </Button>
            </Box>
            <Box textAlign='end' mt={-4}>
              <Button variant='outlined' onClick={handleNext}>
                Next
              </Button>
            </Box>
            <Typography mt={-4}>
              Score:{score} /{response.results.length}
            </Typography>
            <Box mt={2}>
              <Button onClick={handleFinish} variant='contained' color='error'>
                Finish
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Box>
          <Typography>Kearak kategoriyalarni tanlang.</Typography>
          <Button onClick={() => navigate('/')}>Back to setting</Button>
        </Box>
      )}
    </Box>
  )
}

export default Question
