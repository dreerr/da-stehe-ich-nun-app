import { defineStore } from 'pinia'
import db from '@/assets/db.json'

const types = [...new Set(db.features.map((feature) => feature.properties.TYP))]

const icons = [
  'cemetery', // "Gedenktafeln"
  null, // undefined
  'monument', // "Denkmäler"
  'religious-christian', // "Sakrale Kleindenkmäler"
  'swimming', // "Brunnen"
  'place-of-worship', // "Profanplastiken/Kunst am Bau freistehend"
  'art-gallery', // "Kunst am Bau wandgebunden"
  'cemetery' // "Grabmäler/Grabhaine"
]

const fields = [
  ['TYP', 'Typ'],
  ['OBJEKTTITEL', 'Objekttitel'],
  ['KUENSTLER', 'Künstler:in'],
  ['ENTSTEHUNG', 'Entstehung'],
  ['BESCHREIBUNG', 'Beschreibung'],
  ['MATERIAL', 'Material'],
  ['INSCHRIFT', 'Inschrift'],
  ['BIOGR_ANGABEN', 'Biographische Angaben'],
  ['STANDORT', 'Standort'],
  ['STRASSE', 'Straße'],
  ['GESCHICHTE', 'Geschichte'],
  ['LITERATURQUELLEN', 'Literaturquellen']
]
console.log(types)

db.features = db.features.map((feature) => {
  // add icons
  let typeIndex = types.indexOf(feature.properties.TYP)
  feature.properties.icon = icons[typeIndex]
  feature.properties.completion.message.content =
    feature.properties.completion.message.content.replace('\n', '<br>')
  // create specs
  let specs = fields
    .filter(([field]) => feature.properties[field] !== null)
    .map(([field, fieldTitle]) => [fieldTitle, feature.properties[field]])

  specs.push([
    'Mehr Informationen unter',
    `<a href="https://www.wien.gv.at/kulturportal/public/identifyKunstwerk.aspx?FeatureByID=${feature.properties.ID}&FeatureClass=kunstwerk" target="_blank">wien.gv.at</a>`
  ])
  feature.properties.specs = specs
  return feature
})

export const useMapStore = defineStore('map', {
  getters: {
    db: () => db,
    getItemById: (state) => {
      return (id) => state.db.features.find((element) => element.properties.OBJECTID === id)
    }
  }
})
