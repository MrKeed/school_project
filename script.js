document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    const formData = new FormData(this); // Получаем данные из формы
    const data = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    console.log(data); // Выводим данные в консоль (замените на отправку на сервер)
});
