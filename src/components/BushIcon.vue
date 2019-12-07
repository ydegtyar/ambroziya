<template>
  <l-icon
      v-bind="{ ...$attrs, ...$props}"
      v-on="$listeners"
  />
</template>

<script>
import { LIcon } from 'vue2-leaflet'

export default {
  components: { 'l-icon': LIcon },
  data() {
    return {
      iconUrl: '/ambrozia/140/ambr-red.png',
      iconSize: [70, 70],
      iconAnchor: [30, 60],
      shadowUrl: '/ambrozia/140/ambr-shadow.png',
      shadowSize: [50, 64],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    }
  },
}
</script>