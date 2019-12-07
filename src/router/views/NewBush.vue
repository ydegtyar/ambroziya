<template>
  <b-modal
      :active.sync="modalActive"
      has-modal-card
      aria-role="dialog"
      aria-modal
      trap-focus
      :on-cancel="back"
      :can-cancel="false"
      scroll="keep"
      @close="back"
  >
    <div class="modal-card" style="width: auto">
      <form @submit.prevent="submit">
        <header class="modal-card-head">
          <p class="modal-card-title">Add new bush</p>
        </header>
        <section class="modal-card-body">
          <div class="tile is-ancestor">
            <div class="tile" style="width: 100%; height: 180px">
              <l-map :center="center" :zoom="18" :options="{
                zoomControl: false,
                dragging: false,
                touchZoom: false,
                doubleClickZoom: false,
                scrollWheelZoom: false,
              }">
                <l-marker :lat-lng="center">
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
                <l-tile-layer :url="url"/>
              </l-map>
            </div>
            <div class="tile">
              <b-message type="is-danger">
                <h3>{{coordinates}}</h3>
                {{address}}
              </b-message>
            </div>
          </div>

          <b-field label="Description">
            <b-input
                type="text"
                :value="description"
                placeholder="What you think about this bush"
            >
            </b-input>
          </b-field>
          <b-field>
            <b-upload
                v-if="isMobile"
                style="margin-right: 15px;"
                :value="file"
                type="file"
                accept="image/*"
                capture="camera"
                multiple
            >
              <a class="button is-primary">
                <b-icon icon="camera"></b-icon>
                <span>Make a photo</span>
              </a>
            </b-upload>
          </b-field>

          <b-upload
              :value="uploadedFiles"
              type="file"
              accept="image/*"
              capture="camera"
              multiple
          >
            <a class="button is-primary">
              <b-icon icon="upload"></b-icon>
              <span>Add photo from gallery</span>
            </a>
          </b-upload>
          <h5>
            We'll try notify some responsible peoples
          </h5>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="back">Cancel</button>
          <button class="button is-primary">+ Add</button>
        </footer>
      </form>
    </div>
  </b-modal>
</template>

<script>
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import isMobile from 'ismobilejs'

export default {
  props: {
    modalActive: {
      type: Boolean,
      required: true,
    },
    // latlng: {
    //   type: LatLng,
    //   required: true,
    // },
  },
  data() {
    return {
      uploadedFiles: null,
      file: null,
      description: '',
      address: '',

      isMobile: isMobile(navigator.userAgent).any,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    }
  },
  computed: {
    coordinates() {
      return `${this.$route.query.lat} ${this.$route.query.lng}`
    },
    center() {
      return L.latLng(this.$route.query.lat, this.$route.query.lng)
    },
  },
  async mounted() {
    if (!(this.$route.query.lat && this.$route.query.lng)) {
      this.$router.push({ name: 'home' })
    }
    const provider = new OpenStreetMapProvider()
    const [result] = await provider.search({ query: this.coordinates })
    this.address = result ? result.label : ''
  },
  methods: {
    submit(e) {
      console.log(e)
    },
    back() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>
