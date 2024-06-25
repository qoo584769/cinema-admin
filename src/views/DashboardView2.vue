<template>
  <div class="container mx-auto pr-3">
    <h1 class="text-2xl font-bold mb-4 text-white">
      電影清單123
    </h1>

    <!-- 新增電影按鈕 -->
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      @click="showAddMovieModal"
    >
      新增電影
    </button>
    <!-- 電影清單 -->
    <table class="table-fixed text-white w-full">
      <thead class="border">
        <tr>
          <th class="px-2 py-2 text-left">
            名稱
          </th>
          <th class="px-2 py-2 text-left">
            導演
          </th>
          <th class="px-2 py-2">
            分級
          </th>
          <th class="px-2 py-2">
            時間
          </th>
          <!-- <th class="px-2 py-2 text-left">
            演員
          </th> -->
          <th class="px-2 py-2">
            上映狀態
          </th>
          <th class="px-2 py-2 text-left">
            上映日期
          </th>
          <th class="px-2 py-2 ">
            編輯電影
          </th>
          <th class="px-2 py-2 ">
            編輯影廳
          </th>
        </tr>
      </thead>
      <tbody class="">
        <tr
          v-for="(movie, index) in movies"
          :key="index"
          class="border p-2 mb-2 text-white"
        >
          <td class="px-2 py-2 min-w-[50px] ">
            {{ movie.name }}
          </td>
          <td class="px-2 py-2 min-w-[50px] ">
            {{ movie.director }}
          </td>
          <td class="px-2 py-2 min-w-[50px]  text-center">
            {{ movie.level }}
          </td>
          <td class="px-2 py-2 min-w-[50px] text-center">
            {{ movie.time }}
          </td>
          <!-- <td class="px-2 py-2 min-w-[50px]  ">
            {{ movie.actors.join(',') }}
          </td> -->
          <td class="px-2 py-2 min-w-[50px]  text-center">
            {{ movie.status }}
          </td>
          <td class="px-2 py-2 min-w-[50px] ">
            {{ `${new Date(movie?.releaseData).toISOString().split('T')[0]}` }}
          </td>
          <td class="px-2 py-2 min-w-[50px] ">
            <button
              class="bg-yellow-500 text-white px-4 py-1 rounded ml-2"
              @click="showEditMovieModal(index)"
            >
              編輯電影
            </button>
          </td>
          <td class="px-2 py-2 min-w-[50px] ">
            <button
              class="bg-yellow-500 text-white px-4 py-1 rounded ml-2"
              @click="showMovieTheaterModal(index)"
            >
              編輯影廳
            </button>
          </td>
        </tr>
      </tbody>
    </table>

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

    <!-- 編輯影廳彈出式視窗 -->
    <edit-theater-modal
      :show="showTheaterModal"
      :movie="theaterModalMovie"
      :theaters="theaters"
      @update="updateMovie"
      @hide="hideMovieTheaterModal"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AddMovieModal from '../components/AddMovieModal.vue'
import EditMovieModal from '../components/EditMovieModal.vue'
import EditTheaterModal from '../components/EditTheaterModal.vue'
import axios from 'axios'

const router = useRouter()
const hasBearerToken = ref(false)

const movies = ref([
  {
    name: '',
    director: '',
    imgs: [],
    level: '',
    desc: '',
    time: '',
    actors: [''],
    videos: [''],
    videoImg: '',
    status: '',
    releaseData: ''
  }
])

// eslint-disable-next-line no-unused-vars
const newMovie = reactive({
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

const theaters = ref([])

const editingMovie = ref(null)
const theaterModalMovie = ref(null)
const showAddModal = ref(false)
const showEditModal = ref(false)
const showTheaterModal = ref(false)

const addMovie = async (movie) => {
  movies.value.push({ ...movie })
  const data = movie

  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/movie`, {
      name: `${data.name}`,
      director: `${data.director}`,
      imgs: [`${data.imgs[0]}`],
      level: `${data.level}`,
      desc: `${data.desc}`,
      time: `${data.time}`,
      actors: [`${data.actors[0]}`],
      videos: [`${data.videos[0]}`],
      videoImg: `${data.videoImg}`,
      status: `${data.status}`,
      releaseData: `${data.releaseData}`
    })
    fetchData()
  } catch (error) {

  }
}

const updateMovie = async (movie) => {
  const { name, director, imgs, level, desc, time, actors, videoImg, videos, status, releaseData } = movie
  const data = {
    name,
    director: `${director}`,
    imgs: [`${imgs[0]}`],
    level: `${level}`,
    desc: `${desc}`,
    time: `${time}`,
    actors: [`${actors[0]}`],
    videos: [`${videos[0]}`],
    videoImg: `${videoImg}`,
    status: `${status}`,
    releaseData: `${releaseData}`
  }
  console.log('update movie')
  console.log(data)
  try {
    await axios.patch(`${import.meta.env.VITE_API_URL}/api/movie/${movie._id}`, data)
  } catch (error) {
    alert(`更新電影失敗 : ${error}`)
  }
  movies.value.splice(movies.value.indexOf(editingMovie.value), 1, { ...movie })
  editingMovie.value = null
  fetchData()
  getTheater()
}

const showAddMovieModal = () => {
  showAddModal.value = true
}

const hideAddMovieModal = () => {
  showAddModal.value = false
}

const showEditMovieModal = (index) => {
  editingMovie.value = { ...movies.value[index] }
  showEditModal.value = true
}

const hideEditMovieModal = () => {
  showEditModal.value = false
}

const showMovieTheaterModal = (index) => {
  theaterModalMovie.value = { ...movies.value[index] }
  showTheaterModal.value = true
}

const hideMovieTheaterModal = () => {
  showTheaterModal.value = false
}

const fetchData = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/movie`)
    // eslint-disable-next-line no-const-assign
    movies.value = res.data.data.data
    console.log(res)
  } catch (error) {
    alert('取得電影資料失敗 : ' + error)
  }
}

const getTheater = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/theater`)
    console.log(res.data.data)
    theaters.value = res.data.data
  } catch (error) {
    alert('取得影廳資料失敗 : ' + error)
  }
}

const checkBearerToken = async () => {
  // 從axios的標頭中獲取Bearer Token
  const bearerToken = axios.defaults.headers.common.Authorization

  // 檢查是否有Bearer Token
  if (bearerToken) {
    hasBearerToken.value = true
    fetchData()
    getTheater()
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
// onMounted(fetchData)
</script>

<style scoped lang="scss">
/* 可以在這裡自訂樣式 */
.max-w-100 {
  max-width: 100px;
}
.max-w-200 {
  max-width: 200px;
}
</style>
