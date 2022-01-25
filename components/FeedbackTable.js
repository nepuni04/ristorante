import { Box } from "@chakra-ui/react"
import { Table, Tr, Th } from "./Table"
import FeedbackRow from "./FeedbackRow"

export default function FeedbackTable(props) {
	return (
		<Box overflowX="scroll" className="box-scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th minW="150px">Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {props.feedback.map((feedback) => (
            <FeedbackRow key={feedback.id} {...feedback} />
          ))}
        </tbody>
      </Table>
    </Box>
	)
}
