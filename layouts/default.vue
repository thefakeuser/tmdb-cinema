<template>
  <v-app>
    <v-app-bar
      clipped
      fixed
      app
    >
      <v-toolbar-title>
        <nuxt-link
          class="text-decoration-none"
          to="/"
        >
          <h1 class="text-h5">
            {{ appName }}
          </h1>
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DefaultLayout extends Vue {
  appName: string = 'TMDB Cinema'
}
</script>
