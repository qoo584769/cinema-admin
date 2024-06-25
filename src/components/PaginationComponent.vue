<template>
  <div class="">
    <div
      v-for="item in paginatedData"
      :key="item._id"
      class=""
    />
    <div class="mb-3">
      <ul class="flex justify-center">
        <!-- 第一頁按鈕 -->
        <li class="">
          <button
            type="button"
            :disabled="currentPage === 1"
            class="px-3 h-8"
            :class="currentPage === 1? activeClass: noneActiveClass"
            @click="firLastPage('fir')"
          >
            &laquo;
          </button>
        </li>
        <!-- 上一頁按鈕 -->
        <li class="">
          <button
            type="button"
            :disabled="currentPage === 1"
            class="px-3 h-8"
            :class="currentPage === 1? activeClass: noneActiveClass"
            @click="preNextPage('prev')"
          >
            &lt;
          </button>
        </li>
        <!-- 頁碼按鈕 -->
        <li
          v-for="(pageNum) in displayedPages"
          :key="pageNum"
          class=""
        >
          <button
            v-if="pageNum !=='...'"
            type="button"
            class="px-3 h-8"
            :class="pageNum === currentPage ? activeClass: noneActiveClass"
            @click="currentPage = pageNum"
          >
            {{ pageNum }}
          </button>
          <button
            v-else
            type="button"
            class="px-3 h-8"
            :class="pageNum === currentPage ? activeClass: noneActiveClass"
          >
            {{ pageNum }}
          </button>
        </li>
        <!-- 下一頁按鈕 -->
        <li class="">
          <button
            type="button"
            :disabled="currentPage === totalPage"
            class="px-3 h-8"
            :class="currentPage === totalPage? activeClass: noneActiveClass"
            @click="preNextPage('next')"
          >
            &gt;
          </button>
        </li>
        <!-- 最後頁按鈕 -->
        <li class="">
          <button
            type="button"
            :disabled="currentPage === totalPage "
            class="px-3 h-8"
            :class="currentPage === totalPage? activeClass: noneActiveClass"
            @click="firLastPage('last')"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// 父組件傳進來的資料
const props = defineProps({
  movie: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: false,
    default: 10
  }
})
// 分頁過後的資料傳給父組件
const emit = defineEmits(['emitMovie'])

// 預設目前頁數
const currentPage = ref(1)
// 每頁顯示的數量
// const itemsPerPage = ref()
// 資料來源
const movie = computed(() => {
  return props.movie
})
// 總頁數
const totalPage = computed(() => Math.ceil(movie.value.length / parseInt(props.itemsPerPage)))
// 頁數設定
const paginatedData = computed(() => {
  const startPage = (currentPage.value - 1) * parseInt(props.itemsPerPage)
  const endPage = startPage + parseInt(props.itemsPerPage)
  if (endPage < 2) {
    emit('emitMovie', movie.value.slice(startPage, 2))
    return movie.value.slice(startPage, 2)
  }
  emit('emitMovie', movie.value.slice(startPage, endPage))
  return movie.value.slice(startPage, endPage)
})
// 上一頁下一頁切換按鈕
const preNextPage = (page) => {
  if (page === 'prev' && currentPage.value > 1) {
    currentPage.value--
  } else if (page === 'next' && currentPage.value < totalPage.value) {
    currentPage.value++
  }
}
// 第一頁最後一頁按鈕
const firLastPage = (page) => {
  if (page === 'fir') {
    currentPage.value = 1
  } else if (page === 'last') {
    currentPage.value = totalPage.value
  }
}
// 頁數超過加入三個點
const displayedPages = computed(() => {
  if (totalPage.value <= 5) {
    return Array.from({ length: totalPage.value }, (v, i) => i + 1)
  } else {
    const startPage = Math.max(1, currentPage.value - 2)
    const endPage = Math.min(currentPage.value + 2, totalPage.value)
    const pages = []
    if (startPage > 1) pages.push('...')
    Array.from({ length: endPage - startPage + 1 }, (v, i) => i + startPage).forEach(page => {
      pages.push(page)
    })
    if (endPage < totalPage.value) pages.push('...')
    return pages
  }
})
// active頁碼CSS
const activeClass = computed(() => {
  return 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white'
})
// none-active頁碼CSS
const noneActiveClass = computed(() => {
  return 'border border-gray-300 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
})

onMounted(() => {
  // itemsPerPage.value = parseInt(props.itemsPerPage)
})
</script>

<style lang="scss" scoped>

</style>
