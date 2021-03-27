<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>

    <h1 v-else>
      {{ otherError }}
    </h1>

    <nuxt-link to="/">
      Home page
    </nuxt-link>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  layout: 'empty',

  head () {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
})
export default class ErrorLayout extends Vue {
  @Prop() readonly error!: any
  pageNotFound: string = '404 Not Found'
  otherError: string = 'An error occurred'
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
