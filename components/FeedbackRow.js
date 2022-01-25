import { useAuth } from "@/lib/auth";
import { Box, Code, Switch } from "@chakra-ui/react";
import { Td } from "./Table";
import DeleteFeedbackButton from "./DeleteFeedbackButton";
import { updateFeedback } from "@/lib/db";
import { mutate } from "swr";

export default function FeedbackRow({ id, author, text, status, route }) {
	const auth = useAuth();
  const isChecked = status === 'active';

  const toggleFeedback = async () => {
    await updateFeedback(id, { status: isChecked ? 'pending' : 'active' });
    mutate(['/api/feedback', auth.user.token]);
  };

  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code
          maxW="150px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          display="inherit"
        >
          {route || '/'}
        </Code>
      </Td>
      <Td>
        <Switch color="green" onChange={toggleFeedback} isChecked={isChecked} />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
}
