const express = require('express');
const app = express();
path = __dirname + '/templates/';  // Шлях до шаблонів
const views = require('./views'); // Підключаємо функції представлень

app.use(
  "/static",
  express.static(__dirname + "/static", {
    // Add debug options
    setHeaders: (res, path) => {
      console.log("Serving static file:", path);
    },
  }),
);

app.set('view engine', 'ejs'); // Встановлюємо EJS як шаблонізатор
app.set('views', path); // Встановлюємо каталог для шаблонів
app.get("/obj/:id/", views.arcObject)
app.get('/list/:id/', views.listObjects) 

// Головна сторінка
app.get('/', views.main);

// Обробка 404 помилки для будь-якої іншої адреси
app.use('*', views.error404);

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log('Сервер починає прослуховувати підключення на порт 3000...');
});


