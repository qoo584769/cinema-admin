<template>
  <div
    v-if="showStatus"
    class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 overflow-auto "
    @click.stop="hide"
  >
    <div
      class="bg-white p-4 rounded w-4/5 h-4/5 absolute overflow-auto "
      @click.stop=""
    >
      <h2 class="text-xl font-bold mb-4">
        編輯影廳
      </h2>
      <!-- ---------------------- -->
      <div class="flex flex-wrap text-slate-700 pb-4">
        <div class="w-full max-w-full px-3 sm:w-4/12">
          <label for="">廳別</label>
          <div class="my-2">
            <button
              class="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md shadow-md focus:outline-none"
              @click="toggleDropdown"
            >
              <div class="flex items-center">
                <span class="">
                  {{ selectedOption.theaterType ? selectedOption.theaterType : '請選擇影廳' }}
                </span>
                <svg
                  v-if="isDropdownOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-4 h-4 ml-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-4 h-4 ml-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </button>
            <ul
              v-if="isDropdownOpen"
              class="absolute z-10 mt-2 py-2 w-40 bg-white rounded-md shadow-lg"
            >
              <li
                v-for="option in theaters"
                :key="option._id"
                class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                @click="selectOption(option)"
              >
                {{ option.theaterType }}
              </li>
            </ul>
          </div>
        </div>
        <!-- <label for="">電影ID</label>
        <input
          v-model="editingMovie._id"
          type="text"
        > -->
        <!-- class="py-2 px-4 bg-gray-200 text-gray-700 rounded-md shadow-md focus:outline-none" -->
        <div class="w-full max-w-full px-3 sm:w-8/12">
          <label for="">放映時間</label>
          <input
            v-model="movieDate"
            class="border my-2"
            type="text"
            placeholder="2000-01-01T00:00Z"
          >
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="editTheater"
          >
            新增電影場次
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded ml-2"
            @click="hide"
          >
            取消
          </button>
        </div>
      </div>

      <div class="rounded-xl border px-8 py-12">
        <ul class="grid grid-cols-3 gap-8">
          <li
            v-for="screen in filterMovieTime"
            :key="screen._id"
            class="rounded-xl border"
          >
            <div class="flex items-center p-4 border-b bg-gray-50">
              <img
                :src="screen.movieId.imgs[0]"
                alt=""
                class="block w-12 h-12 rounded-xl mr-3"
              >
              <span class="text-gray-900">{{ screen.movieId.name }}</span>
              <div class="ml-auto relative">
                <button
                  class=""
                  @click="toggleEditDropdown(screen._id)"
                >
                  <span class="opacity-0 absolute">編輯時間</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="w-5 h-5"
                  ><path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>
                </button>
                <ul
                  v-if="isEditDropdownOpen === screen._id"
                  class="absolute right-0 z-10 w-40 border bg-white rounded-md shadow-lg"
                >
                  <li
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    @click="editTheaterTime(screen._id,new Date(screen.startDate).toISOString().split('T')[0],new Date(screen.startDate).toISOString().split('T')[1].substr(0, 5))"
                  >
                    編輯
                  </li>
                </ul>
              </div>
            </div>
            <div class="px-6 border-b">
              <dl class="">
                <div class="flex justify-between items-center border-b py-3">
                  <dt class="text-gray-500">
                    廳別
                  </dt>
                  <dd class="text-gray-700">
                    {{ screen.theaterId.theaterType }}
                  </dd>
                </div>
                <div class="flex justify-between items-center border-b py-3">
                  <dt class="text-gray-500 w-1/4">
                    日期
                  </dt>
                  <dd
                    v-if="editInputId === screen._id"
                    class="w-3/4"
                  >
                    <input
                      v-model="startDate"
                      type="text"
                      class="border text-right rounded w-full text-gray-900"
                    >
                  </dd>
                  <dd
                    v-else
                    class="border border-transparent text-gray-700"
                  >
                    {{ new Date(screen.startDate).toISOString().split('T')[0] }}
                  </dd>
                </div>
                <div class="flex justify-between items-center py-3">
                  <dt class="text-gray-500 w-1/4">
                    時間
                  </dt>
                  <dd
                    v-if="editInputId === screen._id"
                    class="w-3/4"
                  >
                    <input
                      v-model="startTime"
                      type="text"
                      class="border text-right rounded w-full text-gray-900"
                    >
                  </dd>
                  <dd
                    v-else
                    class="border border-transparent text-gray-700"
                  >
                    {{ new Date(screen.startDate).toISOString().split('T')[1].substr(0, 5) }}
                  </dd>
                </div>
              </dl>
            </div>
            <div class="flex flex-wrap -my-[1px]">
              <input
                type="button"
                class="text-center py-4 w-full md:w-1/2 md:rounded-bl-lg border md:border-0"
                value="取消"
                :class="[editInputId !== screen._id ? 'cursor-not-allowed text-gray-500 md:border-r' : 'cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold']"
                :disabled="editInputId !== screen._id"
                @click="cancle"
              >
              <input
                type="button"
                class="text-center py-4 w-full md:w-1/2 md:rounded-br-lg border md:border-0 "
                value="更新"
                :class="[editInputId !== screen._id ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold']"
                :disabled="editInputId !== screen._id"
                @click="updateMovieTime(screen)"
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  show: {
    type: Boolean
  },
  movie: {
    type: Object,
    default: () => ({})
  },
  theaters: {
    type: Array,
    require: true,
    default: () => []
  }
})
const emit = defineEmits(['update', 'hide'])

