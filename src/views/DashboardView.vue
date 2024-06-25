<template>
  <div class="">
    <Summary />
    <!-- <div class="flex"> -->
    <LineChart />
    <BarChart />
    <!-- </div> -->
  </div>
</template>

<script setup>
import Summary from '@/components/SummaryOfStatistics.vue'
import LineChart from '@/components/LineChart.vue'
import BarChart from '@/components/BarChart.vue'
// import { reactive, ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
// import axios from 'axios'

// onMounted(() => {
// })
</script>

<style>
/* 可以在這裡自訂樣式 */
</style>
