<template>
  <div class="">
    <div
      class="bg-[#171818] backdrop-blur-sm overflow-auto rounded-[20px] p-[20px]"
      @click.stop=""
    >
      <h2 class="text-xl font-bold my-4 text-center text-white">
        新增電影
      </h2>

      <form @submit.prevent="addMovie">
        <div class="flex flex-wrap text-white/80">
          <div class="w-full max-w-full px-3 sm:w-6/12 relative">
            <!-- <label
              for="name"
              class="font-bold ml-1"
            >電影名稱</label>
            <input
              id="name"
              v-model="newMovie.name"
              type="text"
              class="border p-2 my-2 rounded-lg"
              required
            > -->

            <input
              id="floating_movie_title"
              v-model="newMovie.name"
              type="text"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-sm text-[#E7C673] bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E7C673] focus:outline-none focus:ring-0 focus:border-[#E7C673] peer"
              placeholder=" "
              required
            >
            <label
              for="floating_movie_title"
              class="absolute text-md duration-300 transform -translate-y-4 scale-75 px-4 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >電影名稱</label>
          </div>
          <div class="w-full max-w-full px-3 sm:w-6/12 relative">
            <input
              id="director"
              v-model="newMovie.director"
              type="text"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-sm text-[#E7C673] bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E7C673] focus:outline-none focus:ring-0 focus:border-[#E7C673] peer"
              placeholder=" "
              required
            >
            <label
              for="director"
              class="absolute text-md duration-300 transform -translate-y-4 scale-75 px-4 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >導演</label>
          </div>
          <div class="w-full max-w-full px-3 sm:w-6/12 relative">
            <input
              id="level"
              v-model="newMovie.level"
              type="text"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-sm text-[#E7C673] bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E7C673] focus:outline-none focus:ring-0 focus:border-[#E7C673] peer"
              placeholder=" "
              required
            >
            <label
              for="level"
              class="absolute text-md duration-300 transform -translate-y-4 scale-75 px-4 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >分級</label>
          </div>

          <div class="w-full max-w-full px-3 sm:w-6/12 relative">
            <input
              id="time"
              v-model="newMovie.time"
              type="text"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-sm text-[#E7C673] bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E7C673] focus:outline-none focus:ring-0 focus:border-[#E7C673] peer"
              placeholder=" "
              required
            >
            <label
              for="time"
              class="absolute text-md duration-300 transform -translate-y-4 scale-75 px-4 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >時長</label>
          </div>
          <div class="w-full max-w-full px-3 sm:w-6/12 relative">
            <input
              id="imgs"
              v-model="newImg"
              type="text"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-sm text-[#E7C673] bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E7C673] focus:outline-none focus:ring-0 focus:border-[#E7C673] peer"
              placeholder=" "
              required
            >
            <label
              for="imgs"
              class="absolute text-md duration-300 transform -translate-y-4 scale-75 px-4 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >圖片</label>
          </div>
          <div class="w-full max-w-full px-3 sm:w-6/12 relative">
            <input
              id="actors"
              v-model="newActor"
              type="text"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-sm text-[#E7C673] bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E7C673] focus:outline-none focus:ring-0 focus:border-[#E7C673] peer"
              placeholder=" "
              required
            >
            <label
              for="actors"
              class="absolute text-md duration-300 transform -translate-y-4 scale-75 px-4 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >演員</label>
          </div>
          <div class="w-full max-w-full px-3 sm:w-6/12 relative">
            <input
              id="videos"
              v-model="newVideo"
              type="text"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-sm text-[#E7C673] bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E7C673] focus:outline-none focus:ring-0 focus:border-[#E7C673] peer"
              placeholder=" "
              required
            >
            <label
              for="videos"
              class="absolute text-md duration-300 transform -translate-y-4 scale-75 px-4 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >影片連結</label>
          </div>
          <div class="w-full max-w-full px-3 sm:w-6/12 relative">
            <input
              id="videoImg"
              v-model="newMovie.videoImg"
              type="text"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-sm text-[#E7C673] bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E7C673] focus:outline-none focus:ring-0 focus:border-[#E7C673] peer"
              placeholder=" "
              required
            >
            <label
              for="videoImg"
              class="absolute text-md duration-300 transform -translate-y-4 scale-75 px-4 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >影片封面圖片</label>
          </div>
          <div class="w-full max-w-full px-3 sm:w-6/12 relative">
            <input
              id="status"
              v-model="newMovie.status"
              type="text"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-sm text-[#E7C673] bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E7C673] focus:outline-none focus:ring-0 focus:border-[#E7C673] peer"
              placeholder=" "
              required
            >
            <label
              for="status"
              class="absolute text-md duration-300 transform -translate-y-4 scale-75 px-4 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >狀態</label>
          </div>
          <div class="w-full max-w-full px-3 sm:w-6/12 relative">
            <input
              id="releaseData"
              v-model="newMovie.releaseData"
              type="text"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-sm text-[#E7C673] bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E7C673] focus:outline-none focus:ring-0 focus:border-[#E7C673] peer"
              placeholder=" "
              required
            >
            <label
              for="releaseData"
              class="absolute text-md duration-300 transform -translate-y-4 scale-75 px-4 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >上映日期</label>
          </div>
          <div class="w-full max-w-full px-3 sm:w-12/12 relative">
            <textarea
              id="desc"
              v-model="newMovie.desc"
              class="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-sm text-[#E7C673] bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E7C673] focus:outline-none focus:ring-0 focus:border-[#E7C673] peer"
              placeholder=" "
              required
            />
            <label
              for="desc"
              class="absolute text-md duration-300 transform -translate-y-4 scale-75 px-4 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >電影說明</label>
          </div>
          <div class="w-full max-w-full px-3 sm:w-12/12">
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
                class="bg-blue-500 text-white px-4 py-2 rounded"
                @click="addImage"
              >
                新增圖片
              </button>
              <button
                type="button"
                class="bg-red-500 text-white px-4 py-2 rounded ml-2"
                @click="removeImage(index)"
              >
                刪除圖片
              </button>
            </div>
          </div>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

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
  if (newProduct.value.images.length === 1) {
    return
  }
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
  addMovieApi({ ...newMovie.value })
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
}

const addMovieApi = async (movie) => {
  // movies.value.push({ ...movie })
  const data = movie

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/movie`, {
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
    if (res) {
      hide()
    }
  } catch (error) {
    console.log('新增電影失敗')
    console.log(error)
  }
}

const hide = () => {
  router.push('/admin/movies')
}
</script>

<style scoped lang="scss">
input, textarea {
  margin-bottom: 24px;
  width: 100%;
}</style>
