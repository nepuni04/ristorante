import React, { useState, useRef } from 'react';
import { deleteFeedback } from '@/lib/db';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button
} from '@chakra-ui/react';

import { DeleteIcon } from "@chakra-ui/icons"

const DeleteFeedbackButton = ({ feedbackId }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    deleteFeedback(feedbackId)
    mutate(
      ['/api/feedback', auth.user.token],
      async (data) => {
        return {
          feedback: data.feedback.filter((feedback) => feedback.id !== feedbackId)
        };
      },
      false
    );
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete feedback"
        icon={<DeleteIcon />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Feedback
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              fontWeight="bold"
              colorScheme="red"
              onClick={onDelete}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteFeedbackButton;