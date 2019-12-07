<script>
import { authComputed } from '@state/helpers'
import NavBarRoutes from './nav-bar-routes.vue'

export default {
  components: { NavBarRoutes },
  data() {
    return {
      persistentNavRoutes: [
        {
          name: 'home',
          title: 'Home',
        },
      ],
      loggedInNavRoutes: [
        {
          name: 'profile',
          title: () => 'Logged in as ' + this.currentUser.name,
        },
        {
          name: 'logout',
          title: 'Log out',
        },
      ],
      loggedOutNavRoutes: [
        {
          name: 'login',
          title: 'Log in',
        },
      ],
    }
  },
  computed: {
    ...authComputed,
  },
}
</script>

<template>
  <ul :class="$style.container">
    <span v-if="loggedIn">
    <router-link to="/login">
      <b-button type="is-link">
        Login
      </b-button>
    </router-link>
    </span>
    <span v-else>
       <router-link to="/logout">
      <b-button type="is-link">
        Logout
      </b-button>
    </router-link>
<!--       <router-link to="/login">-->
      <!--      <b-button type="is-link">-->
      <!--        Login-->
      <!--      </b-button>-->
      <!--    </router-link>-->
    </span>


    <!--    <button class="button is-primary is-medium"-->
    <!--            @click="isComponentModalActive = true">-->
    <!--      Launch component modal-->
    <!--    </button>-->

    <!--    <NavBarRoutes :routes="persistentNavRoutes"/>-->
    <!--    <NavBarRoutes v-if="loggedIn" :routes="loggedInNavRoutes"/>-->
    <!--    <NavBarRoutes v-else :routes="loggedOutNavRoutes"/>-->
  </ul>
</template>

<style lang="scss" module>
  @import '@design';

  .container {
    padding: 0;
    text-align: center;
    list-style-type: none;

    > li {
      display: inline-block;
      margin-right: $size-grid-padding;
    }
  }
</style>
