<template>
  <!--  <l-circle-marker-->
  <!--      :lat-lng="latlng"-->
  <!--      :radius="radius"-->
  <!--      :color="color"-->
  <!--  >-->
  <!--    <l-tooltip>-->
  <!--      {{description}}-->
  <!--    </l-tooltip>-->
  <!--  </l-circle-marker>-->
  <l-marker :lat-lng="latlng" @click="go">
    <l-icon
        :icon-url="'/ambrozia/140/ambr-red.png'"
        :icon-size="[70, 70]"
        :icon-anchor="[30, 60]"
        :shadow-url="'/ambrozia/140/ambr-shadow.png'"
        :shadow-size="[50, 64]"
        :shadow-anchor="[4, 62]"
        :popup-anchor="[-3, -76]"
    />
    <!--    <l-tooltip :options="{ permanent: true, interactive: true }">-->
    <!--      <b-button type="is-success" @click.stop="">-->
    <!--        <b-icon icon="eye"></b-icon>-->
    <!--      </b-button>-->
    <!--    </l-tooltip>-->
  </l-marker>
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
    id: { type: Number, required: false, default: 1 },
    latlng: {
      type: LatLng,
      required: true,
    },

    color: { type: String, default: 'red' },
    description: { type: String, default: 'Oh, its ambroziiya' },
  },
  methods: {
    go() {
      this.$router.push({ name: 'bushes', params: { id: this.id } })
    },
  },
}
</script>
