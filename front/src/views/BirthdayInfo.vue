<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <!-- Отображение текущего эндпоинта -->
        <p class="text-sm text-gray-500 mb-4">Текущий маршрут: {{ $route.path }}</p>
  
        <h1 class="text-3xl font-bold mb-6 text-gray-800">Информация о дне рождения</h1>
  
        <!-- Данные пользователя -->
        <div class="mb-6 text-gray-700">
          <p class="text-lg"><strong>ID:</strong> {{ user.telegramId || 'Не указан' }}</p>
          <p class="text-lg"><strong>Имя:</strong> {{ user.firstName }}</p>
          <p class="text-lg"><strong>Фамилия:</strong> {{ user.lastName }}</p>
          <p class="text-lg"><strong>Username:</strong> @{{ user.username }}</p>
          <p class="text-lg"><strong>Дата рождения:</strong> {{ formatDate(user.birthDate) }}</p>
          <p class="text-lg"><strong>Возраст:</strong> {{ user.getAge() || 'Не рассчитан' }} лет</p>
        </div>
  
        <!-- Дни до дня рождения -->
        <p class="text-lg text-gray-700">До вашего следующего дня рождения осталось:</p>
        <p class="text-2xl font-semibold text-blue-600 mt-2">{{ user.daysUntilBirthday || 'Данные не загружены' }}</p>
  
        <!-- Кнопка поделиться -->
        <button
          @click="shareLink"
          class="mt-6 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Поделиться
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { useRoute } from 'vue-router'
  
  export default defineComponent({
    setup() {
      const user = useUserStore()
      const route = useRoute() // Получаем доступ к текущему маршруту
  
      // Замените 'YourBotName' на имя вашего бота
      const botName = 'my_birthday_date_bot'
  
      const formatDate = (date: string) => {
        if (!date) return 'Не указана'
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('ru-RU', options)
      }
  
      const shareLink = () => {
        if (window.Telegram?.WebApp) {
          const shareText = `До дня рождения ${user.firstName} ${user.lastName} осталось ${user.daysUntilBirthday}!`
          const deepLink = `https://t.me/${botName}?startapp=share_${user.telegramId}`
          const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(deepLink)}&text=${encodeURIComponent(shareText)}`
          window.Telegram.WebApp.openTelegramLink(shareUrl)
        } else {
          console.warn('Telegram Web App не доступен. Ссылка скопирована в буфер обмена.')
          const deepLink = `https://t.me/${botName}?startapp=share_${user.telegramId}`
          navigator.clipboard.writeText(deepLink)
            .then(() => alert('Ссылка скопирована в буфер обмена!'))
            .catch(err => console.error('Ошибка копирования:', err))
        }
      }
  
      return { user, formatDate, shareLink, $route: route } // Передаём route как $route
    },
  })
  </script>