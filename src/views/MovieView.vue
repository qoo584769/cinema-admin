<template>
  <div class="container mx-auto pr-3 min-h-screen flex flex-col">
    <h1 class="text-2xl font-bold mb-4 text-white">
      電影清單
    </h1>

    <!-- 新增電影按鈕 -->
    <router-link
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      to="/admin/AddNewMovie"
      @click="showAddMovieModal"
    >
      新增電影
    </router-link>
    <div class="mb-3">
      <label
        for="numId"
        class="text-white mr-2"
      >每頁數量</label>
      <input
        id="numId"
        v-model.number="itemsPerPage"
        type="text"
        class=""
        @change="changeItemsPerPage"
      >
    </div>
    <!-- 電影清單 -->
    <div class="flex-grow">
      <table class="table-fixed text-white w-full ">
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
        <tbody v-if="!paginatedMovies.length" />
        <tbody
          v-else
          class=""
        >
          <tr
            v-for="(movie, index) in paginatedMovies"
            :key="movie._id"
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

            <!-- 避免初始化無資料顯示錯誤 -->
            <td
              v-if="movie.releaseData"
              class="px-2 py-2 min-w-[50px] "
            >
              {{ `${new Date(movie.releaseData).toISOString().split('T')[0]}` }}
            </td>
            <td
              v-else
              class="px-2 py-2 min-w-[50px] "
            >
              {{ }}
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
            <!-- <td class="px-2 py-2 min-w-[50px] ">
              <button
                class="bg-yellow-500 text-white px-4 py-1 rounded ml-2"
                @click="goEditTheater(movie._id)"
              >
                跳頁編輯影廳 {{ movie._id }}
              </button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
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

    <!-- 頁碼 -->
    <pagination-component
      :movie="movies"
      :items-per-page="+itemsPerPage"
      @emit-movie="updatePaginatedMovie"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import EditMovieModal from '../components/EditMovieModal.vue'
import EditTheaterModal from '../components/EditTheaterModal.vue'
import PaginationComponent from '../components/PaginationComponent.vue'
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

const paginatedMovies = ref([{
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
}])

// 預設目前頁數
const currentPage = ref(1)
// 每頁顯示的數量
const itemsPerPage = ref(5)

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
const theaterModalMovie = ref({})
const showAddModal = ref(false)
const showEditModal = ref(false)
const showTheaterModal = ref(false)

const updateMovie = async (movie) => {
  const { _id, name, director, imgs, level, desc, time, actors, videoImg, videos, status, releaseData } = movie

  const data = {
    name,
    director: `${director}`,
    imgs: [`${imgs[0]}`],
    level: `${level}`,
    desc: `${desc}`,
    time: `${time}`,
    actors: [`${actors}`],
    videos: [`${videos[0]}`],
    videoImg: `${videoImg}`,
    status: `${status}`,
    releaseData: `${releaseData}`
  }

  try {
    await axios.patch(`${import.meta.env.VITE_API_URL}/api/movie/${_id}`, data)
    movies.value.splice(movies.value.indexOf(editingMovie.value), 1, { ...movie })
    editingMovie.value = null
    await fetchData()
    await getTheater()
  } catch (error) {
    alert(`更新電影失敗 : ${error}`)
  }
}

const updatePaginatedMovie = (emitData) => {
  paginatedMovies.value = emitData
}

const showAddMovieModal = () => {
  showAddModal.value = true
}

const showEditMovieModal = (index) => {
  editingMovie.value = { ...paginatedMovies.value[index] }
  showEditModal.value = true
}

const hideEditMovieModal = () => {
  showEditModal.value = false
}

const showMovieTheaterModal = (index) => {
  theaterModalMovie.value = { ...paginatedMovies.value[index] }
  showTheaterModal.value = true
}

const hideMovieTheaterModal = () => {
  showTheaterModal.value = false
}

// 初始化頁碼資料 剛建立的元件取不到子元件分好的資料
const paginatedData = () => {
  const startPage = (currentPage.value - 1) * itemsPerPage.value
  const endPage = startPage + itemsPerPage.value
  if (endPage < 2) {
    paginatedMovies.value = movies.value.slice(startPage, 2)
    return
  }
  paginatedMovies.value = movies.value.slice(startPage, endPage)
}
// 更改每頁顯示數量 直接在v-model使用 || 會顯示錯誤
const changeItemsPerPage = () => {
  if (typeof (itemsPerPage.value) === 'string') {
    return 2
  }
  return itemsPerPage.value
}
const fetchData = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/movie`)
    // eslint-disable-next-line no-const-assign
    movies.value = res.data.data.data
    paginatedData()
  } catch (error) {
    alert('取得電影資料失敗 : ' + error)
  }
}

const getTheater = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/theater`)
    theaters.value = res.data.data
  } catch (error) {
    alert('取得影廳資料失敗 : ' + error)
  }
}

// const goEditTheater = async (id) => {
//   router.push(`/admin/EditTheater/${id}`)
// }

const checkBearerToken = async () => {
  // 從axios的標頭中獲取Bearer Token
  const bearerToken = axios.defaults.headers.common.Authorization

  // 檢查是否有Bearer Token
  if (bearerToken) {
    hasBearerToken.value = true
    await fetchData()
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
