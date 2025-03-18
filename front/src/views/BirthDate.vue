<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Выберите дату рождения</h1>
  
        <div class="mb-6 text-center">
          <p class="text-lg text-gray-700">Telegram ID: {{ user.telegramId || 'Не получен' }}</p>
          <p class="text-lg text-gray-700">Имя: {{ user.firstName }}</p>
          <p class="text-lg text-gray-700">Фамилия: {{ user.lastName }}</p>
          <p class="text-lg text-gray-700">Username: @{{ user.username }}</p>
        </div>
  
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-gray-600 mb-2">День</label>
            <select
              v-model="user.day"
              @change="user.setDate({ newDay: Number($event.target.value) })"
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option :value="null" disabled>Выберите</option>
              <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
  
          <div>
            <label class="block text-gray-600 mb-2">Месяц</label>
            <select
              v-model="user.month"
              @change="user.setDate({ newMonth: Number($event.target.value) })"
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option :value="null" disabled>Выберите</option>
              <option v-for="(monthName, index) in months" :key="index" :value="index + 1">
                {{ monthName }}
              </option>
            </select>
          </div>
  
          <div>
            <label class="block text-gray-600 mb-2">Год</label>
            <select
              v-model="user.year"
              @change="user.setDate({ newYear: Number($event.target.value) })"
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option :value="null" disabled>Выберите</option>
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
        </div>
  
        <div v-if="user.computedBirthDate" class="text-center">
          <p class="text-lg text-gray-700">Вы выбрали: <span class="font-semibold">{{ formatDate(user.computedBirthDate) }}</span></p>
        </div>
        <div v-else class="text-center text-gray-500">
          Пожалуйста, выберите день, месяц и год.
        </div>
  
        <button
          v-if="user.computedBirthDate && user.telegramId"
          @click="submitBirthDate"
          class="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Далее
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  export default defineComponent({
    setup() {
      const user = useUserStore()
      const router = useRouter()
  
      const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ]
  
      const currentYear = new Date().getFullYear()
      const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i)
  
      const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('ru-RU', options)
      }
  
      const submitBirthDate = async () => {
        if (!user.telegramId) {
          console.error('Telegram ID не указан')
          return
        }
  
        try {
          const response = await axios.post('http://localhost:8000/api/v1/users/', {
            id: user.telegramId,
            username: user.username,
            first_name: user.firstName,
            last_name: user.lastName,
            birth_date: user.computedBirthDate
          })
          user.setUserData({ birthDate: user.computedBirthDate })
          router.push('/info')
        } catch (error) {
          console.error('Ошибка при отправке данных:', error)
        }
      }
  
      return { user, months, years, formatDate, submitBirthDate }
    },
  })
  </script>