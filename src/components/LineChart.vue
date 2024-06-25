<template>
  <div class="py-8 px-4 md:py-10 md:px-6 bg-black grid grid-cols-2 gap-6 ">
    <div class="p-10 bg-[#393a3a33] ">
      <div class="text-white pb-6 mb-10 border-b-2 border-gray-600">
        每月註冊會員數量
      </div>
      <div class="">
        <!-- <svg
          ref="chart"
          class="chart"
          viewBox="0 0 200 100"
        > -->

        <!--           底下日期 -->

        <!--           左邊標示 -->

        <!--           資料數值 -->

        <!--           資料圓圈 -->

        <!-- </svg> -->
      </div>
      <!-- <div class="chart-container">
        <svg
          :width="width"
          :height="height"
        >
          <line
            v-for="(line,index) in verticalLines"
            :key="index"
            :x1="line.x"
            :y1="0"
            :x2="line.x"
            :y2="height"
            class="vertical-line"
          />
          <line
            v-for="(line,index) in horizontalLines"
            :key="index"
            :x1="0"
            :y1="line.y"
            :x2="width"
            :y2="line.y"
            class="horizontal-line"
          />
          <polyline
            :points="linePoints"
            class="line-chart"
          />
          <circle
            v-for="(point,index) in dataPoints"
            :key="index"
            :cx="point.x"
            :cy="point.y"
            r="4"
            class="data-point"
          />
        </svg>
      </div> -->

      <div
        ref="chartWrapper"
        class="overflow-visible border"
      >
        <svg
          ref="svg"
          class=""
          width="100%"
          :height="height"
        >
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
              gradientUnits="objectBoundingBox"
            >
              <stop
                offset="0%"
                stop-color="#393A3A"
                stop-opacity="1"
              />
              <stop
                offset="100%"
                stop-color="#393A3A"
                stop-opacity="0"
              />
            </linearGradient>
          </defs>
          <g
            ref="g"
            class=""
          >
            <!-- 繪製座標軸 -->
            <!-- <line
              :x1="padding"
              :y1="height - padding"
              :x2="width - padding"
              :y2="height - padding"
              stroke="black"
            />
            <line
              :x1="padding"
              :y1="padding"
              :x2="padding"
              :y2="height - padding"
              stroke="black"
            /> -->
            <line
              :x1="textWidth + paddingLeft"
              :y1="height - dateHeight - paddingButtom"
              :x2="width "
              :y2="height - dateHeight - paddingButtom"
              stroke="black"
            />
            <line
              :x1="textWidth + paddingLeft"
              :y1="0"
              :x2="textWidth + paddingLeft"
              :y2="height - dateHeight - paddingButtom"
              stroke="black"
            />

            <!-- 繪製折線 -->
            <!-- <polyline
              :points="linePoints"
              fill="none"
              stroke="blue"
            /> -->

            <path
              stroke-width="3"
              stroke="#E7C673"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              :d="linePoints"
            />
            <path
              stroke-width="3"
              stroke="none"
              fill="url(#gradient)"
              stroke-linecap="round"
              stroke-linejoin="round"
              :d="linePointsFill"
            />

            <!-- 繪製數據點 -->
            <g
              v-for="(point, index) in dataPoints"
              :key="index"
            >
              <circle
                :cx="point.x"
                :cy="point.y"
                r="6"
                stroke-width="3"
                stroke=" #e7c673"
                fill="#0f0f0f"
              />
              <text
                :x="point.x"
                :y="point.y - 10"
                text-anchor="middle"
                fill="#fff"
              >
                {{ data[index] }}
              <!-- {{ point.x }},{{ point.y }} -->
              </text>
            </g>

            <!-- 繪製水平基準線日期 -->
            <g
              ref="dateRef"
              class=""
            >
              <text
                v-for="(date, index) in dates"
                :key="index"
                :x="textWidth + paddingLeft + index * 50"
                :y="height - 5"
                text-anchor="middle"
                class="font-serif"
                fill="#fff"
              >{{ date }}</text>
            </g>

            <!-- 繪製垂直基準線數值標示 -->
            <g
              ref="valueRef"
              class=""
            >
              <text
                v-for="(value, index) in data"
                :key="index"
                :x="textWidth"
                :y="height - padding - value"
                text-anchor="end"
                class="font-serif"
                fill="#fff"
              >{{ value }}</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted
} from 'vue'

