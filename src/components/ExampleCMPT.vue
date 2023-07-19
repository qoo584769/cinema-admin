<script setup>
import { ref } from 'vue'

const test = ref('aaa')
</script>

<template>
  <div class="container mx-auto bg-slate-900">
    {{ test }}
  </div>
</template>

<style scoped>
</style>
