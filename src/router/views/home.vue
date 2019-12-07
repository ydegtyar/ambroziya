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
    <h1 class="ambro">Ambrozone</h1>
    <div class="under">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </Layout>
</template>

<style>
  .ambro {
    position: absolute;

    left: 50%;
    padding: 0;
    margin: 0;

    line-height: 1;
    font-weight: 900;
    color: #39a275;
    transform: translate(-50%);
    font-size: 25px;
  }

  .under {
    margin-top: 15px;
  }
</style>
