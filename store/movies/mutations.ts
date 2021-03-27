import { MutationTree } from 'vuex'
import { Movie } from '../../contracts/movie'
import { Pagination } from '../../contracts/shared'
import { MoviesState } from './types'

/**
 * Movies mutations
 */
export const mutations: MutationTree<MoviesState> = {
  setMoviesList: (state, payload: Array<Movie>) => {
    state.list = payload
  },

  setPagination: (state, payload: Pagination) => {
    state.pagination = payload
  },

  setPendingState: (state, payload: boolean) => {
    state.isPending = payload
  }
}

export default mutations
