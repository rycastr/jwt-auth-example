import { ChakraProvider, Heading } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/sign-up'

function App () {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Heading>Home Page</Heading>} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </ChakraProvider>
  )
}

export default App
