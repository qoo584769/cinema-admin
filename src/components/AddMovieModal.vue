<template>
  <div
    v-if="showStatus"
    class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-10"
  >
    <div class="bg-white p-4 rounded w-3/5 h-4/5 absolute overflow-auto">
      <h2 class="text-xl font-bold mb-4">
        新增電影
      </h2>

      <form @submit.prevent="addMovie">
        <div class="mb-4">
          <label
            for="name"
            class="block mb-2"
          >電影名稱</label>
          <input
            id="name"
            v-model="newMovie.name"
            type="text"
            class="border p-2 w-full"
            required
          >
        </div>
        <div class="mb-4">
          <label
            for="director"
            class="block mb-2"
          >導演</label>
          <input
            id="director"
            v-model="newMovie.director"
            type="text"
            class="border p-2 w-full"
            required
          >
        </div>
        <div class="mb-4">
          <label
            for="level"
            class="block mb-2"
          >分級</label>
          <input
            id="level"
            v-model="newMovie.level"
            type="text"
            class="border p-2 w-full"
            required
          >
        </div>
        <div class="mb-4">
          <label
            for="desc"
            class="block mb-2"
          >描述</label>
          <textarea
            id="desc"
            v-model="newMovie.desc"
            class="border p-2 w-full"
            required
          />
        </div>
        <div class="mb-4">
          <label
            for="time"
            class="block mb-2"
          >時長</label>
          <input
            id="time"
            v-model="newMovie.time"
            type="text"
            class="border p-2 w-full"
            required
          >
        </div>
        <div class="mb-4">
          <label
            for="imgs"
            class="block mb-2"
          >圖片</label>
          <input
            id="imgs"
            v-model="newImg"
            type="text"
            class="border p-2 w-full"
            required
          >
        </div>
        <div class="mb-4">
          <label
            for="actors"
            class="block mb-2"
          >演員</label>
          <input
            id="actors"
            v-model="newActor"
            type="text"
            class="border p-2 w-full"
            required
          >
        </div>
        <div class="mb-4">
          <label
            for="videos"
            class="block mb-2"
          >影片連結</label>
          <input
            id="videos"
            v-model="newVideo"
            type="text"
            class="border p-2 w-full"
            required
          >
        </div>
        <div class="mb-4">
          <label
            for="videoImg"
            class="block mb-2"
          >影片封面圖片</label>
          <input
            id="videoImg"
            v-model="newMovie.videoImg"
            type="text"
            class="border p-2 w-full"
            required
          >
        </div>
        <div class="mb-4">
          <label
            for="status"
            class="block mb-2"
          >狀態</label>
          <input
            id="status"
            v-model="newMovie.status"
            type="text"
            class="border p-2 w-full"
            required
          >
        </div>
        <div class="mb-4">
          <label
            for="releaseData"
            class="block mb-2"
          >上映日期</label>
          <input
            id="releaseData"
            v-model="newMovie.releaseData"
            type="text"
            class="border p-2 w-full"
            required
          >
        </div>

        <div class="mb-4">
          <div
            v-for="(image, index) in newProduct.images"
            :key="index"
          >
            <label :for="'image-' + index">圖片URL：{{ image.url }}</label>
            <input
              :id="'image-' + index"
              type="file"
              @change="handleImageUpload($event, index)"
            >
            <img
              v-if="image.url"
              :src="image.url"
              class=""
            >
            <button
              type="button"
              @click="removeImage(index)"
            >
              刪除
            </button>
          </div>
          <button
            type="button"
            @click="addImage"
          >
            新增圖片
          </button>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            新增
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
import { ref, computed } from 'vue'
import axios from 'axios'

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['show'])
const emit = defineEmits(['add', 'hide'])

const show = ref(false)

const newImg = ref('')
const newActor = ref('')
const newVideo = ref('')

const newMovie = ref({
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

const newProduct = ref({
  // name: '',
  images: [{ id: 1, url: '', alt: '' }]
})

const addImage = () => {
  const newImage = {
    id: newProduct.value.images.length + 1,
    url: '',
    alt: ''
  }

  newProduct.value.images.push(newImage)
}

const removeImage = (index) => {
  newProduct.value.images.splice(index, 1)
}

const handleImageUpload = async (event, index) => {
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await axios.post('https://crazymovie.onrender.com/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // 假設上傳成功後，將圖片的 URL 賦值給對應的圖片對象
    // response.data.url 是上傳成功後返回的圖片 URL
    newProduct.value.images[index].url = response.data.data.fileUrl
  } catch (error) {
    console.error(error)
  }
}

const addMovie = () => {
  newMovie.value.imgs.push(newImg.value)
  newMovie.value.actors.push(newActor.value)
  newMovie.value.videos.push(newVideo.value)
  emit('add', { ...newMovie.value })
  newMovie.value.name = ''
  newMovie.value.director = ''
  newMovie.value.level = ''
  newMovie.value.desc = ''
  newMovie.value.time = ''
  newMovie.value.imgs = []
  newMovie.value.actors = []
  newMovie.value.videos = []
  newMovie.value.videoImg = ''
  newMovie.value.status = ''
  newMovie.value.releaseData = ''

  newProduct.value.images = [{ id: 1, url: '', alt: '' }]
  // 其他欄位...
  hide()
}

const hide = () => {
  emit('hide')
}

const showStatus = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  show.value = props.show
  return show.value
})
</script>
