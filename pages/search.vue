<template>
  <div>
    <v-row class="sticky-bar white">
      <v-col cols="12">
        <movies-filter-form
          v-model="filterForm"
          :is-disabled="isPending"
          @clear="resetFilters"
          @submit="updateSearchResults()"
        />
      </v-col>
    </v-row>

    <v-row v-if="list.length">
      <v-col
        v-for="movie in list"
        :key="movie.id"
        lg="3"
        md="4"
        sm="6"
        cols="12"
      >
        <nuxt-link
          class="text-decoration-none"
          :to="`/movie/${movie.id}`"
        >
          <movie-card
            :poster-path="movie.poster_path"
            :is-pending="isPending"
            :title="movie.title"
            :vote-average="movie.vote_average"
            :vote-count="movie.vote_count"
          />
        </nuxt-link>
      </v-col>

      <v-col cols="12">
        <v-pagination
          v-model="currentPage"
          :disabled="isPending"
          :length="pagination.total_pages"
          :total-visible="visiblePaginationButtons"
          circle
        />
      </v-col>
    </v-row>

    <v-row v-if="!list.length && !isPending">
      <v-col cols="12">
        <p class="text-center text-h4 my-5">
          Nothing found
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { FilterForm, Movie, MovieFiltersQuery } from '~/contracts/movie'
import { Pagination } from '~/contracts/shared'
import { MovieCard } from '~/components/movies'
import MoviesFilterForm from '~/components/movies/MoviesFilterForm.vue'

const namespace: string = 'movies'

enum filterValueTypes {
  minYear = 'primary_release_date.gte',
  maxYear = 'primary_release_date.lte',
  searchQuery = 'with_keywords',
  maxRating = 'vote_average.lte',
  minRating = 'vote_average.gte',
  page = 'page'
}

@Component({
  components: {
    MovieCard,
    MoviesFilterForm
  },

  async fetch (): Promise<void> {
    await this.loadFilteredMovies(this.filterQueryParams)
  }
})

export default class Index extends Vue {
  filterForm: FilterForm = {
    minYear: this.getYearFromDateQuery(this.$route.query[filterValueTypes.minYear] as string),
    maxYear: this.getYearFromDateQuery(this.$route.query[filterValueTypes.maxYear] as string),
    searchQuery: this.$route.query[filterValueTypes.searchQuery] as string,
    maxRating: Number(this.$route.query[filterValueTypes.maxRating]) || undefined,
    minRating: Number(this.$route.query[filterValueTypes.minRating]) || undefined,
    page: Number(this.$route.query[filterValueTypes.page] || '1')
  }

  visiblePaginationButtons: number = 5

  @State('list', { namespace }) list: Array<Movie>;
  @State('pagination', { namespace }) pagination: Pagination;
  @State('isPending', { namespace }) isPending: boolean;
  @Action('loadFilteredMovies', { namespace }) loadFilteredMovies: Promise<void>;

  get currentPage (): number {
    return this.pagination.page || 1
  }

  set currentPage (page: number) {
    this.filterForm.page = page
    this.updateSearchResults()
  }

  get filterQueryParams (): MovieFiltersQuery<any> {
    return {
      [filterValueTypes.searchQuery]: this.filterForm.searchQuery,
      [filterValueTypes.minYear]: this.getISODateFromYear(this.filterForm.minYear),
      [filterValueTypes.maxYear]: this.getISODateFromYear(this.filterForm.maxYear),
      [filterValueTypes.minRating]: this.filterForm.minRating?.toString(),
      [filterValueTypes.maxRating]: this.filterForm.maxRating?.toString(),
      [filterValueTypes.page]: this.filterForm.page?.toString()
    }
  }

  getISODateFromYear (year: string | undefined): string | undefined {
    const isValid = !Number.isNaN(Number(year))
    const UTCDate = Date.UTC(Number(year), 0, 1)

    return isValid ? new Date(UTCDate).toISOString() : undefined
  }

  getYearFromDateQuery (query: string): string | undefined {
    const date = decodeURIComponent(query)

    return query && new Date(date) instanceof Date
      ? new Date(date).getFullYear().toString()
      : undefined
  }

  resetFilters (): void {
    Object.keys(this.filterForm)
      .forEach((property: string) => (this.filterForm[property] = undefined))

    this.updateSearchResults()
  }

  scrollToTop (position: number): void {
    if (process.client) {
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      })
    }
  }

  async updateSearchResults (): Promise<void> {
    await this.loadFilteredMovies(this.filterQueryParams)
    this.scrollToTop(0)

    this.$router.push({
      path: this.$route.path,
      query: {
        ...this.$route.query,
        ...this.filterQueryParams
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/settings/_variables';
  .sticky-bar {
    position: sticky;
    z-index: 2;
    top: 64px;

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      top: 54px;
    }
  }
</style>
