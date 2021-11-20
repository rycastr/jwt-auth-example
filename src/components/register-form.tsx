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
  useDisclosure
} from '@chakra-ui/react'
import { FormEvent, useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import * as yup from 'yup'

export const RegisterForm = (props: HTMLChakraProps<'form'>) => {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null)

  const { isOpen, onToggle } = useDisclosure()

  async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationSchema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(5),
      confirmPassword: yup.string().required()
    })

    try {
      const data = await validationSchema.validate({
        email: emailInputRef.current?.value,
        password: passwordInputRef.current?.value,
        confirmPassword: confirmPasswordInputRef.current?.value
      })

      console.log(data)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // TODO: Add error handler to input
        console.log(error)
      }
    }
  }

  return (
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
  )
}
