import { defineStore } from 'pinia'

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

export const useMapStore = defineStore('map', {
  state: () => ({
    db: null
  }),
  actions: {
    async loadDatabase() {
      if (this.db !== null) return
      const json = await import('@/assets/db.json')
      const types = [...new Set(json.features.map((feature) => feature.properties.TYP))]
      const features = json.features.map((feature) => {
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
      // await new Promise((r) => setTimeout(r, 2000))
      this.db = { ...json, features }
    }
  },
  getters: {
    getItemById: (state) => {
      return async (id) => {
        await state.loadDatabase()
        const item = state.db.features.find((element) => element.properties.OBJECTID === id)
        return item
      }
    }
  }
})
