# Используем официальный образ Node.js (выбери нужную версию)
FROM node:18-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json перед установкой зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы в контейнер
COPY . .

# Пробрасываем порт, на котором работает Vite (обычно 5173)
EXPOSE 5173

# Запускаем dev-сервер
CMD ["npm", "run", "dev"]
