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
      full-screen
      @close="back"
  >
    <form @submit.prevent="submit">
      <div class="modal-card" style="width: auto">
        <input type="hidden" name="lat" :value="$route.query.lat">
        <input type="hidden" name="lng" :value="$route.query.lng">
        <input type="hidden" name="name" value="Bush in Kropyvnytskyi">
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
                name="note"
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
                v-model="file"
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
              v-model="uploadedFiles"
              type="file"
              accept="image/*"
              multiple
          >
            <a class="button is-primary">
              <b-icon icon="upload"></b-icon>
              <span>Add photo from gallery</span>
            </a>
          </b-upload>
          <br v-if="uploadedFiles && uploadedFiles.length">
          <img v-for="url in uploadedFilesUrls" :key="url" :src="url" :alt="url"
               style="max-width: 100px; max-height: 100px; margin: 5px">
          <h5>
            We'll try notify some responsible peoples
          </h5>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="back">Cancel</button>
          <button class="button is-primary">+ Add</button>
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import isMobile from 'ismobilejs'
import bushesApi from '../../api/bushes'
import store from '../../state/store'

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
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
    }
  },
  computed: {
    coordinates() {
      return `${this.$route.query.lat} ${this.$route.query.lng}`
    },
    center() {
      return L.latLng(this.$route.query.lat, this.$route.query.lng)
    },
    uploadedFilesUrls() {
      if (!this.uploadedFiles || !this.uploadedFiles.length) {
        return []
      }

      return this.uploadedFiles.map(file => window.URL.createObjectURL(file))
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
    async submit(e) {
      const formData = new FormData(e.target)
      console.log(this.file, this.uploadedFiles)
      let image
      if (this.file) {
        image = this.file[0]
      } else if (this.uploadedFiles) {
        image = this.uploadedFiles[0]
      }
      if (image) {
        formData.append('image', image)
      }
      console.log(image)
      await bushesApi.create(formData)
      store.dispatch('bushes/get')
      this.$router.push({ name: 'home' })
      alert('New bush added')
    },
    back() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>
