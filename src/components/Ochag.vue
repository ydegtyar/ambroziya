import { LTooltip } from "vue2-leaflet"
import { LCircleMarker } from "vue2-leaflet"
<template>
  <l-circle-marker
      :lat-lng="latlng"
      :radius="radius"
      :color="color"
  >
    <l-tooltip>
      {{description}}
    </l-tooltip>
  </l-circle-marker>
</template>

<script>
import { LatLng } from 'leaflet'
import { LCircleMarker, LTooltip } from 'vue2-leaflet'

export default {
  components: {
    'l-tooltip': LTooltip,
    'l-circle-marker': LCircleMarker,
  },
  props: {
    latlng: {
      type: LatLng,
      required: true,
    },
    radius: {
      type: Number, required: true,
    },
    color: { type: String, default: 'red' },
    description: { type: String, default: 'Oh, its ambroziiya' },
  },
}
</script>
