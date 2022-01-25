import { Flex, Heading, Text } from '@chakra-ui/react'

export default function FeedbackEmptyState() {
	return (
		<Flex
			width="100%"
			backgroundColor="white"
			borderRadius="8px"
			p={16}
			justify="center"
			align="center"
			direction="column"
		>
			<Heading size="lg" mb={2}>
				There isn&apos;t any feedback.
			</Heading>
			<Text mb={4}>Share your sites!</Text>
		</Flex>
	)
}
