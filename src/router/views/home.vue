<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'

export default {
  page: {
    title: 'Ambrozone',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <div class="under">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </Layout>
</template>

<style>

  .under {
    margin-top: 15px;
  }
</style>
