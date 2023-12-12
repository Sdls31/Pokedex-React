import { Container } from '@mui/material'
import { PagesRoutes } from './components/Routes'


function App() {

  return (
  <>
    
    <Container sx={{
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }} >
      <PagesRoutes/>
    </Container>
  </>
  )
}

export default App
