<script setup>
import { useRoute, RouterLink } from 'vue-router'
const route = useRoute()
</script>

<template>
  <header>
    <RouterLink to="/">
      <h1 :class="{ solid: route.name === 'item' }">DA STEHE ICH NUN...</h1>
    </RouterLink>
  </header>
</template>

<style lang="scss" scoped>
h1 {
  position: fixed;
  left: 0.5em;
  top: 0.6em;
  z-index: 10;
  color: var(--color-background);
  font-family: 'Film Noir';
  font-size: 2.5em;
  font-style: italic;
  transform: rotate(-5deg);
  // pointer-events: none;
  padding: 0.5em 1em;
  margin: -1em;
  background-color: rgba(255, 255, 255, 0.2);
  background-color: var(--color-heading);
  &.solid {
    // background-color: rgb(36, 36, 36);
  }
}

@media (max-width: 450px) {
  h1 {
    font-size: 1.85em;
    left: 0.3em;
  }
}
</style>
