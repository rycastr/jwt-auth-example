import {
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  SimpleGrid,
  useDisclosure,
  VisuallyHidden
} from '@chakra-ui/react'
import { FormEvent, useRef } from 'react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import * as yup from 'yup'

import { Card } from './card'
import { DividerWithText } from './divider-with-text'
import { useAuth } from '../hooks/auth'
import { useNavigate } from 'react-router'

export const RegisterForm = (props: HTMLChakraProps<'form'>) => {
  const { signUp } = useAuth()

  const navigate = useNavigate()

  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null)

  const { isOpen, onToggle } = useDisclosure()

  function resetPasswordInputs () {
    passwordInputRef.current!.value = ''
    confirmPasswordInputRef.current!.value = ''
  }

  async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationSchema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(5),
      confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
    })

    try {
      const { email, password } = await validationSchema.validate({
        email: emailInputRef.current?.value,
        password: passwordInputRef.current?.value,
        confirmPassword: confirmPasswordInputRef.current?.value
      }, { abortEarly: false })

      await signUp(email, password)
      navigate('/')
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          console.log(error)
        })
      } else {
        // TODO: Implements authentication error handler
        console.log(err)
        resetPasswordInputs()
      }
    }
  }

  return (
    <Card>
      <chakra.form
        onSubmit={handleSubmit}
        {...props}
      >
        <Stack spacing="4">
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              required
              ref={emailInputRef}
            />
          </FormControl>

          <FormControl id="password">
            <Flex justify="space-between">
              <FormLabel>Password</FormLabel>
            </Flex>
            <InputGroup>
              <InputRightElement>
                <IconButton
                  bg="transparent !important"
                  variant="ghost"
                  aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                  icon={isOpen ? <HiEyeOff /> : <HiEye />}
                  onClick={onToggle}
                />
              </InputRightElement>
              <Input
                name="password"
                type={isOpen ? 'text' : 'password'}
                autoComplete="current-password"
                required
                ref={passwordInputRef}
              />
            </InputGroup>
          </FormControl>

          <FormControl id="confirm-password">
            <Flex justify="space-between">
              <FormLabel>Confirm Password</FormLabel>
            </Flex>
            <Input
              name="confirm-password"
              type={isOpen ? 'text' : 'password'}
              autoComplete="current-password"
              required
              ref={confirmPasswordInputRef}
            />
          </FormControl>

          <Flex flexDirection="column" pt="2">
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
              Sign up
            </Button>
          </Flex>

        </Stack>
      </chakra.form>
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
  )
}
