<template>
  <b-modal
      :active.sync="modalActive"
      has-modal-card
      aria-role="dialog"
      aria-modal
      trap-focus
      :on-cancel="back"
      :can-cancel="false"
      @close="back"
  >
    <div class="modal-card" style="width: auto">
      <form @submit.prevent="submit">
        <header class="modal-card-head">
          <p class="modal-card-title">Add new bush</p>
        </header>
        <section class="modal-card-body">
          You are going to add new bush of ambroziya
          at coordinates: <br>
          <pre>{{coordinates}} <br>TODO: Травневий провулок, 4, Кропивницький, Кіровоградська область, Украина, 25000</pre>
          Maybe you have photos or description
          <b-field label="description">
            <b-input
                type="description"
                :value="description"
                placeholder="What you think about this bush"
                required>
            </b-input>
          </b-field>
          We'll try notify some responsible peoples

          <!--        <b-field label="Password">-->
          <!--          <b-input-->
          <!--              type="password"-->
          <!--              :value="password"-->
          <!--              password-reveal-->
          <!--              placeholder="Your password"-->
          <!--              required>-->
          <!--          </b-input>-->
          <!--        </b-field>-->
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="back">Close</button>
          <button class="button is-primary">+ Add</button>
        </footer>
      </form>
    </div>
  </b-modal>
</template>

<script>

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
      description: '',
    }
  },
  computed: {
    coordinates() {
      // const { lat, lng } = this.latlng
      return `${this.$route.query.lat} ${this.$route.query.lng}`
    },
  },
  mounted() {
    if (!(this.$route.query.lat && this.$route.query.lng)) {
      this.$router.push({ name: 'home' })
    }
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
