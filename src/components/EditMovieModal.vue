<template>
  <div
    v-if="showStatus"
    class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 overflow-auto "
    @click.stop="hide"
  >
    <div
      class="bg-white p-4 rounded w-3/5 h-4/5 absolute overflow-auto"
      @click.stop=""
    >
      <h2 class="text-xl font-bold mb-4 text-center text-slate-700">
        編輯電影
      </h2>
      <form @submit.prevent="updateMovie">
        <div class="flex flex-wrap text-slate-700">
          <div class="w-full max-w-full px-3 sm:w-6/12">
            <label
              for=""
              class="font-bold ml-1"
            >名稱</label>
            <input
              v-model="editingMovie.name"
              type="text"
              class="border p-2 my-2 rounded-lg"
              required
            >
          </div>

          <div class="w-full max-w-full px-3 sm:w-6/12">
            <label
              for=""
              class="font-bold ml-1"
            >導演</label>
            <input
              v-model="editingMovie.director"
              type="text"
              class="border p-2 my-2 rounded-lg"
              required
            >
          </div>

          <div class="w-full max-w-full px-3 sm:w-6/12">
            <label
              for=""
              class="font-bold ml-1"
            >海報</label>
            <input
              v-model="editingMovie.imgs"
              type="text"
              class="border p-2 my-2 rounded-lg"
              required
            >
          </div>

          <div class="w-full max-w-full px-3 sm:w-6/12">
            <label
              for=""
              class="font-bold ml-1"
            >分級</label>
            <input
              v-model="editingMovie.level"
              type="text"
              class="border p-2 my-2 rounded-lg"
              required
            >
          </div>

          <div class="w-full max-w-full px-3 sm:w-6/12">
            <label
              for=""
              class="font-bold ml-1"
            >放映時間</label>
            <input
              v-model="editingMovie.time"
              type="text"
              class="border p-2 my-2 rounded-lg"
              required
            >
          </div>

          <div class="w-full max-w-full px-3 sm:w-6/12">
            <label
              for=""
              class="font-bold ml-1"
            >演員</label>
            <input
              v-model="editingMovie.actors"
              type="text"
              class="border p-2 my-2 rounded-lg"
              required
            >
          </div>

          <div class="w-full max-w-full px-3 sm:w-6/12">
            <label
              for=""
              class="font-bold ml-1"
            >預告片</label>
            <input
              v-model="editingMovie.videos"
              type="text"
              class="border p-2 my-2 rounded-lg"
              required
            >
          </div>

          <div class="w-full max-w-full px-3 sm:w-6/12">
            <label
              for=""
              class="font-bold ml-1"
            >預告片圖片</label>
            <input
              v-model="editingMovie.videoImg"
              type="text"
              class="border p-2 my-2 rounded-lg"
              required
            >
          </div>

          <div class="w-full max-w-full px-3 sm:w-6/12">
            <label
              for=""
              class="font-bold ml-1"
            >上映狀態</label>
            <input
              v-model="editingMovie.status"
              type="text"
              class="border p-2 my-2 rounded-lg"
              required
            >
          </div>

          <div class="w-full max-w-full px-3 sm:w-6/12">
            <label
              for=""
              class="font-bold ml-1"
            >上映日期</label>
            <input
              v-model="editingMovie.releaseData"
              type="text"
              class="border p-2 my-2 rounded-lg"
              required
            >
          </div>

          <div class="w-full max-w-full px-3 sm:w-12/12">
            <label
              for=""
              class="font-bold ml-1"
            >電影說明</label>
            <textarea
              v-model="editingMovie.desc"
              class="border p-2 my-2 rounded-lg h-48"
              required
            />
          </div>
        </div>
        <!-- 其他欄位... -->
        <div class="flex justify-end px-3">
          <button
            type="submit"
            class="bg-green-500 text-white px-4 py-2 rounded"
          >
            更新
          </button>
          <button
            class="bg-red-500 text-white px-4 py-2 rounded ml-2"
            @click="hide"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['show', 'movie'])
const emit = defineEmits(['update', 'hide'])

const show = ref(false)
const movie = ref({})
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
const updateMovie = () => {
  emit('update', { ...editingMovie.value })
  hide()
}

const hide = () => {
  emit('hide')
}

const showStatus = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  show.value = props.show
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  movie.value = props.movie
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  editingMovie.value = { ...movie.value }
  return show.value
})

onMounted(() => {
  show.value = props.show
  movie.value = props.movie
  editingMovie.value = { ...movie.value }
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
input, textarea {
  margin-bottom: 24px;
  width: 100%;
}
</style>
