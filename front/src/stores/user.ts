import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const day = ref<number | null>(null)
  const month = ref<number | null>(null)
  const year = ref<number | null>(null)
  const telegramId = ref<number | null>(null)
  const username = ref<string>('default_user')
  const firstName = ref<string>('Default')
  const lastName = ref<string>('User')
  const birthDate = ref<string>('')

  // Данные другого пользователя
  const sharedUserData = ref<{
    telegramId: number | null,
    firstName: string,
    lastName: string,
    birthDate: string
  } | null>(null)

  const computedBirthDate = computed(() => {
    if (!day.value || !month.value || !year.value) return ''
    const formattedMonth = month.value.toString().padStart(2, '0')
    const formattedDay = day.value.toString().padStart(2, '0')
    return `${year.value}-${formattedMonth}-${formattedDay}`
  })

  const daysUntilBirthday = computed(() => {
    if (!birthDate.value) return null
    const today = new Date()
    const birth = new Date(birthDate.value)
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1)
    }
    const diffTime = nextBirthday.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays} дней`
  })

  const sharedDaysUntilBirthday = computed(() => {
    if (!sharedUserData.value?.birthDate) return null
    const today = new Date()
    const birth = new Date(sharedUserData.value.birthDate)
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1)
    }
    const diffTime = nextBirthday.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays} дней`
  })

  function setDate({ newDay, newMonth, newYear }: { newDay?: number, newMonth?: number, newYear?: number }) {
    if (newDay !== undefined) day.value = newDay
    if (newMonth !== undefined) month.value = newMonth
    if (newYear !== undefined) year.value = newYear
  }

  function setTelegramData(data: { telegramId: number, username: string, firstName: string, lastName: string }) {
    telegramId.value = data.telegramId
    username.value = data.username
    firstName.value = data.firstName
    lastName.value = data.lastName
  }

  function setUserData(data: { birthDate: string }) {
    birthDate.value = data.birthDate
  }

  function setSharedUserData(data: { telegramId: number, firstName: string, lastName: string, birthDate: string }) {
    sharedUserData.value = {
      telegramId: data.telegramId,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate
    }
  }

  function getAge(): number | null {
    if (!birthDate.value) return null
    const today = new Date()
    const birth = new Date(birthDate.value)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return { day, month, year, telegramId, username, firstName, lastName, birthDate, sharedUserData, computedBirthDate, daysUntilBirthday, sharedDaysUntilBirthday, setDate, setTelegramData, setUserData, setSharedUserData, getAge }
})