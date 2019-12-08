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
    <div class="modal-card" style="width: auto" v-if="currentBush">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="currentBush.image" alt="Image" style="max-width: 320px; max-height: 320px">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <!--          <b-button type="is-danger">-->
          <!--            TERMINATED-->
          <!--          </b-button>-->
          <div class="media-content">
            <p class="title is-4">
              <img src="/ambrozia/140/ambr-red.png" alt="terminated" v-if="currentBush.status === 1">
              {{currentBush.name}}
            </p>
            <p class="subtitle is-6"> {{currentBush.note}}</p>
          </div>
          <!--            <b-carousel :indicator-inside="false">-->
          <!--              <b-carousel-item v-for="(item, i) in 6" :key="i">-->
          <!--            <span class="image">-->
          <!--              <img :src="getImgUrl(i)">-->
          <!--            </span>-->
          <!--              </b-carousel-item>-->
          <!--              <template slot="indicators" slot-scope="props">-->
          <!--            <span class="al image">-->
          <!--                <img :src="getImgUrl(props.i)" :title="props.i">-->
          <!--            </span>-->
          <!--              </template>-->
          <!--            </b-carousel>-->
        </div>
        <div class="content">
          <address> {{address.label}}
          </address>
          <br>
          <small>{{currentBush.createdAt}}</small>
          <br>
        </div>
      </div>
      <h5>Share this:</h5>
      <social-sharing
          :url="url"
          title="Ambrozone"
          :description="currentBush.note"
          :quote="currentBush.note"
          hashtags="Ambrozone, bush, oh no"
          twitter-user="ydegtyar"
          inline-template
      >
        <div>
          <network network="facebook" class="shareBtn">
            <b-button outlined type="is-primary">
              <b-icon icon="facebook"></b-icon>
              Facebook
            </b-button>
          </network>
          <network network="telegram" class="shareBtn">
            <b-button outlined type="is-primary">
              <b-icon icon="telegram"></b-icon>
              Telegram
            </b-button>
          </network>
          <network network="twitter" class="shareBtn">
            <b-button outlined type="is-primary">
              <b-icon icon="twitter"></b-icon>
              Twitter
            </b-button>
          </network>
          <network network="whatsapp" class="shareBtn">
            <b-button outlined type="is-primary">
              <b-icon icon="whatsapp"></b-icon>
              Whatsapp
            </b-button>
          </network>
        </div>
      </social-sharing>
      <footer class="modal-card-foot">
        <b-button type="is-danger" @click="back">Close</b-button>
        <b-button type="is-warning" @click="upvote">
          <svg
              style="width: 20px; margin-right: 10px;"
              fill="black"
              class="reactButton"
              xmlns="https://www.w3.org/2000/svg"
              viewBox="-22 0 134 134"
          >
            <path
                d="M23 134C8 85 40 67 40 67c-2 26 13 47 13 47l16-10c0 10-6 30-6 30s19-15 25-40c6-24-11-49-11-49 1 17-5 34-17 48l2-3c2-4 5-15 3-40C63 15 31 0 31 0c2 22-6 26-25 67-20 41 17 67 17 67zm0 0"/>
          </svg>
          <span style="display: inline-block;">      {{currentBush.votes || 0}}
</span>
        </b-button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
import bushesApi from '../../api/bushes'
import { mapGetters } from 'vuex'
import store from '../../state/store'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

export default {
  props: {
    modalActive: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      id: this.$route.params.id,
      url: window.location.href,
      address: '',
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('bushes', ['currentBush']),
  },
  methods: {
    back() {
      this.$router.push({ name: 'home' })
    },
    async upvote() {
      await bushesApi.upvote(this.id)
      store.dispatch('bushes/get')
      alert('liked')
    },
  },
  async mounted() {
    store.dispatch('bushes/current', this.$route.params.id)
    const provider = new OpenStreetMapProvider()
    const res = store.dispatch('bushes/get', this.id)
    const arrayOfAddrresses = provider.search({ query: `${this.currentBush.lat} ${this.currentBush.lng}` })
    const [result] = await arrayOfAddrresses
    this.address = result
    await res
    this.loaded = false
  },
  page: {
    title: 'Bush',
    meta: [{ name: 'Bush.description', content: 'Real bush' }],
  },
}
</script>

<style>
  .reactButton {
    max-width: 25px;
    max-height: 25px;
  }
</style>

<style lang="scss">
  .shareBtn {
    display: inline-block;
    margin: 7px;

    .icon {
      margin-right: 5px;
    }
  }
</style>