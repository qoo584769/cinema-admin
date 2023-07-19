<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-white">
      電影清單
    </h1>

    <!-- 新增電影按鈕 -->
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      @click="showAddMovieModal"
    >
      新增電影
    </button>

    <!-- 電影清單 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
      <div
        v-for="(movie,index) in movies"
        :key="index"
        class="bg-gray-800 p-4 rounded-lg"
      >
        <h2 class="text-xl font-bold text-white">
          {{ movie.name }}
        </h2>
        <p class="text-gray-300">
          {{ movie.director }}
        </p>
        <div class="mt-4">
          <strong class="text-white">圖片：</strong>
          <ul>
            <li
              v-for="(img, imgIndex) in movie.imgs"
              :key="imgIndex"
              class="text-gray-300"
            >
              <!-- {{ img }} -->
              <img
                :src="img"
                alt=""
              >
            </li>
          </ul>
        </div>
        <div class="mt-2">
          <strong class="text-white">等級：</strong>{{ movie.level }}
        </div>
        <div class="mt-2">
          <strong class="text-white">描述：</strong>{{ movie.desc }}
        </div>
        <div class="mt-2">
          <strong class="text-white">時長：</strong>{{ movie.time }}
        </div>
        <div class="mt-2">
          <strong class="text-white">演員：</strong>
          <!-- <ul>
            <li
              v-for="(actor, actorIndex) in movie.actors"
              :key="actorIndex"
              class="text-gray-300"
            >
              {{ actor }}
            </li>
          </ul> -->
          {{ movie.actors.join(',') }}
        </div>
        <div class="mt-2">
          <strong class="text-white">影片：</strong>
          <ul>
            <li
              v-for="(video, videoIndex) in movie.videos"
              :key="videoIndex"
              class="text-gray-300"
            >
              {{ video }}
            </li>
          </ul>
        </div>
        <div class="mt-2">
          <strong class="text-white">影片圖片：</strong>{{ movie.videoImg }}
        </div>
        <div class="mt-2">
          <strong class="text-white">狀態：</strong>{{ movie.status }}
        </div>
        <div class="mt-2">
          <strong class="text-white">上映日期：</strong>{{ movie.releaseData }}
        </div>
        <div class="mt-4">
          <button
            class="bg-yellow-500 text-white px-2 py-1 rounded"
            @click="showEditMovieModal(index)"
          >
            編輯
          </button>
        </div>
      </div>
    </div>

    <!-- 新增電影彈出式視窗 -->
    <add-movie-modal
      :show="showAddModal"
      @add="addMovie"
      @hide="hideAddMovieModal"
    />

    <!-- 編輯電影彈出式視窗 -->
    <edit-movie-modal
      :show="showEditModal"
      :movie="editingMovie"
      @update="updateMovie"
      @hide="hideEditMovieModal"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import AddMovieModal from '../components/AddMovieModal.vue'
import EditMovieModal from '../components/EditMovieModal.vue'

const router = useRouter()
const hasBearerToken = ref(false)

const movies = reactive([])

// eslint-disable-next-line no-unused-vars
const newMovie = reactive({
  id: '',
  name: '',
  director: '',
  imgs: [],
  level: '',
  desc: '',
  time: '',
  actors: [],
  videos: [],
  videoImg: '',
  status: '',
  releaseData: ''
})

const editingMovie = ref(null)
const showAddModal = ref(false)
const showEditModal = ref(false)

const addMovie = (movie) => {
  movies.push({ ...movie })
}

const updateMovie = (movie) => {
  const elIndex = movies.findIndex(item => item.id === editingMovie.value.id)
  console.log(movie)
  console.log(movies.indexOf(editingMovie.value))
  // movies.splice(movies.indexOf(editingMovie.value), 1, { ...movie })
  movies.splice(movies[elIndex], 1, { ...movie })
  editingMovie.value = null
}

const showAddMovieModal = () => {
  showAddModal.value = true
}

const hideAddMovieModal = () => {
  showAddModal.value = false
}

const showEditMovieModal = (index) => {
  editingMovie.value = { ...movies[index] }
  showEditModal.value = true
}

const hideEditMovieModal = () => {
  showEditModal.value = false
}

const checkBearerToken = async () => {
  // 從axios的標頭中獲取Bearer Token
  const bearerToken = axios.defaults.headers.common.Authorization

  // 檢查是否有Bearer Token
  if (bearerToken) {
    hasBearerToken.value = true
  } else {
    redirectToLogin()
  }
}

const redirectToLogin = () => {
  router.push('/login')
}

onMounted(() => {
  checkBearerToken()
})
</script>

<style>
/* 可以在這裡自訂樣式 */
</style>
