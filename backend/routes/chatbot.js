// routes/chatbot.js
const express = require('express');
const router = express.Router();
const { getChatbotResponse } = require('../services/chatbotService');

// FAQ Data
const faqs = [
    { question: 'business hours', answer: 'Our business hours are 9 AM to 5 PM, Monday to Friday.' },
    { question: 'return policy', answer: 'You can return items within 30 days of purchase.' },
    { question: 'contact support', answer: 'You can contact support at support@example.com.' },
    // Add more FAQs as needed
];

router.post('/', async (req, res) => {
    const { message } = req.body;
    console.log('Received message:', message);

    try {
        // Check for FAQ answers
        const matchingFAQ = faqs.find((item) =>
            message.toLowerCase().includes(item.question.toLowerCase())
        );

        if (matchingFAQ) {
            return res.json({ reply: matchingFAQ.answer });
        }

        // If no FAQ match, get response from OpenAI API
        const reply = await getChatbotResponse(message);
        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: 'An error occurred. Please try again.' });
    }
});

module.exports = router;
