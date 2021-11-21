import {
  Box,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

import { Link } from '../components/link'
import { RegisterForm } from '../components/register-form'
import { Logo } from '../components/logo'

export const SignUp = () => (
  <Box
    bg={useColorModeValue('gray.50', 'inherit')}
    minH="100vh"
    py="12"
    px={{ base: '4', lg: '8' }}
  >
    <Box maxW="md" mx="auto">
      <Logo mx="auto" mb="5" boxSize="100px" />
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Sign up to your account
      </Heading>
      <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
        <Text as="span">You have an account?</Text>
        <Link href="#">Login</Link>
      </Text>
      <RegisterForm />
    </Box>
  </Box>
)
