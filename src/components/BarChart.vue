<template>
  <!-- <div class="flex items-end"> -->
  <div
    ref="barChart"
    class="w-full py-8 px-4 md:py-10 md:px-6 bg-black"
  >
    <div class="w-full overflow-x-scroll">
      <div class="flex">
        <!-- 垂直基準線排列 -->
        <!-- <div
          ref="text"
          class="flex flex-col-reverse border border-gray-200"
        >
          <div
            v-for="(item,index) in genStander"
            :key="index"
            class="flex items-end justify-end text-white h-[200px] "
          >
            {{ item.value }}
          </div>
        </div> -->

        <!-- 長條圖排列 -->
        <div class="flex items-end border border-gray-600">
          <div
            v-for="(data,index) in genetateData"
            :key="index"
            class="flex justify-center"
            :style="genMargin(genetateData)"
          >
            <!-- <div class=""> -->
            <!-- <div
                class="w-[30px]"
                :style="genTopStyle(data.value)"
              /> -->
            <div
              class="w-[30px]"
              :style="genStyle(data.value)"
            />
            <!-- </div> -->
          </div>
        </div>
      </div>
      <!-- 下方數值排列 -->
      <div
        class="grid "
        :style="genStanderLength(genetateData)"
      >
        <div
          v-for="(data,index) in genetateData"
          :key="index"
          class=" text-white text-center mt-4"
        >
          <span
            class="text block"
          >
            {{ data.value }} 分
          </span>
          <span
            class="text"
          >
            {{ data.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const barChart = ref(null)
const text = ref(0)

const barChartWidth = ref(0)
const textWidth = ref(0)

// 測試資料變數
const movies = ref([])

const genetateData = computed(() => {
  const data = []
  movies.value.forEach((val, index) => {
    data.push({ name: val.name, value: val.time })
  })
  return data
})

const genStyle = (nowData) => {
  return {
    height: nowData * 1 + 'px',
    background: 'linear-gradient(#8D7129 0%, #E7C673 100%)'
  }
}

const genMargin = (nowData) => {
  return {
    width: barChartWidth.value / (nowData.length + 0) + 'px'
  }
}

const genStanderLength = (nowData) => {
  return {
    gridTemplateColumns: `repeat(${nowData.length + 0}, minmax(0, 1fr))`,
    paddingLeft: `${textWidth.value}` + 'px'
  }
}

// 測試抓資料 開始
const fetchData = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/movie`)
    // eslint-disable-next-line no-const-assign
    movies.value = res.data.data.data
    console.log(movies.value)
  } catch (error) {
    alert('取得電影資料失敗 : ' + error)
  }
}

// 測試抓資料 結束

onMounted(() => {
  barChartWidth.value = barChart.value.clientWidth
  textWidth.value = text.value.clientWidth
  fetchData()
})
</script>

<style lang="scss" scoped>

</style>
