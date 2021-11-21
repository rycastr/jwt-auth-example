import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

import { ProtectedRoutes } from './components/protected-routes'
import { AuthContextProvider } from './contexts/auth'
import { Dashboard } from './pages/dashboard'
import { SignUp } from './pages/sign-up'

function App () {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path="signup" element={<SignUp />} />
        </Routes>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default App
