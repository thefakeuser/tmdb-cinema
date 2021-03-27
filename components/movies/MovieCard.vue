<template>
  <div>
    <v-skeleton-loader
      v-if="isPending"
      max-width="300"
      height="300"
      type="image, list-item-two-line"
    />

    <v-card
      v-else
      class="movie-card mx-auto"
      max-width="374"
    >
      <v-img
        height="300"
        :src="imageSourse"
      >
        <template #placeholder>
          <div class="fill-height d-flex align-center justify-center">
            <v-progress-circular
              indeterminate
              color="primary lighten-2"
            />
          </div>
        </template>
      </v-img>

      <v-card-title class="text-ellipsis">
        {{ title }}
      </v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="voteAverage / 2"
            dense
            half-increments
            readonly
            size="14"
          />

          <div class="grey--text ml-2">
            ({{ voteAverage }})
          </div>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ImageAppendPath } from '~/contracts/movie'
import fallBackImage from '~/assets/images/image-fallback.png'

@Component
export default class MovieCard extends Vue {
  @Prop() readonly isPending!: boolean
  @Prop() readonly posterPath!: string
  @Prop() readonly title!: string
  @Prop() readonly voteAverage!: number
  @Prop() readonly voteCount!: number

  imagePathPrepend: string = ImageAppendPath.value

  get imageSourse (): string {
    return this.posterPath
      ? this.imagePathPrepend + this.posterPath
      : fallBackImage
  }
}
</script>

<style scoped>
  .text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
</style>
