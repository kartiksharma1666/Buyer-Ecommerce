import React, { useState } from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        // Display user's message in chat
        setMessages((prev) => [...prev, { sender: 'user', text: input }]);

        // Send the message to the server chatbot API
        try {
            const response = await axios.post('/api/chatbot', { message: input });
            setMessages((prev) => [...prev, { sender: 'bot', text: response.data.reply }]);
        } catch (error) {
            setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
        }

        setInput('');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '400px' }}>
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    mb: 2,
                    padding: 1,
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    bgcolor: '#f9f9f9'
                }}
            >
                {messages.map((msg, idx) => (
                    <Typography
                        key={idx}
                        align={msg.sender === 'user' ? 'right' : 'left'}
                        sx={{ color: msg.sender === 'user' ? 'blue' : 'black' }}
                    >
                        {msg.text}
                    </Typography>
                ))}
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <Button variant="contained" onClick={handleSendMessage}>
                    Send
                </Button>
            </Stack>
        </Box>
    );
};

export default Chatbot;
