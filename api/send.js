export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { name, email, projectDescription } = req.body;
    if (!name || !email || !projectDescription) {
        return res.status(400).json({ error: "Пожалуйста, заполните все поля." });
    }

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TOKEN || !CHAT_ID) {
        return res.status(500).json({ error: "Ошибка сервера: отсутствуют конфигурационные данные." });
    }

    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const message = `\n📌 Новый заказ проекта!\n\n👤 Имя: ${name}\n📧 Email: ${email}\n📝 Описание: ${projectDescription}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: CHAT_ID, text: message })
        });

        const result = await response.json();
        if (result.ok) {
            return res.status(200).json({ message: "Заказ успешно отправлен!" });
        } else {
            return res.status(500).json({ error: result.description || "Ошибка при отправке" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Ошибка сети. Попробуйте позже." });
    }
}
