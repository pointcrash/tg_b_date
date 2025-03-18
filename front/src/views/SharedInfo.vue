<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 class="text-3xl font-bold mb-6 text-gray-800">День рождения {{ user.sharedUserData?.firstName }}</h1>
        <p class="text-lg text-gray-700">До дня рождения {{ user.sharedUserData?.firstName }} осталось:</p>
        <p class="text-2xl font-semibold text-blue-600 mt-2">{{ user.sharedDaysUntilBirthday || 'Данные не загружены' }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import { useUserStore } from '@/stores/user'
  
  export default defineComponent({
    setup() {
      const user = useUserStore()
      return { user }
    },
  })
  </script>