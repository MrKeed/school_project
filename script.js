document.getElementById('orderForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    try {
        const response = await fetch('/send-mail.php', { // Замените /send-mail.php на адрес вашего серверного скрипта
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка отправки данных: ${response.status}`);
        }

        alert("Ваше сообщение успешно отправлено!");
    } catch (error) {
        console.error(error);
        alert("Произошла ошибка при отправке сообщения.");
    }
});
