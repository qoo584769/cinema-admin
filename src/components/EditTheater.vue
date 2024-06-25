<template>
  <div />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const route = useRoute()
const id = ref()

onMounted(() => {
  console.log(route.params.id)
  id.value = route.params.id
})
</script>

<style lang="scss" scoped>
</style>
