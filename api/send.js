const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    const { name, email, projectDescription } = req.body;
    
    if (!name || !email || !projectDescription) {
        return res.status(400).json({ error: 'Все поля должны быть заполнены' });
    }
    
    const message = `\n✉️ Новый заказ проекта!\n\n👤 Имя: ${name}\n📧 Email: ${email}\n📌 Описание проекта: ${projectDescription}`;
    
    try {
        await axios.post(TELEGRAM_API_URL, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
        res.json({ success: true, message: 'Заказ успешно отправлен' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка отправки в Telegram', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
