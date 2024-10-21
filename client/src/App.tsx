import { Box, ChakraProvider, Heading } from '@chakra-ui/react';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <ChakraProvider>
      <Box p={5}>
        <Heading as="h1" mb={6}>
          Real-time Chat
        </Heading>
        <ChatBox />
      </Box>
    </ChakraProvider>
  )
}

export default App;
