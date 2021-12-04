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
	useToast,
	useDisclosure,
} from '@chakra-ui/react'

import { mutate } from 'swr'
import { createSite } from '@/lib/db'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/lib/auth'

const AddSiteModal = ({ children }) => {
	// This is used to manage the opened/closed state
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { handleSubmit, register } = useForm()
	const auth = useAuth()
	const toast = useToast()

	const onCreateSite = async ({ name, url }) => {
    // Create the new object to save in Firestore
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    }

    // Retrieve the document ID for Firestore
    const { id } = await createSite(newSite)
    // Show a toast message
    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    // Update the SWR cache to add the new site
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => ({
        sites: [{ id, ...newSite }, ...data.sites],
      }),
      false
    )
    onClose()
  }

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
				<ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
					<ModalHeader fontWeight="bold">Add Site</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								placeholder="My site"
								// Register the field so we can access the value
								{...register("name", { required: true })}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Link</FormLabel>
							<Input
								placeholder="https://website.com"
								{...register("url", { required: true })}
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