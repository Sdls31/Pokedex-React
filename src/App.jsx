import { useState } from 'react'
import { Pokedex } from './components/Pokedex'
import { Container } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center',
    }} >
      <Pokedex />
    </Container>
  )
}

export default App
