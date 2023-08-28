<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <the-header />
  <router-view v-slot="{ Component }">
    <keep-alive exclude="MapItemView">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
