import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden
} from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'

import { Card } from '../components/card'
import { DividerWithText } from '../components/divider-with-text'
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
      <Card>
        <RegisterForm />
        <DividerWithText mt="6">or continue with</DividerWithText>
        <SimpleGrid mt="6" columns={3} spacing="3">
          <Button color="currentColor" variant="outline">
            <VisuallyHidden>Login with Facebook</VisuallyHidden>
            <FaFacebook />
          </Button>
          <Button color="currentColor" variant="outline">
            <VisuallyHidden>Login with Google</VisuallyHidden>
            <FaGoogle />
          </Button>
          <Button color="currentColor" variant="outline">
            <VisuallyHidden>Login with Github</VisuallyHidden>
            <FaGithub />
          </Button>
        </SimpleGrid>
      </Card>
    </Box>
  </Box>
)
