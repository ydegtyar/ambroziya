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
        <l-control-zoom position="bottomleft"></l-control-zoom>
        <ochag :latlng="circle.center" :radius="zoom"/>
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      </l-map>
    </div>
  </div>
</template>

<script>
import appConfig from './../src/app.config'
import { LMarker, LPopup, LControlZoom } from 'vue2-leaflet'
import Ochag from './components/Ochag.vue'

export default {
  components: {
    LMarker,
    'l-popup': LPopup,
    'l-control-zoom': LControlZoom,
    'ochag': Ochag,
  },
  data() {
    return {
      zoom: 14,

      circle: { center: L.latLng(48.50432, 32.261491), radius: this.zoom },

      center: L.latLng(48.50432, 32.261491),

      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(48.50432, 32.261491),

      clickCount: 0,
      delay: 300,
    }
  },
  mounted() {
    // console.log(this.marker)
    // console.log(L)
  },
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  methods: {
    mapClicked(e) {
      this.clickCount++

      if (this.clickCount === 1) {
        this.clickTimer = setTimeout(() => {
          this.clickCount = 0
          console.log(e)
          this.spawnPopup(e)
          this.$emit('single-click', e)
        }, this.delay)
      } else if (this.clickCount === 2) {
        clearTimeout(this.clickTimer)
        this.clickCount = 0
        this.$emit('double-click')
      }
    },
    spawnPopup(e) {

      console.log(e, 'spanw')
      // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
      // const { latlng: { lat, lng } } = e
    },
  },
}
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    z-index: 1;
    width: 100vw;
    background: rgba(0, 0, 0, .2);
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
  // Import Bulma's core
  @import '~bulma/sass/utilities/_all';

  // Set your colors
  $primary: #01b636;
  $primary-invert: #fe49c9;
  $twitter: #7ed1ea;
  $twitter-invert: #812e15;

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
      'white': (
          $white,
          $black,
      ),
      'black': (
          $black,
          $white,
      ),
      'light': (
          $light,
          $light-invert,
      ),
      'dark': (
          $dark,
          $dark-invert,
      ),
      'primary': (
          $primary,
          $primary-invert,
      ),
      'info': (
          $info,
          $info-invert,
      ),
      'success': (
          $success,
          $success-invert,
      ),
      'warning': (
          $warning,
          $warning-invert,
      ),
      'danger': (
          $danger,
          $danger-invert,
      ),
      'twitter': (
          $twitter,
          $twitter-invert,
      ),
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Import Bulma and Buefy styles
  @import '~bulma';
  @import '~buefy/src/scss/buefy';

  // Allow element/type selectors, because this is global CSS.
  // stylelint-disable selector-max-type, selector-class-pattern

  // Normalize default styles across browsers,
  // https://necolas.github.io/normalize.css/
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
</style>
