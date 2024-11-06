// services/chatbotService.js
const axios = require('axios');

async function getChatbotResponse(message) {
    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await axios.post(apiUrl, {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
            max_tokens: 50,
        }, {
            headers: { Authorization: `Bearer ${apiKey}` },
        });

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('OpenAI API error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get response from OpenAI');
    }
}

module.exports = { getChatbotResponse };
