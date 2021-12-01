import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Box,
} from '@chakra-ui/react'

const SiteTableHeader = ({ isPaidAccount }) => (
  <Box mx={4}>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
		
    <Flex justifyContent="space-between">
      <Heading mb={8}>My Sites</Heading>
    </Flex>
  </Box>
)

export default SiteTableHeader