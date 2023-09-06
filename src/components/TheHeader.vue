<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const isActive = ref(false)
const clearLocalStorage = () => {
  localStorage.setItem('visitedIds', '[]')
  location.reload()
}
</script>

<template>
  <header :class="{ open: isActive }">
    <RouterLink to="/">
      <h1>DA STEHE ICH NUN...</h1>
    </RouterLink>
    <div class="info" @click="isActive = !isActive">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="160"
        width="160"
        viewBox="0 0 160 160"
        version="1.0"
      >
        <g>
          <path
            d="m80 15c-35.88 0-65 29.12-65 65s29.12 65 65 65 65-29.12 65-65-29.12-65-65-65zm0 10c30.36 0 55 24.64 55 55s-24.64 55-55 55-55-24.64-55-55 24.64-55 55-55z"
          />
          <path
            d="m57.373 18.231a9.3834 9.1153 0 1 1 -18.767 0 9.3834 9.1153 0 1 1 18.767 0z"
            transform="matrix(1.1989 0 0 1.2342 21.214 28.75)"
          />
          <path
            d="m90.665 110.96c-0.069 2.73 1.211 3.5 4.327 3.82l5.008 0.1v5.12h-39.073v-5.12l5.503-0.1c3.291-0.1 4.082-1.38 4.327-3.82v-30.813c0.035-4.879-6.296-4.113-10.757-3.968v-5.074l30.665-1.105"
          />
        </g>
      </svg>
    </div>

    <h2>Julian Palacz – 2023</h2>
    <section>
      <p>
        Das Projekt „Da stehe ich nun…“ schafft eine innovative Verbindung von Kunst, Technologie
        und urbanem Raum. Es schöpft aus einer Datenbank der Stadt Wien, in der Informationen über
        öffentliche Kunstwerke aufgezeichnet sind. Doch aus diesen datengetriebenen Fakten erwächst
        etwas Neues: Die geballte Präsenz eines unermüdlichen Detektivs, dessen Monolog sich wie ein
        spannungsgeladener Krimi durch die Straßen und Plätze der Stadt windet.
      </p>

      <p>
        Jeder Eintrag in der Datenbank wird mittels ChatGPT in ein eigenes Textfragment verwandelt.
        Diese Fragmente fügen sich nahtlos zusammen und bilden einen kohärenten Fluss, der die
        Gedanken des Detektivs einfängt, während er die Kunstwerke und ihre Umgebung erkundet. In
        den Textfragmenten tauchen Details auf, die oft übersehen werden – Inschriften auf den
        Plastiken, versteckte Elemente in den Werken, verborgene Bezüge zur Umgebung. So ergibt sich
        ein detailliertes und lebendiges Bild der Kunstwerke, als ob der Detektiv sie mit seinen
        Augen und Gedanken berührt.
      </p>

      <p>
        Dieses Projekt überschreitet die Grenzen konventioneller Kunst und erkundet die
        tiefgreifenden Möglichkeiten der Automatisierung im kreativen Prozess. Hierdurch entfaltet
        sich eine narrative Darstellung der Stadt und ihrer Kunstwerke, die Wien in neuem Licht
        erscheinen lässt und mittels alternativer Erzählformen für alle zugänglich macht.
      </p>
      <p>
        Dieses Projekt ist Teil von Vienna's Urban Art (Paraflows / Günther Friesinger & Judith
        Fegerl) und wurde finanziert durch »Kunst und Kultur im digitalen Raum - Call 2021« von
        BMKÖS und Stadt Wien, MA7.
      </p>
      <p>
        Originaldaten der Kunstwerke vom Magistrat Wien - Magistratsabteilung 7 - Kultur / Standorte
        von Denkmälern, Kleindenkmälern, Gedenktafeln, Brunnen.
        <a
          href="https://www.data.gv.at/katalog/dataset/stadt-wien_kunstwerkeimffentlichenraumwien"
          target="_blank"
          >Eintrag auf data.gv.at</a
        >
      </p>
      <p><a href="https://julian.palacz.at" target="_blank">julian.palacz.at</a></p>
      <p><small @click="clearLocalStorage()">Tatorte vergessen und rote Punkte entfernen</small></p>
    </section>
  </header>
  <div v-if="isActive" class="shadow" @click="isActive = false"></div>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  left: 0;
  top: 0.9em;
  z-index: 100;
  color: var(--color-background);
  transform: rotate(-5deg);
  cursor: pointer;
  padding: 1.3em 1.4em 1.5em;
  margin: -1em;
  background-color: rgba(255, 255, 255, 0.2);
  background-color: var(--color-heading);
  transition: 0.5s all;
  font-size: 1.6em;
  height: 4.3em;
  transform-origin: top left;
  width: 16em;
  overflow: hidden;
  a {
    text-decoration: none;
  }
  &.open {
    transform: rotate(0);
    left: 2em;
    top: 2em;
    height: min(36.6em, calc(100vh - 7em));
    width: min(40em, 90vw);
    overflow: hidden;
    .info {
      right: 1.5em;
    }
    section {
      display: block;
    }
  }
}
.info {
  position: absolute;
  right: 0.5em;
  top: 1.5em;
  height: 1em;
  width: 1em;
  fill: var(--color-background);
  opacity: 0.5;
  z-index: 10001;
  transition: 0.5s all;

  svg {
    width: 100%;
    height: 100%;
  }
}

h1 {
  font-family: 'Film Noir';
  font-style: italic;
  color: var(--color-background);
  text-decoration: none;
  font-size: 1.7em;
  line-height: 1.2;
}

h2 {
  padding: 1em 0;
  font-size: 1em;
  font-style: italic;
}
section {
  position: absolute;
  top: 7em;
  bottom: 0em;
  padding-right: 1.4em;
  padding-bottom: 1.4em;
  right: 0;
  left: 1.4em;
  overflow-y: scroll;
  p + p {
    margin-top: 1.2em;
  }
  a {
    text-decoration: underline;
    color: var(--color-background);
  }
  small {
    opacity: 0.7;
  }
}

.shadow {
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  z-index: 99;
}

@media (max-width: 450px) {
  header {
    font-size: 1.2em;
    left: 0.3em;
  }
}
</style>