// 第二個折線圖
const chartWrapper = ref(null)
const g = ref(null)
const svg = ref(null)
const valueRef = ref(null)
const dateRef = ref(null)

const dateHeight = ref(0)
const textWidth = ref(0)

const width = ref(0)
const height = ref(300)
const padding = ref(40)
const paddingLeft = ref(40)
const paddingButtom = ref(18)
const data = ref([10, 20, 30, 40, 50])
const dates = ref(['Apr 14', 'Apr 14', 'Apr 14', 'Apr 14', 'Apr 14'])

const linePoints = computed(() => {
  // 計算折線的點位
  const path = data.value.map((value, index) => `${textWidth.value + paddingLeft.value + index * 50},${height.value - padding.value - value}`)

  return `M${path.join(' ')}`
})

const linePointsFill = computed(() => {
  // 計算折線的點位
  const path = data.value.map((value, index) => `${textWidth.value + paddingLeft.value + index * 50},${height.value - padding.value - value}`)

  return `M${textWidth.value + paddingLeft.value + 0 * 50} ${height.value - dateHeight.value - paddingButtom.value}, ${path.join(' ')}, ${textWidth.value + paddingLeft.value + (data.value.length - 1) * 50} ${height.value - dateHeight.value - paddingButtom.value}Z`
})

const dataPoints = computed(() => {
  // 計算數據點的位置
  return data.value.map((value, index) => ({
    x: textWidth.value + paddingLeft.value + index * 50,
    y: height.value - padding.value - value
  }))
})
// 第二個折線圖

onMounted(() => {
  textWidth.value = valueRef.value.getBBox().width
  dateHeight.value = dateRef.value.getBBox().height
  width.value = chartWrapper.value.clientWidth
})

// const chartData = ref([
//   {
//     date: 'Apr 14',
//     index: 240.91,
//     nomalized: 27.08
//   },
//   {
//     date: 'Apr 18',
//     index: 267.99,
//     nomalized: 34.95
//   },
//   {
//     date: 'Apr 21',
//     index: 183.99,
//     nomalized: 55.95
//   },
//   {
//     date: 'Apr 14',
//     index: 240.91,
//     nomalized: 56.08
//   },
//   {
//     date: 'Apr 18',
//     index: 267.99,
//     nomalized: 67.95
//   },
//   {
//     date: 'Apr 21',
//     index: 183.99,
//     nomalized: 76.95
//   },
//   {
//     date: 'Apr 28',
//     index: 183.99,
//     nomalized: 87.95
//   }
// ])

// const drawChart = () => {

// }

// const debounce = (func, delay) => {
//   // timeout 初始值
//   let timeout = null
//   return function () {
//     const context = this
//     const args = arguments
//     clearTimeout(timeout)

//     timeout = setTimeout(function () {
//       func.apply(context, args)
//     }, delay)
//   }
// }

// const width = ref(400)
// 第一個折線圖
// const height = ref(300)
// const data = ref([10, 30, 20, 40, 50, 30, 20])

// const verticalLines = ref([
//   { x: 50 },
//   { x: 150 },
//   { x: 250 },
//   { x: 350 }
// ])

// const horizontalLines = ref([
//   { y: 50 },
//   { y: 100 },
//   { y: 150 },
//   { y: 200 },
//   { y: 250 }
// ])

// const linePoints = computed(() => {
//   return data.value.map((value, index) => {
//     const x = index * (width.value / (data.value.length - 1))
//     const y = height.value - (value * (height.value / Math.max(...data.value)))
//     return `${x},${y}`
//   }).join(' ')
// })

// const dataPoints = computed(() => {
//   return data.value.map((value, index) => {
//     const x = index * (width.value / (data.value.length - 1))
//     const y = height.value - (value * (height.value / Math.max(...data.value)))
//     return { x, y }
//   })
// })

// 第一個折線圖
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
.vertical-line {
  stroke: #cccccc;
  stroke-width: 1;
}
.horizontal-line {
  stroke: #cccccc;
  stroke-width: 1;
}
.line-chart {
  fill: none;
  stroke: blue;
  stroke-width: 2;
}

</style>
