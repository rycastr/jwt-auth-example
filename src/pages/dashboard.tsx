import { Button } from '@chakra-ui/button'
import { Flex, Heading } from '@chakra-ui/layout'
import { useAuth } from '../hooks/auth'

export const Dashboard = () => {
  const { signOut } = useAuth()

  async function handleSignOutButton () {
    try {
      await signOut()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Flex>
      <Heading marginRight="4">Dashboard</Heading>
      <Button onClick={handleSignOutButton}>Sign Out</Button>
    </Flex>
  )
}
