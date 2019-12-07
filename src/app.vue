<template>
  <div id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <div class="overlay">
      <RouterView :key="$route.fullPath"/>
    </div>
    <div class="mapHolder">
      <l-map
          :zoom="zoom"
          :center="center"
          :options="{ zoomControl: false }"
          @click="mapClicked"
      >
        <l-control-zoom position="bottomleft"/>
        <ochag :latlng="circle.center" :radius="zoom" @click.stop.prevent="showOchag"/>
        <l-marker v-if="newMarkerShow" :lat-lng="newMarkerCoord">
          <l-tooltip :options="{ permanent: true, interactive: true }">
            <b-button type="is-danger" @click.stop="goToNewBush">Add new bush!</b-button>
          </l-tooltip>
          <l-icon
              :icon-url="'/ambrozia/140/ambr-green.png'"
              :icon-size="[70, 70]"
              :icon-anchor="[30, 60]"
              :shadow-url="'/ambrozia/140/ambr-shadow.png'"
              :shadow-size="[50, 64]"
              :shadow-anchor="[4, 62]"
              :popup-anchor="[-3, -76]"
          />
        </l-marker>
        <ochag v-for="bush in bushes" :key="bush.id" :latlng="bush.lat" :radius="zoom" @click.stop="showOchag"/>
        <l-tile-layer :url="url"/>
      </l-map>
    </div>
  </div>
</template>

<script>
import appConfig from './../src/app.config'
import { LMarker, LPopup, LControlZoom, LFeatureGroup, LGridLayer } from 'vue2-leaflet'
import Ochag from './components/Ochag.vue'
import { mapGetters } from 'vuex'
import store from './state/store'

export default {
  components: {
    'l-marker': LMarker,
    'l-popup': LPopup,
    'l-control-zoom': LControlZoom,
    'ochag': Ochag,
    'l-feature-group': LFeatureGroup,
    'l-grid-layer': LGridLayer
    // 'l-icon':LIcon
    // 'bushIcon': BushIcon,
  },
  data() {
    return {
      newMarkerShow: false,
      newMarkerCoord: {},

      // bushIcon: BushIcon,
      zoom: 14,

      circle: { center: L.latLng(48.50432, 32.261491), radius: this.zoom },

      center: L.latLng(48.50432, 32.261491),

      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      marker: L.latLng(48.50432, 32.261491),

      clickCount: 0,
      delay: 300,
    }
  },
  async mounted() {
    store.dispatch('bushes/get')

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.centerByPosition)
    }
  },
  computed: {
    // ...mapGetters('bushes', ['bushes']),
  },
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  methods: {
    featGroup(e) {
      console.log(e, 'fet')
    },
    centerByPosition(position) {
      // const { coords: { latitude, longitude } } = position
      // this.center = L.latLng(latitude, longitude)
      // this.zoom = 14
    },
    showOchag(e) {
      console.log('onchage', e)
    },
    mapClicked(e) {
      console.log(e.target)
      this.clickCount++

      if (this.clickCount === 1) {
        this.clickTimer = setTimeout(() => {
          this.clickCount = 0
          this.showBush(e)
          this.$emit('single-click', e)
        }, this.delay)
      } else if (this.clickCount === 2) {
        clearTimeout(this.clickTimer)
        this.clickCount = 0
        this.$emit('double-click', e)
      }
    },
    showBush(e) {
      this.newMarkerCoord = e.latlng
      this.newMarkerShow = true
    },
    goToNewBush() {
      const { lat, lng } = this.newMarkerCoord
      this.$router.push({ name: 'newBush', query: { lat, lng } })
    },
  },
}
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    z-index: 1;
    width: 100vw;
  }

  .mapHolder {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100vw;
    height: 100vh;
  }
</style>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma';
  @import '~buefy/src/scss/buefy';

  @import '~normalize.css/normalize.css';
  // Style loading bar between pages.
  // https://github.com/rstacruz/nprogress
  @import '~nprogress/nprogress.css';

  // Design variables and utilities from src/design.
  @import '@design';

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background: $color-body-bg;
  }

  #app {
    @extend %typography-small;
  }

  // ===
  // Base element styles
  // ===

  a,
  a:visited {
    color: $color-link-text;
  }

  h1 {
    @extend %typography-xxlarge;
  }

  h2 {
    @extend %typography-xlarge;
  }

  h3 {
    @extend %typography-large;
  }

  h4 {
    @extend %typography-medium;
  }

  h5,
  h6 {
    @extend %typography-small;
  }

  // ===
  // Vendor
  // ===

  #nprogress .bar {
    background: $color-link-text;
  }

  .in-marker-popup {
    position: absolute;
  }
</style>
