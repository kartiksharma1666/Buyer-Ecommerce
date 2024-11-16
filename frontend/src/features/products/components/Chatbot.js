import React, { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

const faqData = [
    { question: "What is your return policy?", answer: "Our return policy allows returns within 30 days of purchase." },
    { question: "How can I track my order?", answer: "You can track your order by logging into your account and clicking on 'Track Order'." },
    { question: "Do you offer customer support?", answer: "Yes, we offer 24/7 customer support through email and live chat." },
    { question: "What payment methods do you accept?", answer: "We accept credit cards, debit cards, PayPal, and other major payment methods." },
    { question: "Is my data secure?", answer: "Yes, we use industry-standard encryption to keep your data secure." },
];

const Chatbot = () => {
    const [messages, setMessages] = useState([]); // To store chat history

    const handleOptionClick = (question, answer) => {
        // Add the user's selected question
        setMessages((prev) => [...prev, { sender: 'user', text: question }]);

        // Add the corresponding bot answer
        setMessages((prev) => [...prev, { sender: 'bot', text: answer }]);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '500px',
                width: '100%',
                maxWidth: '400px',
                margin: '0 auto',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: 2,
                bgcolor: '#fff',
                boxShadow: 2,
            }}
        >
            {/* Chat Display */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    mb: 2,
                    padding: 1,
                    bgcolor: '#f9f9f9',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                }}
            >
                {messages.map((msg, idx) => (
                    <Typography
                        key={idx}
                        align={msg.sender === 'user' ? 'right' : 'left'}
                        sx={{
                            color: msg.sender === 'user' ? 'blue' : 'black',
                            margin: '4px 0',
                            wordBreak: 'break-word',
                        }}
                    >
                        {msg.text}
                    </Typography>
                ))}
            </Box>

            {/* Predefined FAQ Options */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    bgcolor: '#f1f1f1',
                    borderRadius: '4px',
                    padding: 1,
                }}
            >
                <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'center', fontWeight: 'bold' }}>
                    Select a question:
                </Typography>
                {faqData.map((faq, idx) => (
                    <Button
                        key={idx}
                        variant="outlined"
                        fullWidth
                        onClick={() => handleOptionClick(faq.question, faq.answer)}
                        sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
                    >
                        {faq.question}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default Chatbot;
