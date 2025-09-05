# 🎥 Movies UI

Односторінковий веб-застосунок для зберігання та управління інформацією про фільми.
Реалізований на **React + TypeScript** з підтримкою Docker.

---

## 📌 Функціонал
- Додавання нового фільму (модальне вікно з формою)  
- Видалення фільму  
- Відображення картки фільму з розгорнутою деталізацією  
- Пошук за назвою та актором  
- Сортування за алфавітом (A→Z, Z→A)  
- Імпорт фільмів з текстового файлу `movies.txt` через API  

## ⚙️ Конфігурація
API посилання та токен конфігуруються через змінні оточення:
- `API_URL` — URL бекенду (наприклад: `http://localhost:8000/api/v1`)
- `API_TOKEN` — JWT токен доступу

---

## 🛠️ Запуск Бекенду (https://hub.docker.com/r/webbylabhub/movies)

1. `docker pull webbylabhub/movies`
2. `docker run --name movies -p 8000:8000 webbylabhub/movies`

## 🛠️ Запуск Фронтенду

1. Встановлення пакетів: `npm install`
2. Збірка docker образу: `docker build -t your_account/movies-ui .`
3. Запуск docker контейнера: `docker run --rm --name movies-ui  -p 3000:3000  -e API_URL=http://localhost:8000/api/v1 your_acocunt/movies-ui`
4. Відкрити в браузері за посиланням, наприклад http://localhost:3000
