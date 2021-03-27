<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-btn
          text
          color="primary"
          @click="goBack"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>

          <span>back</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h1 class="text-h2">
          {{ movie.title }}
        </h1>
      </v-col>

      <v-col
        md="4"
        cols="12"
      >
        <v-img
          :alt="movie.original_title"
          :src="imagePrependPath + movie.poster_path"
          height="450px"
          width="320px"
        />
      </v-col>

      <v-col
        md="8"
        cols="12"
      >
        <v-chip
          v-for="genre in movie.genres"
          :key="genre.id"
          class="ma-2"
          color="primary"
        >
          {{ genre.name }}
        </v-chip>

        <p class="my-3 text-body-1">
          {{ movie.overview }}
        </p>

        <div>
          <v-img
            v-for="studio in movie.production_companies"
            :key="studio.id"
            :alt="studio.name"
            :src="studio.logo_path ? imagePrependPath + studio.logo_path : fallBackImage"
            class="d-inline-block mx-3"
            contain
            width="100px"
            height="100px"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ImageAppendPath } from '~/contracts/movie'
import fallBackImage from '~/assets/images/image-fallback.png'

@Component({
  async asyncData ({ store, route }) {
    const movie = await store.dispatch('movies/loadMovieById', route.params.id)

    return {
      movie
    }
  }
})

export default class MovieDetail extends Vue {
  imagePrependPath: string = ImageAppendPath.value
  fallBackImage: string = fallBackImage

  goBack (): void {
    this.$router.go(-1)
  }
}
</script>
