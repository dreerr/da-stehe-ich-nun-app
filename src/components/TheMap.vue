<script setup>
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
// import distance from '@turf/distance'
import { useMapStore } from '@/stores/map'
import { onActivated, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mapStore = useMapStore()
const db = mapStore.db
let visitedIds = []

try {
  visitedIds = JSON.parse(localStorage.getItem('visitedIds'))
} catch (e) {
  console.error(e)
}

console.log(visitedIds)
// let lastPosition = null
mapboxgl.accessToken =
  'pk.eyJ1IjoiZHJlZXJyIiwiYSI6ImNsZXB6MDhwMzA5ZWYzc3BoczQxMGRiaTYifQ.Slh2tayWO19KkBCqXtFY_g'
let init = false
onMounted(() => {
  console.log('onMounted')
})
onActivated(() => {
  console.log('onActivated')
  if (init) return
  init = true
  const map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/dreerr/clfqo3x83000c01plezz4niou',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [16.373127, 48.208492],
    zoom: 15
    // zoom: 11.15,
  })

  map.on('load', () => {
    map.addSource('chos', {
      type: 'geojson',
      data: db
    })

    map.addLayer({
      id: 'places-clickable',
      type: 'circle',
      source: 'chos',
      paint: {
        'circle-color': '#ffffff',
        'circle-radius': 15,
        'circle-opacity': 0.5
      }
    })
    map.addLayer({
      id: 'places-visited',
      type: 'circle',
      source: 'chos',
      paint: {
        'circle-color': '#ff0000',
        'circle-radius': 15,
        'circle-opacity': 0.5
      },
      filter: ['in', 'OBJECTID', ...visitedIds]
    })
    map.addLayer({
      id: 'places',
      type: 'symbol',
      source: 'chos',
      layout: {
        'icon-size': 1.0,
        'icon-image': ['get', 'icon'],
        'icon-allow-overlap': true
      }
    })

    map.on('click', 'places-clickable', (e) => {
      router.push({ path: `/item/${e.features[0].properties.OBJECTID}` })
      visitedIds.push(e.features[0].properties.OBJECTID)
      map.setFilter('places-visited', ['in', 'OBJECTID', ...visitedIds])
      localStorage.setItem('visitedIds', JSON.stringify(visitedIds))
    })

    map.on('mouseenter', 'places-clickable', () => {
      map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'places-clickable', () => {
      map.getCanvas().style.cursor = ''
    })

    // >GEOLOCATE
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    })
    // geolocate.on('trackuserlocationstart', (e) => {
    //   console.log('A trackuserlocationstart event has occurred.', e)
    // })
    // geolocate.on('error', () => {
    //   console.log('An error event has occurred.')
    // })
    // geolocate.on('trackuserlocationend', () => {
    //   console.log('A trackuserlocationend event has occurred.')
    // })
    // geolocate.on('geolocate', (e) => {
    //   lastPosition = [e.coords.longitude, e.coords.latitude]
    //   const nearbyIDs = db.features
    //     .filter((feature) => distance(feature.geometry.coordinates, lastPosition) < 1)
    //     .map((feature) => feature.properties.OBJECTID)
    //   map.setFilter('places-clickable', ['in', 'OBJECTID', ...nearbyIDs])
    // })
    map.addControl(geolocate)
    setTimeout(() => {
      geolocate.trigger()
    }, 500)
  })
})
</script>

<template>
  <h1>HIER STEH ICH NUN...</h1>
  <div id="map"></div>
</template>

<style scoped>
h1 {
  position: absolute;
  left: 0.5em;
  top: 0.6em;
  z-index: 1;
  color: white;
  font-family: 'Film Noir';
  font-size: 2.5em;
  font-style: italic;
  transform: rotate(-5deg);
  pointer-events: none;
  padding: 0.5em 1em;
  margin: -1em;
  background-color: rgba(255, 255, 255, 0.1);
}
#map {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
