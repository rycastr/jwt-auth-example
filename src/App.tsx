import { ChakraProvider, Heading } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

function App () {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Heading>Home Page</Heading>} />
        <Route path="about" element={<Heading>About Page</Heading>} />
      </Routes>
    </ChakraProvider>
  )
}

export default App
