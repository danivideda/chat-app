import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import socket from '../libs/socket';
import { SocketEvent } from '../../../common/src/SocketEvent';
import type { Message } from '../../../common/src/types';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let storedUserId = sessionStorage.getItem('userId');
    if (!storedUserId) {
      const newUserId = uuidv4();
      storedUserId = newUserId;
      sessionStorage.setItem('userId', newUserId);
    }
    setUserId(storedUserId);

    // listen for messages
    socket.on(SocketEvent.RECEIVE_MESSAGE, (message: Message) => {
      setMessages((prevMessages) =>
        prevMessages ? [...prevMessages, message] : [message]
      );
    });

    return () => {
      socket.off(SocketEvent.RECEIVE_MESSAGE);
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && userId) {
      const newMessage: Message = {
        userId,
        text: input,
      };
      socket.emit(SocketEvent.SEND_MESSAGE, newMessage);
      setInput('');
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box h="400px" p={4} borderWidth={1} borderRadius="lg" overflowY="auto">
        {messages.map((msg, index) => {
          return (
            <HStack
              key={index}
              justify={msg.userId === userId ? 'flex-end' : 'flex-start'}
              marginBottom={2}
            >
              {msg.userId !== userId && <Avatar name="Other" />}
              <Box
                bg={msg.userId === userId ? 'green.100' : 'blue.100'}
                p={3}
                borderRadius="lg"
                maxWidth="70%"
              >
              <Text>{msg.text}</Text></Box>
              {msg.userId === userId && <Avatar name="Me" />}
            </HStack>
          );
        })}
      </Box>

      <HStack>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              sendMessage()
            }
          }}
          placeholder="Write your message"
        />
        <Button onClick={sendMessage} colorScheme="teal">
          Send Message
        </Button>
      </HStack>
    </VStack>
  );
}

export default ChatBox;
