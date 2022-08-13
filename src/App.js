import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import FinalSecrem from './pages/FinalSecrem'
import Settings from './pages/Settings'
import Question from './pages/Question'

function App() {
  let routes = useRoutes([
    { path: '/', element: <Settings /> },
    { path: '/questions', element: <Question /> },
    { path: '/final', element: <FinalSecrem /> },
  ])
  return routes
}

function AppWrapper() {
  return (
    <Router>
      <Container maxWidth='sm'>
        <Box textAlign='center' mt={5}>
          <Typography variant='h2' fontWeight='bold'>
            Quiz App
          </Typography>
          <App />
        </Box>
      </Container>
    </Router>
  )
}

export default AppWrapper