// ------------更新場次
const toggle = ref(false)
const editInputId = ref('')
const startDate = ref('')
const startTime = ref('')
const toggleInput = () => {
  toggle.value = !toggle.value
}
const editTheaterTime = (id, date, time) => {
  if (id === isEditDropdownOpen.value) {
    startDate.value = date
    startTime.value = time
    editInputId.value = id
    isEditDropdownOpen.value = ''
    return
  }
  editInputId.value = ''
  toggleInput()
}
const updateMovieTimeApi = async (screenId, data) => {
  try {
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/screens/${screenId}`, data)
    startDate.value = res.data.data.startDate
    toggle.value = !toggle.value
  } catch (error) {
    console.log(error)
  }
}
const updateMovieTime = async (screen) => {
  const data = {
    seatsStatus: screen.seatsStatus,
    startDate: `${startDate.value}T${startTime.value}Z`,
    movieId: screen.movieId._id,
    theaterId: screen.theaterId._id
  }
  await updateMovieTimeApi(screen._id, data)
  await getScreen(movie.value._id)
  cancle()
}
const cancle = () => {
  editInputId.value = ''
  isEditDropdownOpen.value = ''
}
// ------------更新場次

const show = ref(false)
const movie = ref({})
const theaters = ref([])
const movieDate = ref('')
const movieTime = ref([])
const allMovieTime = ref([])
const editingMovie = ref({
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

const isDropdownOpen = ref(false)
const isEditDropdownOpen = ref('')
const selectedOption = ref({})
const hide = () => {
  selectedOption.value = {}
  movieDate.value = ''
  emit('hide')
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const toggleEditDropdown = (id) => {
  if (id === isEditDropdownOpen.value) {
    isEditDropdownOpen.value = ''
    editInputId.value = ''
    return
  }
  editInputId.value = ''
  isEditDropdownOpen.value = id
}

const selectOption = (option) => {
  selectedOption.value = option
  isDropdownOpen.value = false
}

const editTheater = async () => {
  const data = {
    movieId: editingMovie.value._id,
    theaterId: selectedOption.value._id,
    startDate: movieDate.value
  }

  if (!data.theaterId) {
    return alert('請選擇廳別')
  }
  if (!data.startDate) {
    return alert('請輸入場次時間')
  }
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/screens`, data)
    getScreen(movie.value._id)
    hide()
  } catch (error) {
    console.log(error)
    hide()
  }
}

const getScreen = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/screens/${id}/playDate`)
    movieTime.value = res.data.data
  } catch (error) {
    alert('取得影廳時間失敗 :' + error)
  }
}
const getAllTime = async () => {
  const movieId = movieTime.value[0].screen.movieId._id
  const type = movieTime.value[0].screen.theaterId.type
  const startDate = movieTime.value[0].screen.startDate
  const name = movieTime.value[0].screen.movieId.name
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/screens?movieId=${movieId}&type=${type}&startDate=${startDate}&name=${name}`)
    allMovieTime.value = res.data.data
  } catch (error) {
    alert('取得全部時間失敗 :' + error)
  }
}

const showStatus = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  show.value = props.show
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  movie.value = props.movie
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  theaters.value = props.theaters
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  editingMovie.value = { ...movie.value }
  // console.log(theaters.value)
  return show.value
})
const filterMovieTime = computed(() => {
  if (movieTime.value.length === 0) {
    return []
  }
  const filterData = allMovieTime.value.filter((item, index) => item.movieId._id.match(movieTime.value[0].screen.movieId._id)).sort((a, b) => b.startDate.localeCompare(a.startDate, 'zh-TW'))
  return filterData
})

watch(() => movie.value, (newVal, oldVal) => {
  if (movie.value === null) {
    return
  }
  if (movie.value._id) {
    getScreen(movie.value._id)
  }
})
watch(() => movieTime.value, (newVal, oldVal) => {
  if (movieTime.value[0] === undefined) {
    return
  }
  getAllTime()
})

onMounted(() => {
  show.value = props.show
})
onUnmounted(() => {
  show.value = false
  movie.value = {}
  editingMovie.value = {
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
  }
})

</script>

<style scoped lang="scss">
textarea {
  width: 100%;
}
</style>
