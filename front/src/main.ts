import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useUserStore } from './stores/user'
import axios from 'axios'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

const userStore = useUserStore()
router.beforeEach(async (to, from, next) => {
    // Получение параметров из URL
    const urlParams = new URLSearchParams(window.location.search);
    const startApp = urlParams.get('startapp') || '';

    const sharedUserId = startApp.startsWith('share_') ? parseInt(startApp.replace('share_', ''), 10) : null;


  // Получение данных из Telegram Web App
  const initData = window.Telegram?.WebApp?.initDataUnsafe || {}
  if (initData.user && !userStore.telegramId) {
    const telegramUser = {
      telegramId: initData.user.id,
      username: initData.user.username || 'default_user',
      firstName: initData.user.first_name || 'Default',
      lastName: initData.user.last_name || 'User'
    }
    userStore.setTelegramData(telegramUser)
  } else if (!userStore.telegramId) {
    console.warn('Telegram Web App: Пользовательские данные не получены. Используется эмуляция.')
    userStore.setTelegramData({
      telegramId: 123456789,
      username: 'test_user',
      firstName: 'Тест',
      lastName: 'Пользователь'
    })
  }

  // Извлечение параметра startapp
//   const startApp = initData?.startapp || ''
//   const sharedUserId = startApp.startsWith('share_') ? parseInt(startApp.replace('share_', ''), 10) : null

  // Если есть параметр startapp и это не текущий пользователь
  if (sharedUserId) {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/${sharedUserId}/`)
      userStore.setSharedUserData({
        telegramId: response.data.id,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        birthDate: response.data.birth_date
      })
      if (to.path !== '/shared-info') {
        next('/shared-info') // Перенаправляем на страницу с данными другого пользователя
      } else {
        next()
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error)
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Если пользователь не найден, перенаправляем на главную страницу
        next('/')
      } else {
        next('/')
      }
    }
  } else if (userStore.telegramId && to.path === '/') {
    // Проверка текущего пользователя, только если нет startapp
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/${userStore.telegramId}/`)
      userStore.setUserData({ birthDate: response.data.birth_date })
      next('/info')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log('Пользователь не найден, остаёмся на первой странице.')
        next()
      } else {
        console.error('Ошибка при проверке пользователя:', error)
        next()
      }
    }
  } else {
    next()
  }
})