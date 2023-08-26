import './style.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import distance from '@turf/distance';
import Typed from 'typed.js';
import db from './db.js';

let lastPosition = null;

let typed = [];
typed.push(
  new Typed('#chat', {
    strings: ['Willkommen Entdecker:in', 'navigiere auf der Karte und wähle ein Symbol aus'],
    typeSpeed: 50,
    fadeOut: true,
  })
);

mapboxgl.accessToken =
  'pk.eyJ1IjoiZHJlZXJyIiwiYSI6ImNqcHRvbHZzNzAxemw0NG9kZnB6eXlyMmIifQ.uZ0_tbkJJKFDeBhqp_bi8g';

const map = new mapboxgl.Map({
  container: 'map',
  /* style: 'mapbox://styles/dreerr/clfqo3x83000c01plezz4niou',*/
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [16.373127, 48.208492],
  zoom: 15,
  // zoom: 11.15,
});

map.on('load', () => {
  map.addSource('chos', {
    type: 'geojson',
    data: db,
  });

  map.addLayer({
    id: 'places-highlighted',
    type: 'circle',
    source: 'chos',
    paint: {
      'circle-color': '#ffffff',
      'circle-radius': 20,
      'circle-opacity': 0.5,
    },
    filter: ['in', 'OBJECTID', ''],
  });
  map.addLayer({
    id: 'places',
    type: 'symbol',
    source: 'chos',
    layout: {
      'icon-size': 1.0,
      'icon-image': ['get', 'icon'],
      'icon-allow-overlap': true,
    },
  });

  map.on('click', 'places-highlighted', (e) => {
    typed.forEach((e) => e.destroy());
    let feature = e.features[0];
    let specs = JSON.parse(feature.properties.specs);
    let images = JSON.parse(feature.properties.images);
    let completion = JSON.parse(feature.properties.completion);

    // const specsString = specs.map(([k, v]) => `<strong>${k}</strong> ${v}`);
    // console.log(specsString);
    // typed.push(
    //   new Typed('#chat', {
    //     strings: specsString,
    //     typeSpeed: 10,
    //     fadeOut: true,
    //   })
    // );
    typed.push(
      new Typed('#chat', {
        strings: completion.message.content.split('.'),
        typeSpeed: 10,
        fadeOut: true,
      })
    );

    document.querySelector('.bg-inner').style.backgroundImage = `url('/${images[0]}')`;
    // document.querySelector('#chat').innerHTML = description;

    if (typeof map.getLayer('selectedPlace') !== 'undefined') {
      map.removeLayer('selectedPlace');
      map.removeSource('selectedPlace');
    }

    map.addSource('selectedPlace', {
      type: 'geojson',
      data: feature.toJSON(),
    });
    map.addLayer({
      id: 'selectedPlace',
      type: 'circle',
      source: 'selectedPlace',
      paint: {
        'circle-color': '#ff0000',
        'circle-radius': 20,
        'circle-opacity': 0.5,
      },
    });
  });

  map.on('mouseenter', 'places-highlighted', (e) => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'places-highlighted', () => {
    map.getCanvas().style.cursor = '';
  });

  // >GEOLOCATE
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
  });
  geolocate.on('trackuserlocationstart', (e) => {
    console.log('A trackuserlocationstart event has occurred.', e);
  });
  geolocate.on('error', () => {
    console.log('An error event has occurred.');
  });
  geolocate.on('trackuserlocationend', () => {
    console.log('A trackuserlocationend event has occurred.');
  });
  geolocate.on('geolocate', (e) => {
    lastPosition = [e.coords.longitude, e.coords.latitude];
    const nearbyIDs = db.features
      .filter((feature) => distance(feature.geometry.coordinates, lastPosition) < 1)
      .map((feature) => feature.properties.OBJECTID);
    map.setFilter('places-highlighted', ['in', 'OBJECTID', ...nearbyIDs]);
  });
  map.addControl(geolocate);
  setTimeout(() => {
    geolocate.trigger();
  }, 500);
});
