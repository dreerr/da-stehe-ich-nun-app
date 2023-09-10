<script setup>
import { useMapStore } from '@/stores/map'
import { useRoute, RouterLink } from 'vue-router'
import { ref, onMounted, nextTick } from 'vue'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
const mapStore = useMapStore()
const route = useRoute()
const item = ref(null)
const curImg = ref(0)
const doContain = ref(false)
const nextImage = () => {
  curImg.value = (curImg.value + 1) % item.value.properties.images.length
}
const player = ref(null)
const story_inner = ref(null)
onMounted(async () => {
  item.value = await mapStore.getItemById(parseInt(route.params.id))
  nextTick(() => {
    new Plyr(player.value, {
      controls: ['play-large', 'play', 'mute', 'volume']
    })
  })
  setInterval(() => nextImage(), 5000)
})
</script>

<template>
  <div class="item" v-if="item">
    <RouterLink class="close" to="/">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g id="close">
          <path
            id="x"
            d="M18.717 6.697l-1.414-1.414-5.303 5.303-5.303-5.303-1.414 1.414 5.303 5.303-5.303 5.303 1.414 1.414 5.303-5.303 5.303 5.303 1.414-1.414-5.303-5.303z"
          />
        </g>
      </svg>
    </RouterLink>
    <div class="story">
      <div class="inner" ref="story_inner">
        <span v-html="item.properties.completion.message.content"></span>
        <details>
          <summary>Angaben der Datenbank</summary>

          <ul>
            <li v-for="[key, value] in item.properties.specs" :key="key">
              <em>{{ key }}:</em> <span v-html="value"></span>
            </li>
          </ul>
        </details>
      </div>
      <div class="audio">
        <audio ref="player" controls autoplay>
          <source :src="'/audio/' + item.properties.OBJECTID + '.mp3'" type="audio/mp3" />
        </audio>
      </div>
    </div>
    <div class="images" @click="doContain = !doContain" :class="{ contain: doContain }">
      <div class="inner moon">
        <!-- <img class="cover" :src="'/' + img" /> -->
        <img
          :src="'/images/' + img"
          v-for="(img, idx) in item.properties.images"
          :key="img"
          :class="{ active: idx === curImg }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/cssgram.moon.min.css';

.images {
  position: absolute;
  left: 0;
  right: 0;
  top: var(--ratio);
  bottom: 0;
  z-index: 0;
}

.story {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: calc(100% - var(--ratio));
}
@media (max-width: 700px) and (max-aspect-ratio: 1/1) {
  .images {
    left: 0;
    right: 0;
    top: 50%;
    bottom: 0;
  }

  .story {
    left: 0;
    right: 0;
    top: 0;
    bottom: 50%;
  }
}

@media (min-aspect-ratio: 1/1) {
  .images {
    left: var(--ratio);
    right: 0;
    top: 0;
    bottom: 0;
  }
  .story {
    left: 0;
    right: calc(100% - var(--ratio));
    top: 0;
    bottom: 0;
  }
}

details {
  margin-top: 3em;
  font-size: 1rem;
  line-height: 1.3;
  /* opacity: 0.5; */
  &:deep(a) {
    color: inherit;
  }
}

details summary {
  cursor: pointer;
}

.item {
  overflow: hidden;
  --ratio: 38.2%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.story .inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 50px;
  font-size: 1.5em;
  line-height: 1.3;
  padding: 5em 2em 6em;
  overflow-x: scroll;
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    rgba(255, 255, 255, 1) 6em,
    rgba(255, 255, 255, 1) calc(100% - 6em),
    transparent 100%
  );
}

@media (max-width: 450px) {
  .story .inner {
    padding: 5em 1em 6em;
    font-size: 1.2em;
  }
}

.story .inner::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}

.audio {
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -100px;
  z-index: 12;
  --plyr-audio-controls-background: var(--color-background);
  --plyr-audio-control-color: var(--color-heading);
  --plyr-color-main: var(--color-text);
}

.images .inner {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.images img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  opacity: 0;
  transition: opacity 500ms;
}
.images img.active {
  opacity: 1;
}

.images.contain img {
  object-fit: contain;
  object-position: center center;
}

.close svg {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  z-index: 1;
}

.close svg {
  fill: var(--color-heading);
  filter: drop-shadow(0 0 7px var(--color-background));
}
</style>
