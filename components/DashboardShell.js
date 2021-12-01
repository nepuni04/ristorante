import NextLink from 'next/link'
import { Box, Button, Flex, Link, Avatar, Icon } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'

const DashboardShell = ({ children }) => {
  const { user } = useAuth()

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Box
        backgroundColor="white"
        mb={[6, 12]}
        w="full"
        borderTop="5px solid #0AF5F4"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          p={4}
          maxW="1250px"
          mx="auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Link>
                <Icon name="logo" size="24px" mr={8} />
              </Link>
            </NextLink>
            <NextLink href="/sites" passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex alignItems="center">
            {user && (
              <NextLink href="/account" passHref>
                <Button as="a" variant="ghost" mr={2}>
                  Account
                </Button>
              </NextLink>
            )}
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Box>

      <Flex mx="auto" direction="column" maxW="1250px" px={[2, 8, 8]}>
        {children}
      </Flex>
    </Box>
  )
}

export default DashboardShell