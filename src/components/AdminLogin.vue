<template>
  <div class="flex justify-center items-center h-screen bg-gray-900">
    <div class="w-1/3 border-2 border-yellow-500 rounded p-6">
      <h2 class="text-2xl font-bold mb-4 text-yellow-500 text-center">
        後台登入
      </h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <div class="relative">
            <input
              id="floating_email"
              v-model="email"
              type="text"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-yellow-500 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
              placeholder=" "
              required
            >
            <label
              for="floating_email"
              class="absolute text-sm text-yellow-500 dark:text-yellow-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >Email</label>
          </div>
        </div>

        <div class="mb-6">
          <div class="relative">
            <input
              id="floating_password"
              v-model="password"
              type="password"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-yellow-500 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
              placeholder=" "
              required
            >
            <label
              for="floating_password"
              class="absolute text-sm text-yellow-500 dark:text-yellow-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >密碼</label>
          </div>
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="border-2 border-yellow-500 text-yellow-500 bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 px-4 py-2 rounded"
          >
            登入
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
      email: email.value,
      password: password.value
    })
    console.log(response)
    if (response.status === 200) {
      // 假設API回傳的token存在data物件中
      const token = response.data.data.token

      // 登入成功，將Bearer Token加入標頭
      axios.defaults.headers.common.Authorization = `Bearer ${token}`

      // 使用Vue Router進行頁面跳轉
      router.push('/admin')
      console.log('登入成功')
    } else {
      // 登入失敗，進行相應的處理
      console.log('登入失敗')
    }
  } catch (error) {
    console.error('發生錯誤:', error)
  }
}
</script>

<style>
/* 在這裡可以自訂樣式 */
</style>
