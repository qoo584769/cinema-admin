<template>
  <div class="w-full bg-[#0f0f0f]">
    <div class="flex flex-wrap md:flex-nowrap max-w-7xl mx-auto">
      <!-- 側邊欄 -->
      <div class="bg-[#171818] backdrop-blur-[30px] w-full text-white flex flex-col order rounded-[20px] md:w-[360px]">
        <div class="p-4 flex justify-between">
          <h1 class="text-2xl font-bold">
            Dashboard
          </h1>
          <button
            type="button"
            class="text-white md:hidden"
            @click.prevent="toggleSidebar"
          >
            <svg
              class="block h-6 w-6"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div
          class="h-full md:flex flex-col justify-between"
          :class="{ 'hidden': !showSidebar }"
        >
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
      </div>
      <!-- 主要內容 -->
      <div class="w-full bg-gray-900/[0.5] backdrop-blur-sm">
        <!-- <h2 class="text-2xl font-bold mb-4 text-white">
          主要內容
        </h2> -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import movieIcon from '../../src/assets/images/movie.svg'

const menuItems = ref([
  { id: 1, name: '首頁', path: '/admin' },
  { id: 2, name: '設定', path: '/admin/settings' },
  { id: 3, name: '電影', path: '/admin/movies' }
  // { id: 3, name: '統計', path: '/admin/statistics' },
  // { id: 4, name: '使用者', path: '/admin/users' }
])

const router = useRouter()

const showSidebar = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
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
