<script setup>
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import { useMapStore } from '@/stores/map'
import { onActivated, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mapStore = useMapStore()
let map = null
let visitedIds = JSON.parse(localStorage.getItem('visitedIds')) || []

console.log(visitedIds)
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
onMounted(() => {
  console.log('onMounted')
  main()
})
onActivated(async () => {
  console.log('onActivated')
  main()
})
const main = async () => {
  if (map !== null) {
    console.log('map already initialized')
    map.resize()
    return
  }

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [16.373127, 48.208492],
    zoom: 15,
    minZoom: 11,
    maxZoom: 18,
    maxBounds: [
      [16.25, 48.15],
      [16.5, 48.3]
    ]
  })

  map.on('load', async () => {
    await mapStore.loadDatabase()
    map.addSource('chos', {
      type: 'geojson',
      data: mapStore.db
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
    geolocate.on('geolocate', () => {
      // e.preventDefault()
      // lastPosition = [e.coords.longitude, e.coords.latitude]
      // const nearbyIDs = db.features
      //   .filter((feature) => distance(feature.geometry.coordinates, lastPosition) < 1)
      //   .map((feature) => feature.properties.OBJECTID)
      // map.setFilter('places-clickable', ['in', 'OBJECTID', ...nearbyIDs])
    })
    map.addControl(geolocate)
    setTimeout(() => {
      geolocate.trigger()
    }, 500)
  })
}
</script>

<template>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
#map {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
