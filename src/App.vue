<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header> -->

  <router-view v-slot="{ Component }">
    <keep-alive exclude="MapItemView">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
