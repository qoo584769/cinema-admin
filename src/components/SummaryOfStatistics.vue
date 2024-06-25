<template>
  <div class="py-8 px-4 md:py-10 md:px-6 bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    <div
      v-for="(item,index) in statisticsData"
      :key="index"
      class="bg-transparent flex items-center border border-gray-600"
    >
      <div class="bg-gray-200 bg-opacity-20 p-6 mr-6">
        <img
          :src="item.icon"
          class="block w-12 h-12 text-2xl"
          alt=""
        >
      </div>
      <div class="">
        <h2 class="text-lg font-bold text-gray-400">
          {{ item.title }}
        </h2>
        <p class="text-xl text-white">
          {{ item.num }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
// import axios from 'axios'

const statisticsData = ref([{
  icon: '../../src/assets/images/movie-play.svg',
  title: '總票房',
  num: 10
}, {
  icon: '../../src/assets/images/movie-play.svg',
  title: '總票房',
  num: 10
}, {
  icon: '../../src/assets/images/movie-play.svg',
  title: '總票房',
  num: 10
}, {
  icon: '../../src/assets/images/movie-play.svg',
  title: '總票房',
  num: 10
}, {
  icon: '../../src/assets/images/movie-play.svg',
  title: '總票房',
  num: 10
}])

onMounted(() => {
})
</script>

<style>
/* 可以在這裡自訂樣式 */
</style>
