<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
  axios.get('123')
  // console.log(a)
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss">

</style>
