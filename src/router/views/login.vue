<template>
  <b-modal
      :active.sync="isComponentModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
      :can-cancel="false"
      @close="back"
  >
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <form @submit.prevent="tryToLogIn">
        <section class="modal-card-body">
          <b-field label="Username">
            <b-input
                type="text"
                v-model="username"
                placeholder="Your username"
                required>
            </b-input>
          </b-field>

          <b-field label="Password">
            <b-input
                type="password"
                v-model="password"
                password-reveal
                placeholder="Your password"
                required>
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="back">Close</button>
          <button class="button is-primary">Login</button>
        </footer>
      </form>

    </div>
    <b-loading :is-full-page="true" :active.sync="tryingToLogIn" :can-cancel="true">
      <b-icon
          pack="fas"
          icon="sync-alt"
          size="is-large"
          custom-class="fa-spin">
      </b-icon>
    </b-loading>
  </b-modal>
</template>

<script>
import { authMethods } from '../../state/helpers'
import appConfig from '../../../src/app.config'

export default {
  props: {
    isComponentModalActive: { type: Boolean, default: false, required: true },
  },
  page: {
    title: 'Log in',
    meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }],
  },
  // components: { Layout },
  data() {
    return {
      username: '',
      password: '',
      authError: null,
      tryingToLogIn: false,
    }
  },
  computed: {
    placeholders() {
      return process.env.NODE_ENV === 'production'
        ? {}
        : {
          username: 'Use "admin" to log in with the mock API',
          password: 'Use "password" to log in with the mock API',
        }
    },
  },
  methods: {
    ...authMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.tryingToLogIn = true
      // Reset the authError if it existed.
      this.authError = null
      return this.logIn({
        username: this.username,
        password: this.password,
      })
        .then((token) => {
          this.tryingToLogIn = false
          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
        })
        .catch((error) => {
          this.tryingToLogIn = false
          this.authError = error
        })
    },
    back() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" module>
  @import '@design';

  .form {
    text-align: center;
  }
</style>
