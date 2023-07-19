<template>
  <div class="flex">
    <!-- 側邊欄 -->
    <div class="bg-gray-900 text-white w-1/5 flex flex-col justify-between">
      <div class="p-4">
        <h1 class="text-2xl font-bold">
          Dashboard
        </h1>
      </div>
      <ul class="py-4 space-y-2 flex-grow">
        <router-link
          v-for="item in menuItems"
          :key="item.id"
          :to="item.path"
          class="block px-4 py-2 hover:bg-gray-800"
        >
          <img
            :src="movieIcon"
            alt=""
            class="inline-block pr-3"
          >
          {{ item.name }}
        </router-link>
      </ul>
      <div class="p-4">
        <button
          class="border-2 border-main-color text-main-color bg-gray-900 hover:bg-[#B5984D] hover:text-gray-900 px-4 py-2 rounded w-full"
          @click="logout"
        >
          登出
        </button>
      </div>
    </div>
    <!-- 主要內容 -->
    <div class="w-4/5 bg-gray-900">
      <h2 class="text-2xl font-bold mb-4 text-white">
        主要內容
      </h2>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import movieIcon from '@/assets/scss/images/movie.svg'

const menuItems = ref([
  { id: 1, name: '首頁', path: '/admin' },
  { id: 2, name: '設定', path: '/admin/settings' }
  // { id: 3, name: '統計', path: '/admin/statistics' },
  // { id: 4, name: '使用者', path: '/admin/users' }
])

const router = useRouter()

// const selectedItem = ref(menuItems.value.find(item => item.path === route.path))
function logout () {
  // 登出邏輯
  router.push('/login')
}
</script>

<style lang="scss" scoped>
$color:#b5984d;
.border-main-color {
  border-color: $color;
}
.text-main-color {
  color: $color;
}
.bg-main-color {
  background-color: $color;
}
</style>
