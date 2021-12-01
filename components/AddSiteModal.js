import { useForm } from 'react-hook-form'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Button,
	Input,
	useDisclosure,
} from '@chakra-ui/react'

const AddSiteModal = ({ children }) => {
	// This is used to manage the opened/closed state
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { handleSubmit, register } = useForm()

	return (
		<>
			<Button
				onClick={onOpen}
				backgroundColor="gray.900"
				color="white"
				fontWeight="medium"
				_hover={{ bg: 'gray.700' }}
				_active={{
					bg: 'gray.800',
					transform: 'scale(0.95)',
				}}
			>
				{children}
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent as="form" onSubmit={handleSubmit(TODO)}>
					<ModalHeader fontWeight="bold">Add Site</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								placeholder="My site"
								name="name"
								// Register the field so we can access the value
								ref={register({
									required: 'Required',
								})}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Link</FormLabel>
							<Input
								placeholder="https://website.com"
								name="url"
								ref={register({
									required: 'Required',
								})}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose} mr={3} fontWeight="medium">
							Cancel
						</Button>
						<Button
							backgroundColor="#99FFFE"
							color="#194D4C"
							fontWeight="medium"
							type="submit"
						>
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default AddSiteModal