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
      <div class="card">
        <!--   get user, check is terminator and allow terminate-->
        <header class="modal-card-head" v-if="false">
          <b-button type="is-danger">
            TERMINATED
          </b-button>
        </header>
        <div class="card-content">
          <div class="media">
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
          <!--          <address>-->
          <!--            {{address}}-->
          <!--          </address>-->
          <div class="content">
            bush.description
            bush.adder
            <small>bush.created at 11:09 PM - 1 Jan 2016</small>
            <br>
          </div>
        </div>
        <h5>Share this:</h5>
        <social-sharing
            :url="url"
            title="Ambrozone"
            description="Bush description"
            quote="Bush description"
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
          <b-button type="is-warning" @click="rating++">
            <svg
                style="width: 20px; margin-right: 10px;"
                fill="black"
                class="reactButton"
                xmlns="http://www.w3.org/2000/svg" viewBox="-22 0 134 134">
              <path
                  d="M23 134C8 85 40 67 40 67c-2 26 13 47 13 47l16-10c0 10-6 30-6 30s19-15 25-40c6-24-11-49-11-49 1 17-5 34-17 48l2-3c2-4 5-15 3-40C63 15 31 0 31 0c2 22-6 26-25 67-20 41 17 67 17 67zm0 0"/>
            </svg>
            <span style="display: inline-block;">{{rating}}</span>
          </b-button>
        </footer>
      </div>
    </div>
  </b-modal>
</template>

<script>

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
      url: window.location.href,
      rating: 1,
    }
  },
  methods: {
    back() {
      this.$router.push({ name: 'home' })
    },
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